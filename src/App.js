import "./css/App.css";
import "./css/layout.css";
import "./css/components.css";
import "./css/layout.css";

import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import Login from "./components/Login";
import Header from "./components/Header";
import Review from "./views/Review";
import Submit from "./views/Submit";
import { UserCxt } from "./services/userContext";

function App() {
    const [userContext, setUserContext] = useState({});
    const [formContext, setFormContext] = useState({});

    useEffect(() => {}, []);
    return (
        <UserCxt.Provider
            value={{ userContext, setUserContext, formContext, setFormContext }}
        >
            <div className="App">
                {userContext?.auth !== "success" ? <Login /> : null}
                <Header />
                {userContext?.auth === "success" ? (
                    <Switch>
                        <Route path="/submit" component={Submit} />
                        <Route path="/" exact component={Review} />
                    </Switch>
                ) : null}
            </div>
        </UserCxt.Provider>
    );
}

export default App;
