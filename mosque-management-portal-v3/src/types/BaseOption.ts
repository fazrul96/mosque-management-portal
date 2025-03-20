export interface BaseOption {
    label: string;
    value?: string | number | undefined,
}

export interface GeneratePDFOptions<T> {
    data: T[];
    title?: string;
    fileName?: string;
    columns: string[];
    columnNames: (keyof T)[];
    sortedData?: T[] | null;
}