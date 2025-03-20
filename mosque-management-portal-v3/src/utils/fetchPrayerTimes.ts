import {PrayerTimesResponse} from "../types/PrayerTimesResponse.ts";

export const fetchPrayerTimes = async (city: string): Promise<PrayerTimesResponse> => {
    const url = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Malaysia&method=8`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch prayer times. HTTP status: ${response.status}`);
        }

        const { code, data } = await response.json();

        if (code !== 200) {
            throw new Error(`Failed to fetch prayer times. API response code: ${code}`);
        }

        const { timings, date, meta } = data;

        return { code, data: { timings, date, meta } };

    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        throw new Error(`Error fetching prayer times: ${errorMessage}`);
    }
};