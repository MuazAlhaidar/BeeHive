import React from "react";
import logo from "./Components/LogoAndTitle";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import EventPage from "./Pages/Event";

import LogIn from "./Pages/LogIn";
import LogoAndTitle from "./Components/LogoAndTitle";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <div className="App-navbar">
            <Link to="/"> Welcome to Hell </Link>
            <Link to="/Events"> Events </Link>
            <Link to="/LogIn"> LogIn </Link>
          </div>
          <Switch>
            <Route exact path="/">
              <div className="App-LogoAndTitle">
                <LogoAndTitle />
              </div>
              <h1> Hands off my property </h1>
              <p>
                Welcome to <code>BeeHive</code>!
              </p>
            </Route>
            <Route path="/Events">
              <EventPage />
            </Route>
            <Route path="/LogIn">
              <LogIn />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
