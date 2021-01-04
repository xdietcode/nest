import React from 'react';
import logo from "../assets/images/logo.svg";

function TopBar(props) {
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <span>
                Nest Web
            </span>
        </header>
    );
}

export default TopBar;