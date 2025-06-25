import {useEffect, useState} from 'react';
import {fetchPrayerTimesAladhan, fetchPrayerTimesEsolat} from '../../utils/fetchPrayerTimes';
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

type ApiType = 'aladhan' | 'esolat';

const usePrayerData = (selectedCity: string, apiType: ApiType, zone: string = 'SGR01'): PrayerData => {
    const [prayerTimes, setPrayerTimes] = useState<PrayerTimesInfo | null>(null);
    const [dateInfo, setDateInfo] = useState<any>(null);
    const [metaInfo, setMetaInfo] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getPrayerTimes = async () => {
            setLoading(true);
            try {
                let response: PrayerTimesResponse;

                if (apiType === 'aladhan') {
                    response = await fetchPrayerTimesAladhan(selectedCity);
                } else if (apiType === 'esolat' && zone) {
                    response = await fetchPrayerTimesEsolat(zone);
                } else {
                    throw new Error('Invalid API or missing zone for e-Solat');
                }

                const { timings, date, meta } = response.data;
                console.log(response.data);
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
    }, [selectedCity, apiType, zone]);

    return { prayerTimes, dateInfo, metaInfo, loading, error };
};

export default usePrayerData;
