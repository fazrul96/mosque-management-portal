'use client';

import {useEffect, useState} from 'react';
import {fetchPrayerTimes} from "@/utils/prayerTimes";

interface PrayerTimes {
    Fajr: string | null;
    Sunrise: string | null;
    Dhuhr: string | null;
    Asr: string | null;
    Maghrib: string | null;
    Isha: string | null;
}

const usePrayerData = (selectedCity: string) => {
    const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getPrayerTimes = async () => {
            try {
                const data = await fetchPrayerTimes(selectedCity);
                setPrayerTimes(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred.");
                }
            } finally {
                setLoading(false);
            }
        };

        getPrayerTimes();
    }, [selectedCity]);

    return { prayerTimes, loading, error };
};

export default usePrayerData;