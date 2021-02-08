import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MyEventsPage from "./Pages/MyEvents";
import MyGroupsPage from "./Pages/MyGroups";
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
              <Link className="App-link" to="/MyEvents">
                MyEvents
              </Link>
              <Link className="App-link" to="/MyGroups">
                MyGroups
              </Link>
              <Link className="App-link" to="/ContactUs">
                Contact Us
              </Link>
            </div>
          </div>
          <Switch>
            <Route exact path="/">
              {name === "" ? (
                <div>
                  <h1>Welcome to BeeHive</h1>
                  <img src={Logo} alt="BeeHive Logo" width="222" height="200" />
                </div>
              ) : (
                <h1> Hello {name}</h1>
              )}
            </Route>
            <Route path="/LogIn">
              <LogIn setName={setName} />
            </Route>
            <Route path="/Signup">
              <SignUp setName={setName} />
            </Route>
            <Route path="/ContactUs">
              <ContactUs />
            </Route>
            <Route path="/MyEvents">
              {name === "" ? <LogIn setName={setName} /> : <MyEventsPage />}
            </Route>
            <Route path="/MyGroups">
              {name === "" ? <LogIn setName={setName} /> : <MyGroupsPage />}
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
