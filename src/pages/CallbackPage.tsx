import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth0} from '@auth0/auth0-react';
import {SLASH} from "../constants/AppConstants.ts";

const CallbackPage = () => {
    const {
        isLoading,
        error,
        handleRedirectCallback,
    } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        const processCallback = async () => {
            try {
                await handleRedirectCallback();
                navigate(SLASH);
            } catch (err) {
                console.error('Callback error:', err);
            }
        };

        processCallback();
    }, [navigate, handleRedirectCallback]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return <h2>Processing login...</h2>;
};

export default CallbackPage;