import React from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)({
    backgroundColor: 'white',
    border: '1px solid #e0e0e0',
    transition: 'transform 0.3s, box-shadow 0.3s, background-color 0.3s',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    borderRadius: 10,
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
});

interface SectionCardProps {
    image: string;
    title: string;
    description: string;
    buttonText: string;
    onClick: () => void;
    sx?: object;
}

const SectionCard: React.FC<SectionCardProps> = ({ image, title, description, buttonText, onClick }) => {
    return (
        <StyledCard>
            <CardContent>
                <Card
                    sx={{
                        width: '100%',
                        height: 150,
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: 2,
                        marginBottom: 2,
                    }}
                />
                <Typography variant="h6" gutterBottom fontWeight="bold">
                    {title}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={onClick}
                    sx={{
                        backgroundColor: '#1976d2', // Fixed background color for button
                        '&:hover': {
                            backgroundColor: '#1565c0', // Fixed hover color for button
                        },
                    }}
                >
                    {buttonText}
                </Button>
            </CardActions>
        </StyledCard>
    );
};

export default SectionCard;
