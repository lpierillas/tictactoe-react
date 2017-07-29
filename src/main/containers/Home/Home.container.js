import React from 'react';
import { Button } from 'react-bootstrap';

const Home = () => (
    <div className="text-center">
        <h1>Tic Tac Toe Game</h1>
        <Button bsStyle="primary" href="/play">Start playing</Button>
    </div>
);

export default Home;
