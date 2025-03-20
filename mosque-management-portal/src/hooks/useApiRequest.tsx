import { useState, useCallback } from 'react';
import makeApiRequest from "@/utils/apiUtils";

/**
 * Custom React hook to manage API requests with state management for loading, error, and response data.
 *
 * @param {Object} apiService - The API service instance to interact with the API.
 * @param {string} method - The HTTP method (GET, POST, PUT, DELETE).
 * @param {string} url - The API endpoint URL.
 * @param {Object} data - The request payload (only for POST/PUT).
 * @param {string|null} cacheKey - Optional cache key to store and reuse data.
 *
 * @returns {Object} - The request state, including loading, error, and response data.
 */
const useApiRequest = (apiService, method, url, data = {}, cacheKey = null) => {
    const [responseData, setResponseData] = useState(
        cacheKey ? JSON.parse(localStorage.getItem(cacheKey) as string)?.data || null : null
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async () => {
        if (cacheKey && responseData) return responseData; // Return cached data if available

        setLoading(true);
        setError(null); // Reset error before each request

        try {
            const response = await makeApiRequest(apiService, method, url, data);
            setResponseData(response);

            if (cacheKey) {
                localStorage.setItem(cacheKey, JSON.stringify({ data: response, timestamp: Date.now() }));
            }

            setLoading(false);
            return response;
        } catch (err) {
            setError(err.message || 'Something went wrong');
            setLoading(false);
            console.error("Error:", err.message);
        }
    }, [apiService, method, url, data, cacheKey, responseData]);

    return { request, data: responseData, loading, error };
};

export default useApiRequest;
