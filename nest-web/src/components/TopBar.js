import React from 'react';
import logo from "../assets/images/logo2.svg";


function TopBar(props) {
    const { isLoggedIn, handleLogout } = props;

    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />

            <span className="App-title">
                Nest+
            </span>

            {
                isLoggedIn
                    ?
                    <button type="button" className="logout"
                                    onClick={ () => { handleLogout();}
                                     }
                    >Log out</button>
                    :
                    null
            }

        </header>
    );
}

export default TopBar;