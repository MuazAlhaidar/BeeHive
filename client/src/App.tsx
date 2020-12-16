import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import EventPage from "./Pages/Events";
import GroupPage from "./Pages/Group";
import LogIn from "./Pages/LogIn";
import SignUp from "./Pages/SignUp";
import ContactUs from "./Pages/ContactUs";
import LogoAndTitle from "./Components/LogoAndTitle";
import Logo from "./Images/Members App Logo - White Large.png";

function App() {
  const [name, setName] = React.useState("");
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <div className="App-navbar">
            <div className="App-Logo">
              <LogoAndTitle />
            </div>
            <div className="App-Links">
              <Link className="App-link" to="/">
                Welcome
              </Link>
              <Link className="App-link" to="/LogIn">
                LogIn
              </Link>
              <Link className="App-link" to="/Events">
                Events
              </Link>
              <Link className="App-link" to="/Groups">
                Groups
              </Link>
              <Link className="App-link" to="/ContactUs">
                Contact Us
              </Link>
            </div>
          </div>
          <Switch>
            <Route exact path="/">
              {name == "" ? (
                <div>
                  <h1>Welcome to BeeHive</h1>
                  <img src={Logo} width="222" height="200" />
                </div>
              ) : (
                <h1> Hello {name}</h1>
              )}
            </Route>
            <Route path="/Events">
              <EventPage userid="MU/ZA" />
            </Route>
            <Route path="/LogIn">
              {/* <LogIn setuser={setName}/> */}
              <LogIn setName={setName} />
            </Route>
            <Route path="/Signup">
              {/* <LogIn setuser={setName}/> */}
              <SignUp setName={setName} />
            </Route>
            <Route path="/Groups">
              <GroupPage groupName="kevin cool" />
            </Route>
            <Route path="/ContactUs">
              <ContactUs />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
