import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './styles/main.scss';
import Router from './Router';

import { AuthProvider } from './contexts/Auth.context';
import { MenuProvider } from './contexts/Menu.context';


function App(){  

    return (
        <>
        <AuthProvider>
            <MenuProvider>
                <BrowserRouter>
                    <Router />
                </BrowserRouter>
            </MenuProvider>
        </AuthProvider>
        </>
    );

};

export default App;