'use client';

import { useEffect, useState } from 'react';

// Define the type for the imageUrl parameter
export const useImageCache = (imageUrl: string): boolean => {
    // imageLoaded is a boolean state
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    useEffect(() => {
        // Check if the image is already cached in localStorage
        const cachedImage = localStorage.getItem(imageUrl);

        if (cachedImage) {
            // If the image is cached, set it as loaded
            setImageLoaded(true);
        } else {
            // Otherwise, load the image and cache it once it's loaded
            const img = new Image();
            img.src = imageUrl;
            img.onload = () => {
                // Store the image as loaded in localStorage
                localStorage.setItem(imageUrl, 'loaded');
                setImageLoaded(true);
            };
        }
    }, [imageUrl]);

    return imageLoaded;
};
