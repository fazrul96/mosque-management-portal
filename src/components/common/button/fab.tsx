import React from 'react';
import {Fab, SxProps, Theme, Tooltip} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface FloatingActionButtonProps {
    label?: string,
    icon?: React.ReactNode,
    color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
    sx?: SxProps<Theme>,
    onClick?: () => void
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
                                                                       onClick,
                                                                       label = 'Add New Item',
                                                                       icon = <AddIcon />,
                                                                       color = 'primary',
                                                                       sx = {},
                                                                   }) => {
    const validIcon = React.isValidElement(icon) ? icon : <AddIcon />;
    return (
        <Fab
            color = {color}
            aria-label = "add"
            onClick = {onClick}
            sx = {{
                position: 'fixed',
                bottom: 16,
                right: 16,
                boxShadow: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                    boxShadow: 6,
                },
                ...sx,
            }}
        >
            <Tooltip title = {label} >
                {validIcon}
            </Tooltip >
        </Fab >
    );
};

export default FloatingActionButton;
