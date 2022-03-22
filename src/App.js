import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './styles/main.scss';
import Router from './Router';

import { AuthProvider } from './contexts/Auth.context';
import { MenuProvider } from './contexts/Menu.context';
import { NotificationProvider } from './contexts/Notification.context';


function App(){  

    return (
        <>
        <AuthProvider>
            <MenuProvider>
                <NotificationProvider>
                    <BrowserRouter>
                        <Router />
                    </BrowserRouter>
                </NotificationProvider>
            </MenuProvider>
        </AuthProvider>
        </>
    );

};

export default App;