export const API_BASE_URL: string = process.env.REACT_APP_BASE_URL || "https://spring-boot-app.mfzrl.cyou" || 'http://localhost:8080';
export const API_PRIVATE_URL: string | undefined = process.env.REACT_APP_API_PRIVATE_URL;
export const API_PUBLIC_URL: string | undefined = process.env.REACT_APP_API_PUBLIC_URL;

export const API_FLASK_BASE_URL: string = process.env.REACT_APP_API_FLASK_BASE_URL || 'http://localhost:5001';

export const MOSQUE_USERS: string = 'mosque-user-donations';
export const MOSQUE_USER_ID: string = 'mosque-user-donations/{id}';
export const MOSQUE_INVENTORIES: string = 'mosque-inventories';
export const MOSQUE_INVENTORY_ID: string = 'mosque-inventories/{id}';

export const ACCOUNT_MESSAGES: string = 'accounts/messages';