import React from 'react';
import { Box, Typography } from '@mui/material';
import {useImageCache} from '@/hooks/useImageCache'; // Assuming you have this hook

interface HeaderImageProps {
    imageUrl: string;
    title: string;
    subtitle: string;
}

const HeaderImage: React.FC<HeaderImageProps> = ({ imageUrl, title, subtitle }) => {
    const imageLoaded = useImageCache(imageUrl);

    return (
        <Box
            sx={{
                backgroundImage: imageLoaded ? `url(${imageUrl})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: { xs: 300, sm: 400, md: 500 },
                borderRadius: '8px',
                marginBottom: 3,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                textAlign: 'center',
                position: 'relative',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7))',
                    borderRadius: '8px',
                }}
            />
            <Typography variant="h3" fontWeight="bold" zIndex={1} sx={{ textShadow: '2px 2px 5px rgba(0, 0, 0, 0.8)' }}>
                {title}
            </Typography>
            <Typography variant="h6" zIndex={1} sx={{ marginTop: 10, textShadow: '1px 1px 4px rgba(0, 0, 0, 0.6)' }}>
                {subtitle}
            </Typography>
        </Box>
    );
};

export default HeaderImage;
