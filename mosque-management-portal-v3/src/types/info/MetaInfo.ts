export interface MetaInfo {
    latitude: number;
    longitude: number;
    timezone: string;
    method: {
        id: number;
        name: string;
        params: { Fajr: number; Isha: string };
    };
}