export interface UserSession {
    user?: {
        id?: string | null;
        name?: string | null;
        email?: string | null;
        email_verified?: boolean | false;
        image?: string | null;
    };
}