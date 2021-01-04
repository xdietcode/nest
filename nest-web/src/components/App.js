import React, { useState } from "react";
import TopBar from "./TopBar";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true)

    const logout = () => {
        setIsLoggedIn( false);
    }

    return (
        <div className="App">
          <TopBar isLoggedIn={isLoggedIn}
                    handleLogout={logout}/>
        </div>
    );
}

export default App;
