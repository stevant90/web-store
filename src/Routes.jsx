import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import AppContainer from './components/AppContainer';
import MainComponent from './components/MainComponent'

export default class Routes extends Component {

    render() {

        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/">
                        <AppContainer Component={MainComponent} type='templates' />
                    </Route>
                    <Route path="/products">
                        <AppContainer Component={MainComponent} type='products' />
                    </Route>
                </Switch>
            </HashRouter>
        );
    }
}