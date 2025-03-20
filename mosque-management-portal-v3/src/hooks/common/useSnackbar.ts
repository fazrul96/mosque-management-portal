import {useState} from 'react';
import {EMPTY_STRING} from "../../constants/AppConstants.ts";

type SnackbarSeverity = 'success' | 'error' | 'info' | 'warning';
const useSnackbar = () => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState(EMPTY_STRING);
    const [snackbarSeverity, setSnackbarSeverity] = useState<SnackbarSeverity>('success');

    const showSnackbar = (message: string, severity: SnackbarSeverity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    return { snackbarOpen, snackbarMessage, snackbarSeverity, showSnackbar, setSnackbarOpen };
};

export default useSnackbar;
