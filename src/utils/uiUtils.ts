export const getAgeColor = (age: number): string => {
    if (age <= 18) return "#4caf50"; // Green for lowest priority
    if (age <= 35) return "#ffeb3b"; // Yellow for medium priority
    if (age <= 50) return "#ff9800"; // Orange for high priority
    return "#ff3d00"; // Red for highest priority (50+)
};

export const getTopDonorColor = (entry: { donation: number }) => {
    if (entry.donation > 10000) {
        return "#ff7300"; // High donation in orange
    } else if (entry.donation > 5000) {
        return "#387908"; // Medium donation in green
    } else {
        return "#8884d8"; // Low donation in default blue
    }
};

export const getDonationYearColor = (data: { donation_year: number }) => {
    const year = data?.donation_year;
    if (typeof year !== 'number') {
        return "#387908";
    }

    switch (year) {
        case 2024:
            return "#ff7300";
        case 2023:
            return "#8884d8";
        case 2022:
            return "#387908";
        default:
            return "#387908";
    }
};

export const getLogisticsColor = (entry: { status: string }) => {
    if (entry.status === "Available") {
        return "#387908"; // Green for Available
    } else if (entry.status === "In Use") {
        return "#ff7300";
    } else {
        return "#8884d8";
    }
};