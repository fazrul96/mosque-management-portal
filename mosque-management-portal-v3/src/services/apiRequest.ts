import ApiService from './apiService.ts';
import {HTTP_METHODS} from '../constants/HttpMethodsConstant.ts';
import {ERROR_MESSAGES} from '../constants/ErrorMessagesConstants.ts';
import {SLASH} from "../constants/AppConstants.ts";

class ApiRequest {
    private readonly apiService: ApiService;

    constructor(apiService: ApiService) {
        this.apiService = apiService;
    }

    async makeRequest(method: keyof typeof HTTP_METHODS, url: string, data: Record<string, unknown> = {}): Promise<unknown> {
        let response;
        try {
            const [resourceType, id] = url.split(SLASH).slice(1);
            switch (method) {
                case HTTP_METHODS.POST:
                    response = await this.apiService.createResource(url, data, true);
                    break;
                case HTTP_METHODS.GET:
                    response = await this.apiService.fetchResource(url);
                    break;
                case HTTP_METHODS.PUT:
                    response = await this.apiService.updateResource(resourceType, id, data);
                    break;
                case HTTP_METHODS.PATCH:
                    response = await this.apiService.patchResource(url, data, true);
                    break;
                case HTTP_METHODS.DELETE:
                    response = await this.apiService.deleteResource(resourceType, id);
                    break;
                default:
                    throw new Error(`Unsupported HTTP method: ${method}`);
            }
            return response;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error('An unknown error occurred');
                throw new Error(ERROR_MESSAGES.UNEXPECTED_ERROR.replace('{message}', 'Unknown error'));
            }
        }
    }
}

export default ApiRequest;
