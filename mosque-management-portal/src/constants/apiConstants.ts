// apiUrls.js
export const API_BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';
export const API_PRIVATE_URL = process.env.REACT_APP_API_PRIVATE_URL;
export const API_PUBLIC_URL = process.env.REACT_APP_API_PUBLIC_URL;
export const API_FLASK_BASE_URL = process.env.REACT_APP_API_FLASK_BASE_URL || 'http://localhost:5001';

// authConstants.js
export const AUTH0_AUDIENCE = process.env.REACT_APP_AUTH0_AUDIENCE;
export const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN;
export const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID;
export const AUTH0_SCOPE_READ_ITEMS = 'read:items';
export const AUTH0_PROMPT = 'consent';
export const CACHE_EXPIRATION_TIME = 60 * 60 * 1000;

// mosqueConstants.js
export const MOSQUE_USERS = 'mosque-user-donations';
export const MOSQUE_USER_ID = 'mosque-user-donations/{id}';
export const MOSQUE_INVENTORIES = 'mosque-inventories';
export const MOSQUE_INVENTORY_ID = 'mosque-inventories/{id}';
