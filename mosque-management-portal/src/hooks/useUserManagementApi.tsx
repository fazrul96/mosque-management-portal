// import { useCallback, useMemo, useState } from 'react';
// import ApiService from './../../services/ApiService';
// import {API_BASE_URL, API_PRIVATE_URL, MOSQUE_USERS} from "@/constants/apiConstants";
// import useApiRequest from "@/hooks/useApiRequest";
//
//
// // Define the type for user data
// interface User {
//     id: number;
//     name: string;
//     email: string;
//     // Add other properties of user as needed
// }
//
// // Define the type for the hook's return value
// interface UseUserManagementApiReturn {
//     usersData: User[];
//     loading: boolean;
//     error: string | null;
//     fetchUsers: () => Promise<void>;
//     addUser: (newUser: User) => Promise<void>;
//     deleteUser: (id: number) => Promise<void>;
//     editUser: (id: number, newUser: Partial<User>) => Promise<void>;
// }
//
// /**
//  * Custom hook to manage user data (fetch, add, edit, delete).
//  *
//  * @param {function} getAccessTokenSilently - Function to get the access token.
//  *
//  * @returns {UseUserManagementApiReturn} - The user data and functions for interacting with the API.
//  */
// const useUserManagementApi = (getAccessTokenSilently: () => Promise<string>): UseUserManagementApiReturn => {
//     const apiService = useMemo(
//         () => new ApiService(API_BASE_URL + API_PRIVATE_URL, getAccessTokenSilently),
//         [getAccessTokenSilently]
//     );
//
//     const [usersData, setUsersData] = useState<User[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//
//     const { request: fetchUsersData } = useApiRequest(apiService, 'GET', MOSQUE_USERS, {});
//
//     // const { request: deleteUserRequest } = useApiRequest(apiService, 'DELETE', MOSQUE_USERS);
//
//     const fetchUsers = useCallback(async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await fetchUsersData();
//             setUsersData(response);
//         } catch (error: any) {
//             setError(error.message || 'Failed to load users data');
//             console.error('Error fetching users data:', error);
//         } finally {
//             setLoading(false);
//         }
//     }, [apiService]);
//
//     const addUser = async (newUser: User) => {
//         setLoading(true);
//         setError(null);
//         try {
//             await apiService.createResource(MOSQUE_USERS, newUser);
//             setUsersData((prevData) => [...prevData, newUser]);
//         } catch (error: never) {
//             setError(error.message || 'Error adding user');
//             console.error('Error adding user:', error);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     const editUser = async (id: number, newUser: Partial<User>) => {
//         setLoading(true);
//         setError(null);
//         try {
//             await apiService.patchResource(`${MOSQUE_USERS}/${id}`, newUser);
//             setUsersData((prevData) =>
//                 prevData.map((user) => (user.id === id ? { ...user, ...newUser } : user))
//             );
//         } catch (error: never) {
//             setError(error.message || 'Error editing user');
//             console.error('Error editing user:', error);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     const deleteUser = async (id: number) => {
//         setLoading(true);
//         setError(null);
//         try {
//             await apiService.deleteResourceMosque(`${MOSQUE_USERS}/${id}`);
//             setUsersData((prevData) => prevData.filter((user) => user.id !== id));
//         } catch (error: never) {
//             setError(error.message || 'Error deleting user');
//             console.error('Error deleting user:', error);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     return {
//         usersData,
//         loading,
//         error,
//         fetchUsers,
//         addUser,
//         deleteUser,
//         editUser,
//     };
// };
//
// export default useUserManagementApi;
