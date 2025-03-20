import React from 'react';
import {CircularProgress} from '@mui/material';
import {useTheme} from '@mui/material/styles';

interface LoadingSpinnerProps {
    isLoading: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isLoading }) => {
    const theme = useTheme();

    if (!isLoading) return null;

    return (
        <CircularProgress
            size={24}
            sx={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                color: theme.palette.primary.main,
                zIndex: 10,
            }}
        />
    );
};

export default LoadingSpinner;
