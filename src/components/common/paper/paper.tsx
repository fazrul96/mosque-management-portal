import React from 'react';
import {Button, Paper, Typography} from '@mui/material';
import {styled} from '@mui/system';

interface SectionPaperProps {
    title: string,
    description?: string
    buttonText: string,
    onClick: () => void,
    sx?: {
        "&:hover": { transform: string; transition: string; boxShadow: number; backgroundColor: string };
        padding: number;
        borderRadius: number;
        boxShadow: number;
        transition: string;
    },
}

const StyledPaper = styled(Paper)(({theme}) => {
    const themeShadows = theme.shadows as string[];
    return {
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(2),
        textAlign: 'center',
        '&:hover': {
            boxShadow: themeShadows[6],
        },
        borderRadius: '8px',
        boxShadow: themeShadows[3],
    };
});

const PaperComponent: React.FC<SectionPaperProps> = ({title, description, buttonText, onClick, sx}) => {
    return (
        <StyledPaper sx = {sx} >
            <Typography variant = "h6" gutterBottom fontWeight = "bold" >
                {title}
            </Typography >
            <Typography variant = "body2" color = "textSecondary" gutterBottom >
                {description}
            </Typography >
            <Button variant = "contained" color = "primary" onClick = {onClick} >
                {buttonText}
            </Button >
        </StyledPaper >
    );
};

export default PaperComponent;
