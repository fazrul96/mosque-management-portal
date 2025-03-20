import {format, isValid} from 'date-fns';
import {EMPTY_STRING} from "../constants/AppConstants.ts";

interface DateItem {
    date: string;
}

export const formatDate = (item: DateItem | null): string => {
    if (!item || !item.date) {
        return EMPTY_STRING;
    }

    const date = new Date(item.date);

    if (!isValid(date)) {
        throw new Error('The date format is invalid');
    }

    return format(date, 'dd-MMM-yyyy');
};

// Format a date to 'MM/DD/YYYY' format
export const formatDateFull = (date: Date): string => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
};

// Calculate the difference between two dates in days
export const dateDifferenceInDays = (startDate: Date, endDate: Date): number => {
    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.floor(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days
};