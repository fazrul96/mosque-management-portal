import React, {useState} from 'react';
import {Box, Breadcrumbs, Card, CardContent, CircularProgress, Divider, Grid2, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next';
import usePrayerData from "../../hooks/common/usePrayerData.ts";
import usePrayerCalculations from "../../hooks/common/usePrayerCalculations.ts";
import {Link} from 'react-router-dom';
import PrayerTimeCard from '../../components/common/card/prayerTimeCard.tsx';
import NextPrayerCard from "../../components/common/card/nextPrayerCard.tsx";
import StateCitySelector from '../../components/common/form/stateCitySelector.tsx';
import DateTimeDisplay from "../../components/common/dateTimeDisplay.tsx";
import {STATES} from '../../data/stateData.tsx';
import {PrayerTimesInfo} from "../../types/info/PrayerTimesInfo.ts";

const PrayerTimes: React.FC = () => {
    const { t } = useTranslation();
    const [selectedCity, setSelectedCity] = useState<string>("Kuala Lumpur");
    const [selectedState, setSelectedState] = useState<string>("Wilayah Persekutuan");

    const { prayerTimes, dateInfo, metaInfo, loading, error } = usePrayerData(selectedCity);
    const { nextPrayer, nextPrayerTime, currentTimeString, remainingTime } = usePrayerCalculations(prayerTimes);

    const todayDate = new Date().toLocaleDateString("en-GB", {
        weekday: "long", year: "numeric", month: "short", day: "numeric"
    });

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="background.paper">
                <CircularProgress size={60} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="background.paper">
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Box>
        );
    }

    const prayerTimesList = [
        { key: 'Fajr', label: t('fajr') },
        { key: 'Sunrise', label: t('sunrise') },
        { key: 'Dhuhr', label: t('dhuhr') },
        { key: 'Asr', label: t('asr') },
        { key: 'Maghrib', label: t('maghrib') },
        { key: 'Isha', label: t('isha') },
    ];

    const relevantPrayers = prayerTimesList.reduce((acc, prayer) => {
        if (prayerTimes && prayerTimes[prayer.key as keyof PrayerTimesInfo]) {
            acc[prayer.label] = prayerTimes[prayer.key as keyof PrayerTimesInfo];
        }
        return acc;
    }, {} as { [key: string]: string | null });

    return (
        <Box sx={{ flexGrow: 1, padding: 3, backgroundColor: 'background.paper' }}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 2 }}>
                <Link color="inherit" to="/">{t('breadcrumb.mosque')}</Link>
                <Typography color="textPrimary">{t('sections.prayers.title')}</Typography>
            </Breadcrumbs>

            <Card elevation={5} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.85)', borderRadius: 3 }}>
                <CardContent>
                    <Grid2 container spacing={3}>
                        <Grid2 size={{ xs: 12, sm: 12, md: 6 }}>
                            <Typography variant="h4" gutterBottom align="left" fontWeight="bold" color="primary" sx={{ fontSize: '1.8rem' }}>
                                {t('sections.prayers.inCity')} {selectedCity}
                            </Typography>
                            <StateCitySelector
                                states={STATES}
                                selectedState={selectedState}
                                setSelectedState={setSelectedState}
                                selectedCity={selectedCity}
                                setSelectedCity={setSelectedCity}
                                t={t}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 12, md: 6 }}>
                            <DateTimeDisplay todayDate={todayDate} currentTimeString={currentTimeString} dateInfo={dateInfo} metaInfo={metaInfo}/>
                        </Grid2>
                    </Grid2>

                    <Divider sx={{ marginBottom: 3, marginTop: 3 }} />

                    {/* Display the next prayer time */}
                    <Grid2 container spacing={2} justifyContent="center">
                        <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                            <NextPrayerCard nextPrayer={nextPrayer} nextPrayerTime={nextPrayerTime} remainingTime={remainingTime} t={t} />
                        </Grid2>
                    </Grid2>

                    {/* Display prayer times */}
                    <Grid2 container spacing={2} justifyContent="center" sx={{ marginTop: 3 }}>
                        {Object.keys(relevantPrayers).map((prayer) => (
                            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 2 }} key={prayer}>
                                <PrayerTimeCard prayer={prayer} time={relevantPrayers[prayer]} t={t} />
                            </Grid2>
                        ))}
                    </Grid2>
                </CardContent>
            </Card>
        </Box>
    );
};

export default PrayerTimes;
