import axios, {AxiosResponse} from 'axios';
import {HTTP_METHODS} from "../constants/HttpMethodsConstant.ts";
import {TokenService} from "./tokenService.ts";
import {AccessTokenOptions} from "../types/AccessTokenOptions.ts";

class ApiService {
    private readonly api;
    private readonly getAccessTokenSilently: (options: AccessTokenOptions) => Promise<string>;

    constructor(baseURL: string, getAccessTokenSilently: (options: AccessTokenOptions) => Promise<string>) {
        this.api = axios.create({
            baseURL,
            withCredentials: true,
            timeout: 1000000 // 1000 sec
        });
        this.getAccessTokenSilently = getAccessTokenSilently;
    }

    private async setHeaders(isSecure: boolean = false): Promise<Record<string, string>> {
        const headers: Record<string, string> = { 'Content-Type': 'application/json' };

        if (isSecure) {
            try {
                await TokenService.setToken(this.getAccessTokenSilently);
                const token = TokenService.getToken();
                if (token) {
                    headers.Authorization = `Bearer ${token}`;
                }
            } catch (error) {
                console.error('Error fetching token:', error);
                throw error;
            }
        }

        return headers;
    }

    private async makeRequest<T>(
        method: keyof typeof HTTP_METHODS,
        url: string,
        data: Record<string, unknown> = {},
        isFormData: boolean = false
    ): Promise<T> {
        const headers = await this.setHeaders(true);

        let requestData: any;
        if (isFormData) {
            requestData = new FormData();
            for (const key in data) {
                requestData.append(key, data[key]);
            }
            headers['Content-Type'] = 'multipart/form-data';
        } else {
            requestData = data;
            headers['Content-Type'] = 'application/json';
        }

        try {
            const response: AxiosResponse<T> = await this.api.request({
                method,
                url,
                headers,
                data: requestData,
            });
            return response.data;
        } catch (error: any) {
            console.error(`Error in ${method} request to ${url}:`, error.response || error.message);
            throw error;
        }
    }

    async fetchResource<T>(resourceType: string): Promise<T> {
        return this.makeRequest<T>(HTTP_METHODS.GET, `/${resourceType}`);
    }

    async fetchResourceWithParams<T>(endpoint: string, params: Record<string, unknown> = {}): Promise<T> {
        const headers = await this.setHeaders(true);
        try {
            const response: AxiosResponse<T> = await this.api.get(endpoint, { headers, params });
            return response.data;
        } catch (error: any) {
            console.error(`Error fetching data from ${endpoint}:`, error.response || error.message);
            throw error;
        }
    }

    async fetchResourceWithFormData<T>(endpoint: string, formData: FormData): Promise<T> {
        const headers = await this.setHeaders(true);
        delete headers['Content-Type'];

        try {
            const response: AxiosResponse<T> = await this.api.post(endpoint, formData, { headers });
            return response.data;
        } catch (error: any) {
            console.error(`Error fetching data from ${endpoint} with FormData:`, error.response || error.message);
            throw error;
        }
    }

    async createResource<T>(resourceType: string, data: Record<string, unknown>, isFormData: boolean = false): Promise<T> {
        return this.makeRequest<T>(HTTP_METHODS.POST, `/${resourceType}`, data, isFormData);
    }

    async updateResource<T>(resourceType: string, id: string, data: Record<string, unknown>): Promise<T> {
        return this.makeRequest<T>(HTTP_METHODS.PUT, `/${resourceType}/${id}`, data);
    }

    async patchResource<T>(resourceType: string, data: Partial<T>, isFormData: boolean = false): Promise<T> {
        return this.makeRequest<T>(HTTP_METHODS.PATCH, `/${resourceType}`, data, isFormData);
    }
    async deleteResource<T>(resourceType: string, id: string): Promise<T> {
        return this.makeRequest<T>(HTTP_METHODS.DELETE, `/${resourceType}/${id}`);
    }

    async deleteResourceMosque(resourceType: string): Promise<void> {
        return this.makeRequest<void>(HTTP_METHODS.DELETE, `/${resourceType}`);
    }

    async deleteResourceFile(endpoint: string, params: Record<string, never> = {}): Promise<void> {
        const headers = await this.setHeaders(true);
        try {
            await this.api.delete(endpoint, { headers, params });
        } catch (error: any) {
            console.error(`Error deleting resource at ${endpoint}:`, error.response?.data || error.message);
            throw error;
        }
    }
}

export default ApiService;