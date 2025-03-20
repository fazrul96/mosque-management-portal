import {CacheLocation} from "@auth0/auth0-react";
import {ROUTE_CALLBACK} from "../constants/AppRoutes.ts";
import {ENV_PROD} from "../constants/AppConstants.ts";

export const getBaseUrl = () => {
    return import.meta.env.VITE_ACTIVE_PROFILE === ENV_PROD
        ? import.meta.env.VITE_PUBLIC_URL
        : window.location.origin;
};

export const getCallbackUrl = () => {
    return import.meta.env.VITE_ACTIVE_PROFILE === ENV_PROD
        ? import.meta.env.VITE_PUBLIC_URL + ROUTE_CALLBACK
        : window.location.origin;
};

export const getAuthConfig = () => ({
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    authorizationParams: {
        redirect_uri: getCallbackUrl(),
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    },
    cacheLocation: 'localstorage' as CacheLocation,
});
