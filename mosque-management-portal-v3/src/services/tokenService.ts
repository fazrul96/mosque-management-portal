import {AUTH0_PROMPT, AUTH0_SCOPE_READ_ITEMS} from "../constants/ApiConstants.ts";
import {AccessTokenOptions} from "../types/AccessTokenOptions.ts";

export class TokenService {
    private static token: string | null = null;
    private static tokenExpiry: number | null = null;

    static isTokenExpired(): boolean {
        return !this.token || Date.now() > (this.tokenExpiry || 0);
    }

    static async setToken(
        getAccessTokenSilently: (options: AccessTokenOptions) => Promise<string>
    ) {
        try {
            if (this.isTokenExpired()) {
                this.token = await getAccessTokenSilently({
                    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
                    scope: AUTH0_SCOPE_READ_ITEMS,
                    prompt: AUTH0_PROMPT,
                });
                this.tokenExpiry = Date.now() + 3600 * 1000; // Token expires in 1 hour
            }
        } catch (error) {
            console.error('Error fetching token:', error);
            throw error;
        }
    }

    static getToken(): string | null {
        return this.token;
    }
}
