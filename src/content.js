import React, {Component} from 'react';
import Home from './content/home';
import Menu from './content/menu';
import Cart from './content/cart';
import PostOrder from './content/postOrder';

export default class Content extends Component {
    render() {
        let renderContent = null,
            {appState, setAppState} = this.props,
            {currentPage} = appState;

        if (currentPage === "Homepage")
            renderContent = <Home/>;
        else if (currentPage === "Menu")
            renderContent = <Menu appState={appState}
            setAppState={setAppState}/>;
        else if (currentPage === "Cart")
            renderContent = <Cart appState={appState}
                                  setAppState={setAppState}/>;
        else if (currentPage === "postOrder")
            renderContent = <PostOrder appState={appState}
                                  setAppState={setAppState}/>;

        return renderContent;
    }
}