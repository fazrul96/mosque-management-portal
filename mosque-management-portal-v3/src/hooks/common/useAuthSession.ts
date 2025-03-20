import {useEffect, useMemo, useState} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import {UserSession} from "../../types/UserSession.ts";
import {getBaseUrl} from "../../config/authConfig.ts";

const useAuthSession = () => {
    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
    const [session, setSession] = useState<UserSession | null>(null);

    useEffect(() => {
        if (isAuthenticated && user) {
            setSession({
                user: {
                    name: user.name,
                    email: user.email,
                    email_verified: user.email_verified,
                    image: user.picture,
                },
            });
        } else {
            setSession(null);
        }
    }, [isAuthenticated, user]);

    const authentication = useMemo(() => ({
        signIn: () => loginWithRedirect(),
        signOut: () => {
            logout({
                logoutParams: { returnTo: getBaseUrl() },
            });
            setSession(null);
        },
    }), [loginWithRedirect, logout]);
    return { session, authentication };
};

export default useAuthSession;