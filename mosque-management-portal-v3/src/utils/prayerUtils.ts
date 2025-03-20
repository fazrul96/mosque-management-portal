import {convertTo24HourFormat} from './timeUtils';
import {PrayerDifferences} from "../types/PrayerDifferences.ts";
import {PrayerTimesInfo} from "../types/info/PrayerTimesInfo.ts";

export const findNextPrayer = (
    prayerTimes: PrayerTimesInfo | null,
    currentTime24: number
): { nextPrayerDetails: PrayerDifferences | null } => {
    if (!prayerTimes) {
        return { nextPrayerDetails: null };
    }

    const prayerDifferences: PrayerDifferences[] = Object.keys(prayerTimes).map(prayer => {
        const prayerTime = prayerTimes[prayer as keyof PrayerTimesInfo];
        if (!prayerTime) return null;

        const prayerTime24 = convertTo24HourFormat(prayerTime);
        let diff = currentTime24 - prayerTime24;

        if (diff < 0) {
            diff += 2400;
        }

        return { prayer, prayerTime, diff };
    }).filter(Boolean) as PrayerDifferences[];

    const sortedPrayers = prayerDifferences.sort((a, b) => b.diff - a.diff);
    const nextPrayerDetails = sortedPrayers[0] || null;

    return { nextPrayerDetails };
};
