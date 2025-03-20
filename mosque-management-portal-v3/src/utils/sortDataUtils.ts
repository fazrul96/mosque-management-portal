type SortDirection = 'asc' | 'desc';

interface DataItem {
    [key: string]: string | number | Date | undefined; // Allows for more flexible types including undefined
}

export const sortData = <T extends DataItem>(
    data: T[], // Array of objects with string, number, or Date properties
    sortBy: keyof T, // The key to sort by (ensuring type safety with keyof T)
    direction: SortDirection = 'asc' // Default direction is ascending
): T[] => {
    return data.sort((a, b) => {
        let valueA = a[sortBy] ?? ''; // Use fallback (empty string) if field is missing or undefined
        let valueB = b[sortBy] ?? '';

        // Handle 'Date' field (convert string or Date to Date object for proper comparison)
        if (valueA instanceof Date && valueB instanceof Date) {
            return direction === 'asc' ? valueA.getTime() - valueB.getTime() : valueB.getTime() - valueA.getTime();
        } else if (typeof valueA === 'string' && typeof valueB === 'string') {
            // Handle string fields (case-insensitive comparison)
            valueA = valueA.toLowerCase();
            valueB = valueB.toLowerCase();
        } else if (typeof valueA === 'number' && typeof valueB === 'number') {
            // Handle number fields
            return direction === 'asc' ? valueA - valueB : valueB - valueA;
        }

        // Default sorting for other types (strings, numbers, etc.)
        return direction === 'asc' ? (valueA > valueB ? 1 : -1) : (valueB > valueA ? 1 : -1);
    });
};
