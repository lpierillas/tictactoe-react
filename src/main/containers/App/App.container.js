import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import Footer from '../../components/Footer/Footer.component';

import Main from '../Main/Main.containers';

const App = () => (
    <div className="container">
        <div className="header clearfix">
            <Nav pullRight>
                <NavItem href="/">Home</NavItem>
                <NavItem href="/play">Play</NavItem>
            </Nav>
        </div>
        <Main />
        <Footer />
    </div>
);

export default App;
