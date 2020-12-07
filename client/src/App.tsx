import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import EventPage from "./Pages/Event";
import Groups from "./Pages/Groups";
import LogIn from "./Pages/LogIn";
import LogoAndTitle from "./Components/LogoAndTitle";

function App() {
  const [name, setName] = React.useState("");
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <div className="App-navbar">
            <Link to="/"> Welcome to Hell </Link>
            <Link to="/Events"> Events </Link>
            <Link to="/LogIn" > LogIn </Link>
            <Link to="/Groups"> Groups </Link>
          </div>
          <Switch>
            <Route exact path="/">
              <div className="App-LogoAndTitle">
                <LogoAndTitle />
              </div>
                    { name=="" ? <h1>Login Plz kay thanks </h1> : <h1> Hello {name}: How are ya? </h1>  } 
              <p>
                Welcome to <code>BeeHive</code>!
              </p>
            </Route>
            <Route path="/Events">
              <EventPage userid="MU/ZA" />
            </Route>
            <Route path="/LogIn">
              {/* <LogIn setuser={setName}/> */}
              <LogIn setName={setName}/>
            </Route>
            <Route path="/Groups">
              <Groups />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
