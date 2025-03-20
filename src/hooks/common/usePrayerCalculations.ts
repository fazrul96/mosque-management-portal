import {useCurrentTime} from "./useCurrentTime.ts";
import {useNextPrayer} from "./useNextPrayer.ts";
import {PrayerTimesInfo} from "../../types/info/PrayerTimesInfo.ts";

interface PrayerTime {
    nextPrayer: string | null;
    nextPrayerTime: string | null;
    remainingTime: string | null;
    currentTimeString: string;
}

const usePrayerCalculations = (prayerTimes: PrayerTimesInfo | null): PrayerTime => {
    const { currentTimeString, currentTime24 } = useCurrentTime();
    const { nextPrayer, nextPrayerTime, remainingTime } = useNextPrayer(prayerTimes, currentTime24);
    return { nextPrayer, nextPrayerTime, currentTimeString, remainingTime };
};

export default usePrayerCalculations;