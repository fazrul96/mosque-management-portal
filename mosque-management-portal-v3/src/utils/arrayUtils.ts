// Get unique elements from an array
export const uniqueArray = <T>(arr: T[]): T[] => {
    return [...new Set(arr)];
};

// Check if an array contains a specific element
export const arrayContains = <T>(arr: T[], value: T): boolean => {
    return arr.includes(value);
};

// Flatten an array of arrays into a single array
export const flattenArray = <T>(arr: T[][]): T[] => {
    return arr.flat();
};
