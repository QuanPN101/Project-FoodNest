import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from './context/Appcontext';
import Login from './components/Login';

const PrivateRoute = ({ element }) => {
    const { user } = useAppContext();
    if (!user) {
        return <Login />;
    }
    return element;
};

export default PrivateRoute;
