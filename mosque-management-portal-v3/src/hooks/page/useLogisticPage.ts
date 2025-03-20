import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useAuth0} from '@auth0/auth0-react';
import {sortData} from '../../utils/sortDataUtils.ts';
import {generatePDF} from "../../utils/generatePDF.ts";
import useLogisticApi from "../api/useLogisticApi.ts";
import useSnackbar from '../../hooks/common/useSnackbar.ts';
import {EMPTY_STRING} from "../../constants/AppConstants.ts";
import {FieldType, LogisticsItem} from '../../types/BaseItem.ts';
import {BaseOption} from '../../types/BaseOption.ts';
import {LogisticsField} from '../../types/BaseField.ts';
import {getFirstName} from "../../utils/stringUtils.ts";

interface SortConfig {
    key: keyof LogisticsItem;
    direction: 'asc' | 'desc';
}

const moduleType = "logistic";

const useLogisticPage = () => {
    const { t } = useTranslation();
    const { getAccessTokenSilently } = useAuth0();
    const { dataItem, fetchItems, addItem, deleteItem, editItem } = useLogisticApi(getAccessTokenSilently);
    const { snackbarOpen, snackbarMessage, snackbarSeverity, showSnackbar, setSnackbarOpen } = useSnackbar();

    const [searchQuery, setSearchQuery] = useState<string>(EMPTY_STRING);
    const [selectedUser, setSelectedUser] = useState<Partial<LogisticsItem> | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [selectedTab, setSelectedTab] = useState<string>('1');
    const [logistics, setLogistics] = useState<LogisticsItem[]>([]);
    const [mode, setMode] = useState<string>('add');
    const [isLoading, setIsLoading] = useState(false);
    const [newUser, setNewUser] = useState<Partial<LogisticsItem>>({
        itemName: EMPTY_STRING,
        description: EMPTY_STRING,
        status: EMPTY_STRING,
        quantity: 0,
        imageLink: EMPTY_STRING
    });
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'status', direction: 'desc' });

    useEffect(() => { fetchItems(); }, []);
    useEffect(() => {
        if (dataItem) {
            setLogistics(dataItem as LogisticsItem[]);
        }
    }, [dataItem]);

    const createField = (
        name: string,
        type: FieldType = "text",
        options: BaseOption[] = [],
        isRequired: boolean = true,
        inputProps: Record<string, unknown> = {},
    ): LogisticsField => {
        return {
            name,
            type,
            label: t(`dialog.${moduleType}.form.${name}`),
            isRequired,
            inputProps,
            options
        };
    };

    const fields: LogisticsField[] = [
        createField("itemName"),
        createField("status", "select", [
            { value: 'Available', label: t(`dialog.${moduleType}.form.available`) },
            { value: 'In Use', label: t(`dialog.${moduleType}.form.inUse`) },
            { value: 'Out of Stock', label: t(`dialog.${moduleType}.form.outOfStock`) },
        ]),
        createField("quantity", "number", [], true, { min: 0 }),
        createField("description")
    ];

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

    const handleGeneratePDF = (data: LogisticsItem[]) => {
        setIsLoading(true);
        generatePDF({
            data: sortData(data, 'itemName'),
            title: 'Logistics Management Report',
            fileName: 'Logistics_report.pdf',
            columns: ['Item Name', 'Status', 'Quantity', 'Description'],
            columnNames: ['itemName', 'status', 'quantity', 'description']
        });
        setIsLoading(false);
    };

    const filteredUsers = sortData(
        logistics.filter((item) =>
            [item.itemName, item.status].some((field) =>
                field?.toLowerCase().includes(searchQuery.toLowerCase())
            )
        ),
        sortConfig.key,
        sortConfig.direction
    );

    const validateForm = () => {
        const errors: { [key: string]: string } = {};
        let isValid = true;

        if (!newUser.itemName?.trim()) {
            errors.itemName = t('error.itemNameRequired');
            isValid = false;
        }

        if (!newUser.quantity || newUser.quantity <= 0) {
            errors.quantity = t('error.quantityRequired');
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleSaveUser = (id: string | undefined, updatedUser: LogisticsItem) => {
        if (!validateForm()) {
            return;
        }

        const userToSave: LogisticsItem = {
            itemName: updatedUser.itemName || EMPTY_STRING,
            description: updatedUser.description || EMPTY_STRING,
            status: updatedUser.status || EMPTY_STRING,
            quantity: updatedUser.quantity || 0 ,
            imageLink: updatedUser.imageLink || EMPTY_STRING,
        };

        const saveAction = (id: string | undefined, userToSave: LogisticsItem) => {
            if (id) {
                return editItem(id, userToSave);
            } else {
                return addItem(userToSave);
            }
        };

        saveAction(id, userToSave)
            .then(() => {
                fetchItems();
                setLogistics(logistics => id ? logistics.map(logistic => logistic.id === id ? updatedUser : logistic) : [...logistics, updatedUser]);
                showSnackbar(
                    `Logistic record for ${getFirstName(updatedUser.itemName)} ${updatedUser ? 'updated' : 'added'} successfully`,
                    'success'
                );
                clearForm();
                handleCloseModal();
            })
            .catch(() => showSnackbar(
                `Error ${updatedUser ? 'updating' : 'adding'} logistic record for ${getFirstName(updatedUser.itemName)}`,
                'error'
            ));
    };

    const handleDeleteItem = (logisticId: string | undefined) => {
        deleteItem(logisticId)
            .then(() => {
                setLogistics(logistics.filter(logistic => logistic.id !== logisticId));
                showSnackbar(
                    `Logistic record deleted successfully`,
                    'success'
                );
                clearForm();
                handleCloseModal();
            })
            .catch(() => showSnackbar(
                `Error deleting logistic record`,
                'error'
            ));
    };

    const clearForm = () => {
        setNewUser({
            itemName: EMPTY_STRING,
            description: EMPTY_STRING,
            quantity: 0,
            status: EMPTY_STRING,
            imageLink: EMPTY_STRING,
        });
    };

    const handleOpenModal = (user: Partial<LogisticsItem> | null) => {
        if (!user) {
            setMode('add');
            setSelectedUser(null);
            setNewUser(
                { itemName: EMPTY_STRING, description: EMPTY_STRING, status: EMPTY_STRING, quantity: 0, imageLink: EMPTY_STRING });
        } else {
            setMode('edit');
            setSelectedUser(user);
            setNewUser({
                itemName: user?.itemName || EMPTY_STRING,
                description: user?.description || EMPTY_STRING,
                status: user?.status || EMPTY_STRING,
                quantity: user?.quantity || 0,
                imageLink: user?.imageLink || EMPTY_STRING
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
        logistics,
        fields,
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

export default useLogisticPage;
