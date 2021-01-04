import React, { useState } from "react";
import TopBar from "./TopBar";
import Main from "./Main";
import { TOKEN_KEY } from "../constants";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        // check current isLoggedIn state
        localStorage.getItem( TOKEN_KEY ) ? true : false
    )

    const logout = () => {
        setIsLoggedIn( false);
        // remove token
        localStorage.removeItem(TOKEN_KEY);
    }

    // save token to localStorage
    const loggedIn = token => {
        localStorage.setItem(TOKEN_KEY,token);
        setIsLoggedIn(true);
    }

    return (
        <div className="App">
            <TopBar isLoggedIn={isLoggedIn}
                    handleLogout={logout}/>

            <Main handleLogin={loggedIn}
                  isLoggedIn={isLoggedIn} />
        </div>
    );
}

export default App;
