import React from 'react';
import {Card, CardContent, Typography} from '@mui/material';
import {PRAYER_PATH_IMAGES} from "../../../constants/ImageConstants.ts";
import {DEFAULT_IMAGE} from "../../../constants/AppConstants.ts";

interface PrayerTimeCardProps {
    prayer: string,
    time?: string | null,
    t: (key: string) => string,
}

const PrayerTimeCard: React.FC<PrayerTimeCardProps> = ({prayer, time, t}) => {
    const backgroundImage = PRAYER_PATH_IMAGES[prayer] || DEFAULT_IMAGE;
    return (
        <Card
            elevation = {5}
            sx = {{
                padding: 3,
                backgroundImage: `url(${backgroundImage})`,
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
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    borderRadius: 'inherit',
                },
            }}
        >
            <CardContent sx = {{position: 'relative', zIndex: 1}} >
                <Typography
                    variant = "h5"
                    sx = {{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '2rem',
                        textShadow: '2px 2px 5px rgba(0, 0, 0, 0.7)',
                    }}
                >
                    {t(`sections.prayers.prayerList.${prayer}`)}
                </Typography >
                <Typography
                    variant = "h6"
                    sx = {{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '2rem',
                        textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
                    }}
                >
                    {time}
                </Typography >
            </CardContent >
        </Card >
    );
};

export default PrayerTimeCard;
