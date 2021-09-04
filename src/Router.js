import React, { useState, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import './styles/main.scss';

import Landing from './pages/Landing';
import Jobs from './pages/Jobs';
import Dashboard from './pages/Dashboard';
import Error404 from './pages/Error404';
import Portfolio from './pages/Portfolio';

import Navigation from './components/UI/Navigation';
import Footer from './components/UI/Footer';

import { AuthContext } from './contexts/Auth.context';


function Router(){  
    const { user, user_data } = useContext(AuthContext);

    const app = user === null ? ( <h1>Loading</h1> ) : (
        <>
            <Navigation />
                <Switch>     
                <Route exact path="/" render={(props) => <Landing {...props} /> } /> 
                <Route exact path="/jobs" render={(props) => <Jobs {...props} /> } /> 
                <Route exact path="/dashboard" render={(props) => <Dashboard {...props} /> } /> 
                <Route exact path="/portfolio" render={(props) => <Portfolio user_data={user_data} {...props} /> } /> 
                <Route render={() => <Error404 /> } />
                </Switch>
            <Footer />
        </>
    )

    return app;

};

export default Router;