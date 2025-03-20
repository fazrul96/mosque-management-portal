import {Box, Card, CardContent, CardHeader, Divider, Grid2, Typography} from '@mui/material';
import {useTranslation} from "react-i18next";
import useLogisticPage from "../../hooks/page/useLogisticPage.ts";
import BreadcrumbsNav from '../../components/common/breadcrumbs/breadcrumbsNav.tsx';
import SnackbarComponent from "../../components/common/snackbar/snackbar.tsx";
import TableComponent from "../../components/common/table/table.tsx";
import ModalComponent from "../../components/common/modal/modal.tsx";
import TabsComponent from '../../components/common/tabs/tabs.tsx';
import FloatingActionButton from '../../components/common/button/fab.tsx';
import {ROUTE_HOME} from "../../constants/AppRoutes.ts";
import {LogisticsAnalysis} from "../../components/common/graph/barChartAnalysis.tsx";
import {StatusQuantity} from "../../types/props/GraphProps.ts";

const LogisticsAnalysisTab = (
    { data }: {
        data: StatusQuantity[]
    }) => {
    return (
        <div>
            <LogisticsAnalysis data={data} />
        </div>
    );
};

const LogisticPage = () => {
    const { t } = useTranslation();
    const {
        moduleType, dataItem, logistics, fields, filteredUsers, selectedTab, searchQuery, errors, isLoading, mode, openModal, selectedUser,
        handleInputChange, handleSort, handleSearchChange, handleGeneratePDF, handleSaveUser,
        handleDeleteItem, handleOpenModal, handleCloseModal, handleTabChange,
        snackbarOpen, snackbarMessage, snackbarSeverity, setSnackbarOpen
    } = useLogisticPage();
    const breadcrumbs = [
        { label: t('breadcrumb.mosque'), color: 'inherit', to: ROUTE_HOME },
        { label: t('breadcrumb.logisticManagement'), color: 'text.primary', to: t('breadcrumb.logisticManagement') }
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
                <TableComponent
                    data={filteredUsers}
                    columns={fields}
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    onSort={handleSort}
                    onAction={handleDeleteItem}
                    onOpenModal={handleOpenModal}
                    t={t}
                    actionButtonText={t('buttons.delete')}
                    isLoading={isLoading}
                    handleGeneratePDF={handleGeneratePDF}
                    users={logistics}
                />
            )}

            {selectedTab === '2' && (
                <Grid2 container spacing={2} justifyContent="center">
                    <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                        <Card>
                            <CardHeader title={t('analysis.logistic.title')} />
                            <CardContent>
                                <Typography variant="body1" component="p">{t('analysis.logistic.description')}</Typography>
                                <Divider sx={{ marginBottom: 2 }} />
                                <LogisticsAnalysisTab data={dataItem as unknown as StatusQuantity[]} />
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

export default LogisticPage;
