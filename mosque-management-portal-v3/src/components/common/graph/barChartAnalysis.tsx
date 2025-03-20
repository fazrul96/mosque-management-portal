import React, {useEffect, useState} from 'react';
import {Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {useTranslation} from 'react-i18next';
import {
    BarChartComponentProps, DateDonation,
    DonationAnalysisProps,
    LogisticsAnalysisProps, NameDonation, StatusQuantity,
    TopDonorsAnalysisProps
} from "../../../types/props/GraphProps.ts";
import {getDonationYearColor, getLogisticsColor, getTopDonorColor} from "../../../utils/uiUtils.ts";
import CustomTooltip from "../../common/tooltip/tooltip.tsx"

const BarChartComponent = React.memo(<T extends object>({
                                                            data,
                                                            title,
                                                            dataKey,
                                                            labelKey,
                                                            isMobileBreakpoint = 600,
                                                            processData
                                                        }: BarChartComponentProps<T>) => {
    const [chartData, setChartData] = useState<T[]>([]);
    const [isMobile, setIsMobile] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < isMobileBreakpoint);
        };
        handleResize();  // Initialize on mount
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isMobileBreakpoint]);

    useEffect(() => {
        if (processData) {
            const processedData = processData(data);
            setChartData(processedData);
        }
    }, [data, processData]);

    const chartMargin = {top: 20, right: 20, left: 20, bottom: 20};
    const barColor = "#8884d8";

    return (
        <ResponsiveContainer width = "100%" height = {400} >
            <BarChart data = {chartData} margin = {chartMargin} >
                <CartesianGrid strokeDasharray = "3 3" />
                <XAxis
                    dataKey = {labelKey}
                    label = {!isMobile ? {value: title, position: 'bottom'} : undefined}
                    tick = {{
                        fontSize: isMobile ? 10 : 12,
                        transform: isMobile ? 'scale(0.9)' : 'none',
                        fontFamily: 'Arial',
                    }}
                />
                <YAxis
                    label = {
                        !isMobile
                            ? {value: t('analysis.donation.y-axis'), angle: -90, position: 'insideLeft', dy: +100}
                            : undefined
                    }
                    tickFormatter = {(tick) => tick.toLocaleString()}
                    tick = {{fontSize: isMobile ? 10 : 12}}
                />
                <Tooltip content = {<CustomTooltip title = {title} />} />
                <Bar dataKey = {dataKey} fill = {barColor} >
                    <LabelList
                        dataKey = {dataKey}
                        position = "top"
                        formatter={(value: number) => value.toLocaleString()}
                        fontSize = {isMobile ? 10 : 12}
                        fill = "#000"
                    />
                </Bar >
            </BarChart >
        </ResponsiveContainer >
    );
});

const TopDonorsAnalysis: React.FC<TopDonorsAnalysisProps> = ({ data }) => {
    const { t } = useTranslation();

    const processTopDonorsData = (data: NameDonation[]): { name: string; donation: number }[] => {
        const sortedData = [...data].sort((a, b) => b.donation - a.donation);
        return sortedData.slice(0, 5).map((donor) => ({
            name: donor.name,
            donation: donor.donation,
        }));
    };

    return (
        <BarChartComponent
            data = {data}
            title = {t('analysis.topDonors.x-axis')}
            dataKey = "donation"
            labelKey = "name"
            sortKey = "donation"
            maxItems = {5}
            processData={processTopDonorsData as (data: object[]) => object[]}
            getBarColor = {getTopDonorColor}
        />
    );
};

const DonationAnalysis: React.FC<DonationAnalysisProps> = ({ data }) => {
    const { t } = useTranslation();

    const processDonationData = (data: DateDonation[]) => {
        return data?.reduce((acc, user) => {
            const donationYear = new Date(user.date).getFullYear();
            const existingYearData = acc.find(item => item.donation_year === donationYear);

            if (existingYearData) {
                existingYearData.total_donations += user.donation;
            } else {
                acc.push({
                    donation_year: donationYear,
                    total_donations: user.donation,
                });
            }
            return acc;
        }, [] as { donation_year: number; total_donations: number }[]);
    };

    return (
        <BarChartComponent
            data = {data}
            title = {t('analysis.donation.x-axis')}
            dataKey = "total_donations"
            labelKey = "donation_year"
            sortKey = "total_donations"
            maxItems = {5}
            processData={processDonationData as (data: object[]) => object[]}
            getBarColor = {getDonationYearColor}
        />
    );
};

const LogisticsAnalysis: React.FC<LogisticsAnalysisProps> = ({ data }) => {
    const processLogisticsData = (data: StatusQuantity[]) => {
        return data.reduce((acc, item) => {
            const status = item.status;
            const existingStatusData = acc.find(itemData => itemData.status === status);

            if (existingStatusData) {
                existingStatusData.total_quantity += item.quantity;
            } else {
                acc.push({
                    status: status,
                    total_quantity: item.quantity,
                });
            }

            return acc;
        }, [] as { status: string; total_quantity: number }[]);
    };

    return (
        <BarChartComponent
            data = {data}
            title = "Logistic"
            dataKey = "total_quantity"
            labelKey = "status"
            maxItems = {5}
            processData={processLogisticsData as (data: object[]) => object[]}
            getBarColor = {getLogisticsColor}
        />
    );
};

export {TopDonorsAnalysis, DonationAnalysis, LogisticsAnalysis};
