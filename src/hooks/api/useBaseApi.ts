import {useCallback, useState} from 'react';
import useApiRequest from './useApiRequest.ts';
import ApiService from "../../services/apiService.ts";
import {HTTP_METHODS} from "../../constants/HttpMethodsConstant.ts";

interface BaseResource {
    id?: string;
}

const useApi = <T extends BaseResource & Record<string, unknown>>(
    apiUrl: string,
    getAccessTokenSilently: () => Promise<string>
) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const API_PRIVATE_URL = import.meta.env.VITE_API_PRIVATE_URL;

    const apiService = new ApiService(API_BASE_URL + API_PRIVATE_URL, getAccessTokenSilently);

    const [dataItem, setDataItem] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const { request: fetchData } = useApiRequest(apiService, HTTP_METHODS.GET, apiUrl, {});

    const handleError = (error: unknown, defaultMessage: string) => {
        const message = error instanceof Error ? error.message : defaultMessage;
        setError(message);
        console.error(message, error);
    };

    const fetchItems = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const items = await fetchData();

            if (Array.isArray(items)) {
                setDataItem(items);
            } else {
                setDataItem([]);
            }
        } catch (error: unknown) {
            handleError(error, 'Failed to load data');
        } finally {
            setLoading(false);
        }
    }, [fetchData]);

    const addItem = async (newItem: T) => {
        setLoading(true);
        setError(null);

        try {
            await apiService.createResource(apiUrl, newItem);
            setDataItem(prevData => [...prevData, newItem]);
        } catch (error: unknown) {
            handleError(error, 'Error adding item');
        } finally {
            setLoading(false);
        }
    };

    const editItem = async (id: string, updatedItem: Partial<T>) => {
        if (!id) return;

        setLoading(true);
        setError(null);

        try {
            await apiService.patchResource(`${apiUrl}/${id}`, updatedItem);
            setDataItem(prevData =>
                prevData.map(item => (item.id === id ? { ...item, ...updatedItem } : item))
            );
        } catch (error: unknown) {
            handleError(error, 'Error editing item');
        } finally {
            setLoading(false);
        }
    };

    const deleteItem = async (id: string | undefined) => {
        if (!id) return;

        setLoading(true);
        setError(null);

        try {
            await apiService.deleteResourceMosque(`${apiUrl}/${id}`);
            setDataItem(prevData => prevData.filter(item => item.id !== id));
        } catch (error: unknown) {
            handleError(error, 'Error deleting item');
        } finally {
            setLoading(false);
        }
    };

    return {
        dataItem,
        loading,
        error,
        fetchItems,
        addItem,
        deleteItem,
        editItem
    };
};

export default useApi;
