import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Auth0Provider} from "@auth0/auth0-react";
import {I18nextProvider} from 'react-i18next';
import i18n from './i18n';
import {getAuthConfig} from "./config/authConfig.ts";

const theme = createTheme();
const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <StrictMode>
        <Auth0Provider {...getAuthConfig()}>
            <ThemeProvider theme={theme}>
                <I18nextProvider i18n={i18n}>
                    <App />
                </I18nextProvider>
            </ThemeProvider>
        </Auth0Provider>
    </StrictMode>
);