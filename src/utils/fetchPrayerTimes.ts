import {PrayerTimesResponse} from "../types/PrayerTimesResponse.ts";

export const fetchPrayerTimesAladhan = async (city: string): Promise<PrayerTimesResponse> => {
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

export const fetchPrayerTimesEsolat = async (zone: string): Promise<PrayerTimesResponse> => {
    const url = `https://www.e-solat.gov.my/index.php?r=esolatApi/TakwimSolat&period=today&zone=${zone}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch prayer times. HTTP status: ${response.status}`);
        }

        const { prayerTime, status } = await response.json();

        if (status !== "OK!") {
            throw new Error(`Failed to fetch prayer times. API response status: ${status}`);
        }

        const prayerTimes = prayerTime[0];

        const timings = {
            Imsak: prayerTimes.imsak,
            Fajr: prayerTimes.fajr,
            Sunrise: prayerTimes.syuruk,
            Dhuha: prayerTimes.dhuha,
            Dhuhr: prayerTimes.dhuhr,
            Asr: prayerTimes.asr,
            Maghrib: prayerTimes.maghrib,
            Isha: prayerTimes.isha,
        };

        const date = {
            gregorian: {
                date: prayerTimes.date,
            },
            hijri: {
                date: prayerTimes.hijri,
                day: prayerTimes.day,
            }
        };

        const meta = {
            zone: zone,
            periodType: "today",
        };

        return { code: 200, data: { timings, date, meta } };

    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        throw new Error(`Error fetching prayer times: ${errorMessage}`);
    }
};
