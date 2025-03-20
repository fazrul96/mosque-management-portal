import {useEffect, useState} from 'react';
import {fetchPrayerTimes} from '../../utils/fetchPrayerTimes';
import {PrayerTimesResponse} from "../../types/PrayerTimesResponse.ts";
import {PrayerTimesInfo} from "../../types/info/PrayerTimesInfo.ts";
import {DateInfo} from "../../types/info/DateInfo.ts";
import {MetaInfo} from "../../types/info/MetaInfo.ts";

interface PrayerData {
    prayerTimes: PrayerTimesInfo | null;
    dateInfo: DateInfo | null;
    metaInfo: MetaInfo | null;
    loading: boolean;
    error: string | null;
}

const usePrayerData = (selectedCity: string): PrayerData => {
    const [prayerTimes, setPrayerTimes] = useState<PrayerTimesInfo | null>(null);
    const [dateInfo, setDateInfo] = useState<DateInfo | null>(null);
    const [metaInfo, setMetaInfo] = useState<MetaInfo | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getPrayerTimes = async () => {
            try {
                const response: PrayerTimesResponse = await fetchPrayerTimes(selectedCity);
                const { timings, date, meta } = response.data;

                const formattedPrayerTimes: PrayerTimesInfo = {
                    Fajr: timings.Fajr || null,
                    Sunrise: timings.Sunrise || null,
                    Dhuhr: timings.Dhuhr || null,
                    Asr: timings.Asr || null,
                    Maghrib: timings.Maghrib || null,
                    Isha: timings.Isha || null,
                };

                setPrayerTimes(formattedPrayerTimes);
                setDateInfo(date);
                setMetaInfo(meta);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        getPrayerTimes();
    }, [selectedCity]);

    return { prayerTimes, dateInfo, metaInfo, loading, error };
};

export default usePrayerData;
