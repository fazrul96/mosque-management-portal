export type FieldType = "text" | "number" | "select" | "date";

export interface BaseItem {
    id?: string;
    date?: string;
    [key: string]: string | number | Date | undefined;
}

export interface DonationsItem extends BaseItem {
    name: string;
    nric: string;
    address: string;
    donation: number;
}

export interface LogisticsItem extends BaseItem {
    itemName: string;
    description: string;
    quantity: number;
    status: string;
    imageLink: string;
}
