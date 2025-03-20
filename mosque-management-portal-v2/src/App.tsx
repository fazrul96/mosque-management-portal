import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { ROUTE_MODULE, ROUTE_MOSQUE } from './constants/AppRoutes';
import MosquePage from './pages/MosquePage';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path={ROUTE_MODULE + ROUTE_MOSQUE} element={<MosquePage />} />
            </Routes>
        </Router>
    );
};

export default App;
