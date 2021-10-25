import './css/App.css';
import './css/layout.css';
import './css/components.css';
import './css/layout.css';

import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './components/Login';
import Header from './components/Header';
import Review from './views/Review';
import Submit from './views/Submit';
import { authorizeUser } from './services/queryApi';
import  { UserCxt } from './services/userContext';

function App() {
  
  const [userContext, setUserContext] = useState({auth: "fail"})
  
  const handleLogin = async (input) => {
    const isUserAuthenticated = await authorizeUser(input);
    console.log(isUserAuthenticated)
    setUserContext(isUserAuthenticated)
  }

  return (
    <UserCxt.Provider value={{userContext, setUserContext}}>
       <div className="App">
        {userContext.auth !== "success" ? <Login handleLogin={handleLogin}/> :  null}
        <Header/>
        {
        userContext?.auth === "success" ?
        <Switch>
          <Route path="/submit" component={Submit}/>
          <Route path="/" exact component={Review}/>
        </Switch> :
        null
        }

      </div>
    </UserCxt.Provider>
     
    
  );
}

export default App;
