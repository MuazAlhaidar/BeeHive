import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MyEventsPage from "./Pages/MyEvents";
import MyGroupsPage from "./Pages/MyGroups";
import LogIn from "./Pages/LogIn";
import SignUp from "./Pages/SignUp";
import ContactUs from "./Pages/ContactUs";
import AllEvents from "./Pages/AllEvents";
import LogoAndTitle from "./Components/LogoAndTitle";

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
                All Events
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
              {name === "" ? <LogIn setName={setName} /> : <AllEvents />}
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
