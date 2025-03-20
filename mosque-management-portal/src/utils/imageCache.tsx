// Load image from cache using imageUrl as a key
export const loadImageFromCache = (imageUrl: string): string | null => {
    const cachedImage = localStorage.getItem(imageUrl);
    return cachedImage ? cachedImage : null;  // Return cached image or null if not found
};

// Cache an image by setting it in localStorage
export const cacheImage = (imageUrl: string, imageData: string): void => {
    localStorage.setItem(imageUrl, imageData);  // Store imageData under the key imageUrl
};
