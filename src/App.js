import React from 'react';

import Navbar from "./navbar";
import Content from './content';

import './css/default.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: "Homepage",
            preferredCurrency: "USD",
            cart: [],
            menuAmounts: {}
        }
    }

    render() {
        return (
            <div>
                <div id="wrapper">
                    <Navbar
                        appState={this.state} setAppState={state => this.setState(state)}/>
                    <div id="page" className="container">
                        <Content appState={this.state} setAppState={state => this.setState(state)}/>
                    </div>
                </div>
                <div id="copyright" className="container">
                    <p>by <a href="https://github.com/amshegarh/">amshegarh</a></p>
                </div>
            </div>
        );
    }
}

export default App;
