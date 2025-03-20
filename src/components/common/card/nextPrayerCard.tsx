import React from 'react';
import {Card, CardContent, Typography} from '@mui/material';
import {DEFAULT_IMAGE} from "../../../constants/AppConstants.ts";

interface NextPrayerCardProps {
    nextPrayer: string | null;
    nextPrayerTime: string | null;
    remainingTime: string | null;
    t: (key: string) => string;
}

const NextPrayerCard: React.FC<NextPrayerCardProps> = ({ nextPrayer, nextPrayerTime, remainingTime, t }) => (
    <Card elevation={5} sx={{
        padding: 3,
        backgroundImage: `url(${DEFAULT_IMAGE})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: 2,
        textAlign: 'center',
        position: 'relative',
        height: '100%',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: 'inherit',
        },
    }}>
        <CardContent sx={{ position: 'relative', zIndex: 1 }}>
            <Typography variant="h6" sx={{
                fontWeight: 'bold',
                color: 'white',
                zIndex: 1,
                textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
            }}>
                {t('sections.prayers.nextPrayer')}
            </Typography>
            <Typography variant="h4" sx={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: '2rem',
                textShadow: '2px 2px 5px rgba(0, 0, 0, 0.7)',
            }}>
                {nextPrayer} {nextPrayerTime}
            </Typography>
            <Typography variant="h6" sx={{ color: 'white', marginTop: 1, textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)' }}>
                {t('sections.prayers.remainingTime')}:
                <span style={{ fontWeight: 'bold', color: 'yellow' }}>
                    {remainingTime}
                </span>
            </Typography>
        </CardContent>
    </Card>
);

export default NextPrayerCard;
