import {Box, Grid2, TablePagination} from '@mui/material';
import {useTheme} from "@mui/material/styles";
import {PaginationProps} from "../../../types/props/PaginationProps.ts";
import LoadingSpinner from "../spinner/LoadingSpinner.tsx";

const EnhancedPagination = <T extends object>({
                                                  data,
                                                  rowsPerPage,
                                                  page,
                                                  handleChangeRowsPerPage,
                                                  isLoading,
                                                  setPage
                                              }: PaginationProps<T>) => {
    const theme = useTheme();
    const handleChangePage = (
        _event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };
    return (
        <Grid2 container justifyContent="center" alignItems="center" sx={{ marginTop: 2 }}>
            <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        width: '100%',
                        padding: '8px 16px',
                        borderRadius: 1,
                        backgroundColor: theme.palette.background.paper,
                        boxShadow: theme.shadows[1],
                    }}
                >
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50]} // Options for rows per page
                        component="div"
                        count={data.length} // Total number of items
                        rowsPerPage={rowsPerPage} // Rows per page
                        page={page} // Current page
                        onPageChange={handleChangePage} // Handle page change
                        onRowsPerPageChange={handleChangeRowsPerPage} // Handle rows per page change
                        showFirstButton
                        showLastButton
                        sx={{
                            '& .MuiTablePagination-select': {
                                marginRight: 2, // Space between select and buttons
                            },
                            '& .MuiTablePagination-actions': {
                                display: 'flex',
                                justifyContent: 'center', // Center pagination actions (buttons)
                            },
                            '& .MuiTablePagination-actions button': {
                                fontSize: '0.875rem',
                                color: theme.palette.text.primary,
                                '&:hover': {
                                    backgroundColor: theme.palette.action.hover,
                                },
                            },
                            ...(isLoading && {
                                opacity: 0.6, // Fade the pagination when loading
                                pointerEvents: 'none', // Disable interactions when loading
                            }),
                        }}
                    />

                    <LoadingSpinner isLoading={isLoading} />
                </Box>
            </Grid2>
        </Grid2>
    );
};

export default EnhancedPagination;
