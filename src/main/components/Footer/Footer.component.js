import React from 'react';
import Axios from 'axios-es6';

class Footer extends React.Component {
    constructor() {
        super();
        this.state = {
            version: '',
        };
    }

    componentDidMount() {
        Axios.get('http://localhost:8080/version')
             .then((result) => {
                 this.setState({ version: result.data });
             });
    }

    render() {
        return (
            <div className="footer">{this.state.version}</div>
        );
    }
}

export default Footer;
