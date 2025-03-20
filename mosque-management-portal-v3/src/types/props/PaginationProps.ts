import React from 'react';

export interface PaginationProps<T> {
    data: T[];
    rowsPerPage: number;
    page: number;
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isLoading: boolean;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}