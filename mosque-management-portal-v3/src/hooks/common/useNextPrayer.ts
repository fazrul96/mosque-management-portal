import {useMemo} from 'react';
import {findNextPrayer} from '../../utils/prayerUtils';
import {PrayerTimesInfo} from "../../types/info/PrayerTimesInfo.ts";

export const useNextPrayer = (prayerTimes: PrayerTimesInfo | null, currentTime24: number) => {
    return useMemo(() => {
        if (!prayerTimes) return {
            nextPrayer: null, nextPrayerTime: null, remainingTime: null
        };

        const { nextPrayerDetails } = findNextPrayer(prayerTimes, currentTime24);

        if (!nextPrayerDetails) return { nextPrayer: null, nextPrayerTime: null, remainingTime: null };

        const nextPrayer = nextPrayerDetails.prayer;
        const nextPrayerTime = nextPrayerDetails.prayerTime;

        const remainingTimeInMinutes: number = 2400 - nextPrayerDetails.diff;
        const hours = Math.floor(remainingTimeInMinutes / 60);
        const minutes = remainingTimeInMinutes % 60;
        const seconds = 0;

        const remainingTime = `${hours}h ${minutes}m ${seconds}s`;

        return { nextPrayer, nextPrayerTime, remainingTime };
    }, [prayerTimes, currentTime24]);
};
