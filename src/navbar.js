import React, {Component} from 'react'

export class Nav extends Component {
    render() {
        let {setPage, currentPage, page, cart} = this.props;

        const setThisPage = () => setPage(page);

        return (
            <li className={currentPage === page ? "current_page_item" : ""}
                style={cart ? {float: "right"} : {}}>
                <a href={`#${page}`} onClick={setThisPage}>{page}
                    {cart ? `(${cart.length})` : ""}
                </a></li>)
    }
}

export default class Navbar extends Component {
    render() {


        let {appState, setAppState} = this.props;
        const setPage = page => setAppState({currentPage: page}),
            {currentPage, cart} = appState;

        return (
            <div id="menu-wrapper">
                <div id="menu" className="container">
                    <ul>
                        <Nav setPage={setPage} currentPage={currentPage} page={"Homepage"}/>
                        <Nav setPage={setPage} currentPage={currentPage} page={"Menu"}/>
                        {/*<Nav setPage={setPage} currentPage={currentPage} page={"Orders"}/>
                        <Nav setPage={setPage} currentPage={currentPage} page={"Profile"}/>*/}
                        <Nav cart={cart} setPage={setPage} currentPage={currentPage} page={"Cart"}/>
                    </ul>
                </div>
            </div>)
    }
}