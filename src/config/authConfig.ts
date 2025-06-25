import {CacheLocation} from "@auth0/auth0-react";

export const getAuthConfig = () => {
    return {
        domain: import.meta.env.VITE_AUTH0_DOMAIN,
        clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
        authorizationParams: {
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
            redirect_uri: window.location.origin,
        },
        cacheLocation: 'localstorage' as CacheLocation,
    };
};