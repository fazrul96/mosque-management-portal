import {DateInfo} from "./info/DateInfo.ts";
import {MetaInfo} from "./info/MetaInfo.ts";

export interface PrayerTimesResponse {
    code: number;
    data: {
        timings: { [key: string]: string };
        date: DateInfo;
        meta: MetaInfo;
    };
}
