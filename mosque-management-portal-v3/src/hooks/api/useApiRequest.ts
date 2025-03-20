import {useState} from 'react';
import ApiService from '../../services/apiService.ts';
import ApiRequest from "../../services/apiRequest.ts";
import {HTTP_METHODS} from "../../constants/HttpMethodsConstant.ts";
import {ERROR_MESSAGES} from "../../constants/ErrorMessagesConstants.ts";

const useApiRequest = (
    apiService: ApiService,
    method: keyof typeof HTTP_METHODS,
    url: string,
    data: Record<string, unknown> = {}
) => {
    const [responseData, setResponseData] = useState<unknown | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const request = async () => {
        setLoading(true);
        setError(null);
        try {
            const apiRequestInstance = new ApiRequest(apiService);
            const response = await apiRequestInstance.makeRequest(method, url, data);
            setResponseData(response);
            return response;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
                setError(error.message || 'Something went wrong');
            } else {
                console.error('An unknown error occurred');
                throw new Error(ERROR_MESSAGES.UNEXPECTED_ERROR.replace('{message}', 'Unknown error'));
            }
        } finally {
            setLoading(false);
        }
    };

    return { request, data: responseData, loading, error };
};

export default useApiRequest;
