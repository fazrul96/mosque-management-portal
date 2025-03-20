export interface BarChartComponentProps<T> {
    data: T[],
    title: string,
    dataKey: string,
    labelKey: string,
    maxItems?: number,
    isMobileBreakpoint?: number,
    processData?: (data: T[]) => T[],
    sortKey?: string,
    getBarColor?: object
}

export interface DateDonation {
    date: string;
    donation: number;
}

export interface NameDonation {
    name: string;
    donation: number;
}

export interface StatusQuantity {
    status: string,
    quantity: number
}

export interface DonationAnalysisProps {
    data: DateDonation[];
}

export interface TopDonorsAnalysisProps {
    data: NameDonation[];
}

export interface LogisticsAnalysisProps {
    data: StatusQuantity[]
}