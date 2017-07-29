import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Home/Home.container';
import Play from '../Play/Play.containers';

const Main = () => (
    <main>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/play" component={Play} />
        </Switch>
    </main>
);

export default Main;
