import React, { useState } from 'react';
import './Css/App.css';
import Sidebar from './Components/Sidebar';
import Chat from './Components/Chat';
import Login from './Components/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useStateValue } from './Components/StateProvider';

function App() {

  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      
        {!user ?(
          <Login/>
        ) : (

          <div className="app_body">
          <Router>
            <Sidebar/>
            <Switch>
              
              <Route path="/rooms/:roomId">
                <Chat/>
              </Route>

              <Route path="/">
                <Chat/>
              </Route>
             
            </Switch>
          </Router>
          </div>

        )}

      </div>
  );
}

export default App;
