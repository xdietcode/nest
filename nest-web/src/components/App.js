import React, { useState } from "react";
import TopBar from "./TopBar";
import Main from "./Main";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const logout = () => {
        setIsLoggedIn( false);
    }

    const loggedIn = token => {

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
