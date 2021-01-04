import React, { useState } from "react";
import TopBar from "./TopBar";
import Main from "./Main";
import { TOKEN_KEY } from "../constants";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const logout = () => {
        setIsLoggedIn( false);
    }

    // save token to localStorage
    const loggedIn = token => {
        localStorage.setItem(TOKEN_KEY,token);
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
