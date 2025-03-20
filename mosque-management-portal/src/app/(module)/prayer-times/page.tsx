'use client';

import {useState} from "react";
import {Box, Breadcrumbs, Card, CardContent, CircularProgress, Divider, Grid2, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next';
import usePrayerData from '@/hooks/usePrayerData';
import {findNextPrayer} from '@/utils/prayerTimes';
import {STATES} from "@/data/stateData";
import StateCitySelector from "@/components/common/form/StateCitySelector";
import NextPrayerCard from "@/components/common/card/NextPrayerCard";
import PrayerTimeCard from "@/components/common/card/PrayerTimeCard";
import Link from "next/link";

const PrayerTimes = () => {
    const { t } = useTranslation();
    const [selectedCity, setSelectedCity] = useState<string>("Kuala Lumpur");
    const [selectedState, setSelectedState] = useState<string>("Wilayah Persekutuan");

    const { prayerTimes, loading, error } = usePrayerData(selectedCity);

    const todayDate = new Date().toLocaleDateString("en-GB", {
        weekday: "long", year: "numeric", month: "short", day: "numeric"
    });

    const currentTime = new Date();
    const currentTimeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    const currentTime24 = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }).replace(":", "");

    // Default times for sanitization
    const defaultPrayerTime = '00:00';

    let nextPrayer = null;
    let nextPrayerTime = null;
    let remainingTime = null;

    if (prayerTimes) {
        const sanitizedPrayerTimes = {
            Fajr: prayerTimes.Fajr ?? defaultPrayerTime,
            Sunrise: prayerTimes.Sunrise ?? defaultPrayerTime,
            Dhuhr: prayerTimes.Dhuhr ?? defaultPrayerTime,
            Asr: prayerTimes.Asr ?? defaultPrayerTime,
            Maghrib: prayerTimes.Maghrib ?? defaultPrayerTime,
            Isha: prayerTimes.Isha ?? defaultPrayerTime,
        };

        const { nextPrayerDetails } = findNextPrayer(
            ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'],
            sanitizedPrayerTimes,
            currentTime24
        );

        if (nextPrayerDetails) {
            nextPrayer = nextPrayerDetails.prayer;
            nextPrayerTime = nextPrayerDetails.prayerTime;
            remainingTime = 2400 - nextPrayerDetails.diff;

            const hours = Math.floor(remainingTime / 60);
            const minutes = remainingTime % 60;
            remainingTime = `${hours}h ${minutes}m`;
        }
    }

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

    const relevantPrayers: Record<string, string | null> = prayerTimes ? {
        Fajr: prayerTimes.Fajr,
        Sunrise: prayerTimes.Sunrise,
        Dhuhr: prayerTimes.Dhuhr,
        Asr: prayerTimes.Asr,
        Maghrib: prayerTimes.Maghrib,
        Isha: prayerTimes.Isha,
    } : {};

    return (
        <Box sx={{ flexGrow: 1, padding: 3, backgroundColor: 'background.paper' }}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 2 }}>
                <Link href="/module/mosque" passHref>
                    <Typography color="inherit" sx={{ textDecoration: 'none' }}>
                        {t('breadcrumb.mosque')}
                    </Typography>
                </Link>
                <Typography color="textPrimary">{t('sections.prayerTimes.title')}</Typography>
            </Breadcrumbs>

            <Card elevation={5} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.85)', borderRadius: 3 }}>
                <CardContent>
                    <Grid2 container spacing={3}>
                        <Grid2 size={{ xs: 12, sm: 12, md: 6 }}>
                            <Typography variant="h4" gutterBottom align="left" fontWeight="bold" color="primary" sx={{ fontSize: '1.8rem' }}>
                                {t('sections.prayerTimes.inCity')} {selectedCity}
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
                            <Box sx={{ textAlign: 'right', paddingRight: 3 }}>
                                <Typography variant="h6" color="textSecondary" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                                    {todayDate}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.9rem', marginTop: 1 }}>
                                    {currentTimeString}
                                </Typography>
                            </Box>
                        </Grid2>
                    </Grid2>

                    <Divider sx={{ marginBottom: 3, marginTop: 3 }} />

                    <Grid2 container spacing={2} justifyContent="center">
                        <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                            <NextPrayerCard nextPrayer={nextPrayer} nextPrayerTime={nextPrayerTime} remainingTime={remainingTime} t={t} />
                        </Grid2>
                    </Grid2>

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
