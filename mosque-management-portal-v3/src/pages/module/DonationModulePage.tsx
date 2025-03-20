import {Box, Card, CardContent, CardHeader, Divider, Grid2, Typography,} from '@mui/material';
import {useTranslation} from 'react-i18next';
import useDonationPage from '../../hooks/page/useDonationPage.ts';
import BreadcrumbsNav from '../../components/common/breadcrumbs/breadcrumbsNav.tsx';
import SnackbarComponent from "../../components/common/snackbar/snackbar.tsx";
import TableComponent from "../../components/common/table/table.tsx";
import ModalComponent from "../../components/common/modal/modal.tsx";
import TabsComponent from '../../components/common/tabs/tabs.tsx';
import FloatingActionButton from '../../components/common/button/fab.tsx';
import {ROUTE_HOME} from "../../constants/AppRoutes.ts";
import {DonationsItem} from "../../types/BaseItem.ts";
import {DonationAnalysis, TopDonorsAnalysis} from "../../components/common/graph/barChartAnalysis.tsx";
import {DateDonation} from "../../types/props/GraphProps.ts";

const DonationAnalysisTab = (
    { data }: {
        data: DateDonation[];
    }) => {
    return (
        <div>
            <DonationAnalysis data={data} />
        </div>
    );
};

const DonationPage = () => {
    const { t } = useTranslation();
    const {
        moduleType, dataItem, donations, fields, optionalFields, filteredUsers, selectedTab, searchQuery, errors, isLoading, mode, openModal, selectedUser,
        handleInputChange, handleSort, handleSearchChange, handleGeneratePDF, handleSaveUser,
        handleDeleteItem, handleOpenModal, handleCloseModal, handleTabChange,
        snackbarOpen, snackbarMessage, snackbarSeverity, setSnackbarOpen
    } = useDonationPage();
    const breadcrumbs = [
        { label: t('breadcrumb.mosque'), color: 'inherit', to: ROUTE_HOME },
        { label: t('breadcrumb.donationManagement'), color: 'text.primary', to: t('breadcrumb.donationManagement') }
    ];

    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <BreadcrumbsNav breadcrumbs={breadcrumbs} />
            <TabsComponent
                selectedTab={selectedTab}
                handleTabChange={handleTabChange}
                moduleType={moduleType}
                t={t}
            />

            {selectedTab === '1' && (
                <TableComponent<DonationsItem>
                    data={filteredUsers}
                    columns={fields}
                    optionalColumns={optionalFields}
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    onSort={handleSort}
                    onAction={handleDeleteItem}
                    onOpenModal={handleOpenModal}
                    t={t}
                    actionButtonText={t('buttons.delete')}
                    isLoading={isLoading}
                    handleGeneratePDF={handleGeneratePDF}
                    users={donations}
                />
            )}

            {selectedTab === '2' && (
                <Grid2 container spacing={2} justifyContent="center">
                    <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                        <Card>
                            <CardHeader title="Donations Over Time" />
                            <CardContent>
                                <Typography variant="body1" component="p">{t(`analysis.${moduleType}.description`)}</Typography>
                                <Divider sx={{ marginBottom: 2 }} />
                                {/*<DonationTrendChart data={dataItem} />*/}
                            </CardContent>
                        </Card>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                        <Card>
                            <CardHeader title="Donation Insights" />
                            <CardContent>
                                <Typography variant="body1" component="p">{t(`analysis.${moduleType}.description`)}</Typography>
                                <Divider sx={{ marginBottom: 2 }} />
                                {/*<DonationInsights data={dataItem} />*/}
                            </CardContent>
                        </Card>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                        <Card>
                            <CardHeader title={t(`analysis.${moduleType}.title`)} />
                            <CardContent>
                                <Typography variant="body1" component="p">{t(`analysis.${moduleType}.description`)}</Typography>
                                <Divider sx={{ marginBottom: 2 }} />
                                <DonationAnalysisTab data={dataItem as unknown as DateDonation[]} />
                            </CardContent>
                        </Card>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                        <Card>
                            <CardHeader title={t(`analysis.topDonors.title`)} />
                            <CardContent>
                                <Typography variant="body1" component="p">{t(`analysis.topDonors.description`)}</Typography>
                                <Divider sx={{ marginBottom: 2 }} />
                                <TopDonorsAnalysis data={donations} />
                            </CardContent>
                        </Card>
                    </Grid2>
                </Grid2>
            )}

            <ModalComponent
                open={openModal}
                onClose={handleCloseModal}
                selectedItem={selectedUser}
                onInputChange={handleInputChange}
                onSave={handleSaveUser}
                fieldConfig={fields}
                errors={errors}
                t={t}
                module={moduleType}
                mode={mode === "edit" || mode === "add" ? mode : "add"}
            />

            <SnackbarComponent
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={() => setSnackbarOpen(false)}
            />

            <FloatingActionButton
                onClick={() => handleOpenModal(null)}
                label={t(`header.${moduleType}`)}
            />
        </Box>
    );
};

export default DonationPage;
