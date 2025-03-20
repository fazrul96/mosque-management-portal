import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Box sx={{ textAlign: 'center', marginTop: 5, paddingBottom: 2 }}>
            <Typography variant="body2" color="textSecondary">
                &copy; {new Date().getFullYear()} Mosque Management. All Rights Reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
