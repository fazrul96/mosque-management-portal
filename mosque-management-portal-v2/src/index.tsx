import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { I18nextProvider } from 'react-i18next';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import i18n from './i18n';
import reportWebVitals from './reportWebVitals';

const theme = createTheme();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <I18nextProvider i18n={i18n}>
                <App />
            </I18nextProvider>
        </ThemeProvider>
    </React.StrictMode>
);

reportWebVitals();