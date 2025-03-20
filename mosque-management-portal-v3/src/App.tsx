import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css'
import {publicRoutes} from './routes/AppRoutes.tsx';
import {ROUTE_HOME} from './constants/AppRoutes.ts';
import {PRIVATE_NAVIGATION, PUBLIC_NAVIGATION} from "./components/common/navigation/navigation.tsx";
import DashboardLayoutWrapper from "./components/common/dashboard/dashboardLayoutWrapper.tsx";
import MosquePage from './pages/MosquePage';
import {useAuth0} from "@auth0/auth0-react";
import {Navigation} from "@toolpad/core/AppProvider";

const App: React.FC = () => {
    const { isAuthenticated, user } = useAuth0();
    const navigation: Navigation = isAuthenticated
        ? user?.email === import.meta.env.VITE_USER_EMAIL
            ? [...PUBLIC_NAVIGATION, ...PRIVATE_NAVIGATION]
            : PUBLIC_NAVIGATION
        : PUBLIC_NAVIGATION;

    const customContent = (
        <Routes>
            <Route path={ROUTE_HOME} element={<MosquePage />} />

            {publicRoutes.map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={route.component}
                />
            ))}
        </Routes>
    );
    return (
        <Router>
            <DashboardLayoutWrapper
                navigation={navigation}
                content={customContent}
            />
        </Router>
    );
};

export default App;