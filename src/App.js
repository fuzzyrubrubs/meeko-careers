import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './styles/main.scss';
import Router from './Router';

import { AuthProvider } from './contexts/Auth.context';


function App(){  

    return (
        <>
        <AuthProvider>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </AuthProvider>
        </>
    );

};

export default App;