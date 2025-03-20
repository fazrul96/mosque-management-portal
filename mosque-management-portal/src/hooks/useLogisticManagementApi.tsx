import { useCallback, useMemo, useState } from 'react';
import ApiService from './../../services/ApiService';
import {API_BASE_URL, API_PRIVATE_URL, MOSQUE_INVENTORIES} from "@/constants/apiConstants";

// Define types for your data and API responses
interface InventoryItem {
    id: number;
    itemName: string;
    status: string;
    quantity: number;
    description: string;
}

interface UseLogisticManagementApi {
    usersData: InventoryItem[];
    loading: boolean;
    error: string | null;
    fetchUsers: () => Promise<void>;
    addUser: (newUser: InventoryItem) => Promise<void>;
    editUser: (id: number, updatedUser: InventoryItem) => Promise<void>;
    deleteUser: (id: number) => Promise<void>;
}

const useLogisticManagementApi = (getAccessTokenSilently: () => Promise<string>): UseLogisticManagementApi => {
    const apiService = useMemo(
        () => new ApiService(API_BASE_URL + API_PRIVATE_URL, getAccessTokenSilently),
        [getAccessTokenSilently]
    );

    const [usersData, setUsersData] = useState<InventoryItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiService.fetchResource(MOSQUE_INVENTORIES);
            setUsersData(response);
        } catch (error) {
            setError('Failed to load users data');
            console.error('Error fetching users data:', error);
        } finally {
            setLoading(false);
        }
    }, [apiService]);

    const addUser = async (newUser: InventoryItem) => {
        try {
            await apiService.createResource(MOSQUE_INVENTORIES, newUser);
            setUsersData((prevData) => [...prevData, newUser]);
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const editUser = async (id: number, newUser: InventoryItem) => {
        try {
            await apiService.patchResource(`mosque-inventories/${id}`, newUser);
            setUsersData((prevData) => prevData.map((user) => (user.id === id ? { ...user, ...newUser } : user)));
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const deleteUser = async (id: number) => {
        try {
            await apiService.deleteResourceMosque(`mosque-inventories/${id}`);
            setUsersData((prevData) => prevData.filter((user) => user.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return {
        usersData,
        loading,
        error,
        fetchUsers,
        addUser,
        editUser,
        deleteUser
    };
};

export default useLogisticManagementApi;
