import React from "react";
import {Alert, Snackbar, SnackbarCloseReason} from '@mui/material';

interface SnackbarComponentProps {
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info' | undefined;
    onClose: (event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => void;
}

const SnackbarComponent: React.FC<SnackbarComponentProps> = ({ open, message, severity, onClose }) => (
    <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={onClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
        <Alert
            onClose={(event: React.SyntheticEvent) => onClose(event, 'clickaway')}
            severity={severity}
            sx={{ width: '100%' }}
            variant="filled"
        >
            {message}
        </Alert>
    </Snackbar>
);

export default SnackbarComponent;
