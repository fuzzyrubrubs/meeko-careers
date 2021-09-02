import React, { useState, useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './styles/main.scss';

import Landing from './pages/Landing';
import Jobs from './pages/Jobs';
import Dashboard from './pages/Dashboard';
import Error404 from './pages/Error404';
import Portfolio from './pages/Portfolio';

import Navigation from './components/UI/Navigation';
import Footer from './components/UI/Footer';

import { AuthProvider } from './contexts/Auth.context';


function Router(){  

    return (
        <>
        <AuthProvider>
            <BrowserRouter>
            <Navigation />
                <Switch>     
                <Route exact path="/" render={(props) => <Landing {...props} /> } /> 
                <Route exact path="/jobs" render={(props) => <Jobs {...props} /> } /> 
                <Route exact path="/dashboard" render={(props) => <Dashboard {...props} /> } /> 
                <Route exact path="/portfolio" render={(props) => <Portfolio {...props} /> } /> 
                <Route render={() => <Error404 /> } />
                </Switch>
            <Footer />
            </BrowserRouter>
        </AuthProvider>
        </>
    );

};

export default Router;