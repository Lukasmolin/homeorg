import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './src-app/Login';

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Login} exact/>
            </Switch>
        </BrowserRouter>
    )
}