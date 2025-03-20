import React from 'react';
import {Button, Paper, Typography} from '@mui/material';
import {styled} from '@mui/system';

const StyledPaper = styled(Paper)({
    padding: 16, // For example, using fixed spacing instead of `theme.spacing()`
    textAlign: 'center',
    backgroundColor: 'white', // Example background, can use theme.palette.background.default
    borderRadius: '8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Example shadow, can use theme.shadows[3]
    '&:hover': {
        boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)', // Example hover shadow
    },
});

interface SectionPaperProps {
    title: string;
    description: string;
    buttonText: string;
    onClick: () => void;
    sx?: object;
}

const SectionPaper: React.FC<SectionPaperProps> = ({ title, description, buttonText, onClick }) => {
    return (
        <StyledPaper>
            <Typography variant="h6" gutterBottom fontWeight="bold">
                {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
                {description}
            </Typography>
            <Button variant="contained" color="primary" onClick={onClick}>
                {buttonText}
            </Button>
        </StyledPaper>
    );
};

export default SectionPaper;
