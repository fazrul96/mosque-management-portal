// Constants for HTTP methods
export const HTTP_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
};

// Constants for API error messages
export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error. Please check your connection.',
    API_ERROR: 'API Error: {status} - {message}',
    UNEXPECTED_ERROR: 'Unexpected error: {message}',
};

// Utility function to handle API requests with retry, caching, and improved error handling
const makeApiRequest = async (apiService, method, url, data = {}, cacheKey = null) => {
    let response;
    const retryRequest = async (fn, retries = 3) => {
        let attempt = 0;
        while (attempt < retries) {
            try {
                return await fn();
            } catch (error) {
                if (attempt >= retries - 1) throw error;
                attempt++;
                await new Promise(resolve => setTimeout(resolve, 1000)); // Retry delay
            }
        }
    };

    try {
        // Retry logic
        const requestFunction = () => {
            switch (method) {
                case HTTP_METHODS.GET:
                    return apiService.fetchResource(url);
                case HTTP_METHODS.POST:
                    return apiService.createResource(url, data, true);
                case HTTP_METHODS.PUT:
                    return apiService.updateResource(url, data, true);
                case HTTP_METHODS.PATCH:
                    return apiService.patchResource(url, data, true);
                case HTTP_METHODS.DELETE:
                    return apiService.deleteResource(url);
                default:
                    throw new Error(`Unsupported HTTP method: ${method}`);
            }
        };

        // Handle caching (if cacheKey is provided)
        if (cacheKey) {
            const cachedResponse = sessionStorage.getItem(cacheKey);
            if (cachedResponse) {
                return JSON.parse(cachedResponse);
            }
        }

        response = await retryRequest(requestFunction);

        // Cache the response if needed
        if (cacheKey) {
            sessionStorage.setItem(cacheKey, JSON.stringify(response));
        }

        return response;
    } catch (error) {
        if (error.response) {
            throw new Error(ERROR_MESSAGES.API_ERROR.replace('{status}', error.response.status).replace('{message}', error.response.data.message));
        } else if (error.request) {
            throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
        } else {
            throw new Error(ERROR_MESSAGES.UNEXPECTED_ERROR.replace('{message}', error.message));
        }
    }
};

export default makeApiRequest;
