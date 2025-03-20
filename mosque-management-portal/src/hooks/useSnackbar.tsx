'use client';

import {useState} from 'react';

type SnackbarSeverity = 'error' | 'warning' | 'info' | 'success';

const useSnackbar = () => {
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<SnackbarSeverity>('success');

    const showSnackbar = (message: string, severity: SnackbarSeverity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    return { snackbarOpen, snackbarMessage, snackbarSeverity, showSnackbar, setSnackbarOpen };
};

export default useSnackbar;
