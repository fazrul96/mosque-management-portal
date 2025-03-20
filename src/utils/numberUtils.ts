// Format number with commas as thousand separators
export const formatNumberWithCommas = (num: number): string => {
    return num.toLocaleString();
};

// Convert a number to a string with a specified number of decimal places
export const toFixed = (num: number, decimals: number): string => {
    return num.toFixed(decimals);
};

// Check if a number is within a given range
export const isNumberInRange = (num: number, min: number, max: number): boolean => {
    return num >= min && num <= max;
};
