import {DASH, SINGLE_SPACE} from "../constants/AppConstants.ts";

// Convert a string to Proper Case (Title Case)
export const toProperCase = (text: string): string => {
    return text
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());
};

// Capitalize the first letter of a string
export const capitalizeFirstLetter = (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

// Convert a string to snake_case (e.g., "hello world" -> "hello_world")
export const toSnakeCase = (text: string): string => {
    return text
        .replace(/\s+/g, '_') // Replace spaces with underscores
        .toLowerCase(); // Ensure the text is lowercase
};

// Convert a string to kebab-case (e.g., "hello world" -> "hello-world")
export const toKebabCase = (text: string): string => {
    return text
        .replace(/\s+/g, DASH) // Replace spaces with hyphens
        .toLowerCase(); // Ensure the text is lowercase
};

// Capitalize each word in a string (title case)
export const capitalizeWords = (text: string): string => {
    return text
        .split(SINGLE_SPACE)
        .map(word => capitalizeFirstLetter(word)) // Capitalize each word
        .join(SINGLE_SPACE); // Join them back into a single string
};

export const getFirstName = (text: string): string => {
    return text.split(SINGLE_SPACE)[0];
};

// Remove whitespace from the beginning and end of a string
export const trimWhitespace = (text: string): string => {
    return text.trim();
};
