import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useAuth0} from '@auth0/auth0-react';
import {sortData} from '../../utils/sortDataUtils.ts';
import {validateNricPattern} from '../../utils/dataProcessingUtils.ts';
import {generatePDF} from "../../utils/generatePDF.ts";
import useDonationApi from '../../hooks/api/useDonationApi.ts';
import useSnackbar from '../../hooks/common/useSnackbar.ts';
import {EMPTY_STRING} from "../../constants/AppConstants.ts";
import {DonationsItem, FieldType} from '../../types/BaseItem.ts';
import {BaseOption} from '../../types/BaseOption.ts';
import {DonationsField} from '../../types/BaseField.ts';
import {getFirstName} from "../../utils/stringUtils.ts";

interface SortConfig {
    key: keyof DonationsItem;
    direction: 'asc' | 'desc';
}

const moduleType = "donation";

const useDonationPage = () => {
    const { t } = useTranslation();
    const { getAccessTokenSilently } = useAuth0();
    const { dataItem, fetchItems, addItem, deleteItem, editItem } = useDonationApi(getAccessTokenSilently);
    const { snackbarOpen, snackbarMessage, snackbarSeverity, showSnackbar, setSnackbarOpen } = useSnackbar();

    const [searchQuery, setSearchQuery] = useState<string>(EMPTY_STRING);
    const [selectedUser, setSelectedUser] = useState<Partial<DonationsItem> | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [selectedTab, setSelectedTab] = useState<string>('1');
    const [donations, setDonations] = useState<DonationsItem[]>([]);
    const [mode, setMode] = useState<string>('add');
    const [isLoading, setIsLoading] = useState(false);
    const [newUser, setNewUser] = useState<Partial<DonationsItem>>({
        name: EMPTY_STRING,
        nric: EMPTY_STRING,
        address: EMPTY_STRING,
        donation: 0,
        date: EMPTY_STRING
    });
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'date', direction: 'desc' });

    useEffect(() => { fetchItems(); }, []);
    useEffect(() => {
        if (dataItem) {
            setDonations(dataItem as DonationsItem[]);
        }
    }, [dataItem]);

    const createField = (
        name: string,
        type: FieldType = "text",
        options: BaseOption[] = [],
        isRequired: boolean = true,
        inputProps: Record<string, unknown> = {},
        isDate = false
    ): DonationsField => {
        const labelKey = name === moduleType
            ? `dialog.${moduleType}.form.donationAmount`
            : `dialog.${moduleType}.form.${name}`;

        return {
            name,
            type,
            label: t(labelKey),
            isRequired,
            inputProps,
            isDate,
            options
        };
    };

    const fields: DonationsField[] = [
        createField("name"),
        createField("nric"),
        createField("donation", "number", [], true, { min: 0 }),
        createField("date", "date", undefined, true, {}, true),
        createField("address"),
    ];

    const optionalFields: DonationsField[] = [{
        name: "age",
        type: "text",
        label: t(`tableHeaders.${moduleType}.age`),
        isRequired: false,
        inputProps: { placeholder: "Enter age" }
    }];

    const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;
        setNewUser(prev => ({ ...prev, [name]: value }));
        setSelectedUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSort = (column: string) => {
        setSortConfig(prev => ({
            key: column,
            direction: prev.key === column && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleGeneratePDF = (data: DonationsItem[]) => {
        setIsLoading(true);
        generatePDF({
            data: sortData(data, 'date', 'desc'),
            title: 'Donation Management Report',
            fileName: 'Donation_report.pdf',
            columns: ['Name', 'NRIC', 'Donation Amount (RM)', 'Date', 'Address'],
            columnNames: ['name', 'nric', 'donation', 'date', 'address']
        });
        setIsLoading(false);
    };

    const filteredUsers = sortData(
        donations.filter((item) =>
            [item.name, item.address, item.nric].some((field) =>
                field?.toLowerCase().includes(searchQuery.toLowerCase())
            )
        ),
        sortConfig.key,
        sortConfig.direction
    );

    const validateForm = () => {
        const errors: { [key: string]: string } = {};
        let isValid = true;

        if (!newUser.name?.trim()) {
            errors.name = t('error.nameRequired');
            isValid = false;
        }

        if (!newUser.nric?.trim() || !validateNricPattern(newUser.nric)) {
            errors.nric = t('error.nricFormat');
            isValid = false;
        }

        if (!newUser.donation || newUser.donation <= 0) {
            errors.donation = t('error.donationRequired');
            isValid = false;
        }

        if (!newUser.date?.trim()) {
            errors.date = t('error.dateRequired');
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleSaveUser = (id: string | undefined, updatedUser: DonationsItem) => {
        if (!validateForm()) {
            return;
        }

        const userToSave: DonationsItem = {
            name: updatedUser.name || EMPTY_STRING,
            nric: updatedUser.nric || EMPTY_STRING,
            address: updatedUser.address || EMPTY_STRING,
            donation: updatedUser.donation || 0,
            date: updatedUser.date || EMPTY_STRING
        };
        const saveAction = (id: string | undefined, userToSave: DonationsItem) => {
            if (id) {
                return editItem(id, userToSave);
            } else {
                return addItem(userToSave);
            }
        };

        saveAction(id, userToSave)
            .then(() => {
                fetchItems();
                setDonations(donations => id ? donations.map(donation => donation.id === id ? updatedUser : donation) : [...donations, updatedUser]);
                showSnackbar(
                    `Donation record for ${getFirstName(updatedUser.name)} ${updatedUser ? 'updated' : 'added'} successfully`,
                    'success'
                );
                clearForm();
                handleCloseModal();
            })
            .catch(() => showSnackbar(
                `Error ${updatedUser ? 'updating' : 'adding'} donation record for ${getFirstName(updatedUser.name)}`,
                'error'
            ));
    };

    const handleDeleteItem = (donationId: string | undefined) => {
        deleteItem(donationId)
            .then(() => {
                setDonations(donations.filter(donation => donation.id !== donationId));
                showSnackbar(
                    `Donation record deleted successfully`,
                    'success'
                );
                clearForm();
                handleCloseModal();
            })
            .catch(() => showSnackbar(
                `Error deleting donation record`,
                'error'
            ));
    };

    const clearForm = () => {
        setNewUser({
            name: EMPTY_STRING,
            nric: EMPTY_STRING,
            date: EMPTY_STRING,
            address: EMPTY_STRING,
            donation: 0
        });
    };

    const handleOpenModal = (user: Partial<DonationsItem> | null) => {
        if (!user) {
            setMode('add');
            setSelectedUser(null);
            setNewUser(
                { name: EMPTY_STRING, nric: EMPTY_STRING, address: EMPTY_STRING, donation: 0, date: EMPTY_STRING });
        } else {
            setMode('edit');
            setSelectedUser(user);
            setNewUser({
                name: user?.name || EMPTY_STRING,
                nric: user?.nric || EMPTY_STRING,
                address: user?.address || EMPTY_STRING,
                donation: user?.donation || 0,
                date: user?.date || EMPTY_STRING
            });
        }
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedUser(null);
        clearForm();
    };

    const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
        setSelectedTab(newValue);
    };

    return {
        moduleType,
        dataItem,
        donations,
        fields,
        optionalFields,
        filteredUsers,
        selectedTab,
        searchQuery,
        selectedUser,
        errors,
        isLoading,
        mode,
        openModal,
        handleInputChange,
        handleSort,
        handleSearchChange,
        handleGeneratePDF,
        handleSaveUser,
        handleDeleteItem,
        handleOpenModal,
        handleCloseModal,
        handleTabChange,
        snackbarOpen,
        snackbarMessage,
        snackbarSeverity,
        setSnackbarOpen
    };
};

export default useDonationPage;
