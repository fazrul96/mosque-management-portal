import React, {useMemo, useState} from "react";
import {
    Box,
    Card,
    CircularProgress,
    Grid2,
    Paper,
    Stack,
    Table,
    TableBody,
    TableContainer,
    Typography
} from "@mui/material";
import SearchBar from "../../common/form/searchBar.tsx";
import TableHeader from "../../common/table/tableHeader.tsx";
import TableRowComponent from "../../common/table/tableRow.tsx";
import EnhancedPagination from "../../common/pagination/pagination.tsx";
import DownloadPdfButton from "../../common/button/downloadPdfButton.tsx";
import {BaseTableColumn, GeneralTableProps} from "../../../types/props/TableProps.ts";
import {BaseItem} from "../../../types/BaseItem.ts";

const GeneralTable = <T extends BaseItem>({
    data,
    columns,
    searchQuery,
    onSearchChange,
    onSort,
    onAction,
    onOpenModal,
    t,
    actionButtonText,
    isLoading = false,
    handleGeneratePDF,
    optionalColumns = [],
    users,
}: GeneralTableProps<T, BaseTableColumn<T>>) => {
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);

    const paginatedData = useMemo(() => {
        return data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [data, page, rowsPerPage]);

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const renderTableRows = () => {
        return paginatedData.map((item, index) => (
            <TableRowComponent
                key={item.id || index}
                item={item}
                columns={columns}
                optionalColumns={optionalColumns}
                onOpenModal={onOpenModal}
                onAction={onAction}
                actionButtonText={actionButtonText}
                onSort={onSort}
                t={t}
            />
        ));
    };

    const renderTableContent = () => {
        if (isLoading) {
            return (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
                    <CircularProgress />
                </Box>
            );
        }

        if (data.length === 0) {
            return (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
                    <Typography variant="h6" color="textSecondary">
                        {t("table.data")}
                    </Typography>
                </Box>
            );
        }

        return (
            <TableContainer>
                <Table>
                    <TableHeader
                        columns={columns}
                        optionalColumns={optionalColumns}
                        onSort={onSort}
                        t={t}
                    />
                    <TableBody>{renderTableRows()}</TableBody>
                </Table>
                <Stack spacing={2} mt={2}>
                    <EnhancedPagination
                        data={data}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        setPage={setPage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        isLoading={isLoading}
                    />
                </Stack>
            </TableContainer>
        );
    };

    return (
        <Grid2 container spacing={2} justifyContent="center">
            <Grid2 size={{ xs: 12, sm: 10, md: 10 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <SearchBar searchQuery={searchQuery} onSearchChange={onSearchChange} t={t} />
                </Box>
            </Grid2>
            <Grid2 size="grow">
                <Box display="flex" justifyContent="right" alignItems="center">
                    <DownloadPdfButton
                        isLoading={isLoading}
                        handleGeneratePDF={handleGeneratePDF}
                        t={t}
                        data={users || []}
                    />
                </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                <Card>
                    <TableContainer component={Paper}>{renderTableContent()}</TableContainer>
                </Card>
            </Grid2>
        </Grid2>
    );
};

export default GeneralTable;
