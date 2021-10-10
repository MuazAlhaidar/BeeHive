import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MyEventsPage from "./Pages/MyEvents";
import MyGroupsPage from "./Pages/MyGroups";
import LogIn from "./Pages/LogIn";
import SignUp from "./Pages/SignUp";
import ContactUs from "./Pages/ContactUs";
import AllEvents from "./Pages/AllEvents";
import Leaderboard from "./Pages/LeaderboardPage";
import Settings from "./Pages/SettingsPage";
import Welcome from "./Pages/Welcome";
import LogoAndTitle from "./Components/LogoAndTitle";
import ResetReq from "./Pages/ResetReq";

function App() {
  const [id, setId] = React.useState("");
  const [owner, setOwner] = React.useState(false);

  const logOut = () => {
    setId("");
    setOwner(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <div className="App-navbar">
            <div className="App-Logo">
              <LogoAndTitle />
            </div>
            <div className="App-Links">
              <Link className="App-link" to="/AllEvents">
                All Events
              </Link>
              {id !== "" ? (
                <Link className="App-link" to="/MyEvents">
                  MyEvents
                </Link>
              ) : null}
              {owner ? (
                <Link className="App-link" to="/MyGroups">
                  MyGroups
                </Link>
              ) : null}
              <Link className="App-link" to="/Leaderboard">
                Leaderboard
              </Link>
              <Link className="App-link" to="/ContactUs">
                Contact Us
              </Link>
              {id === "" ? (
                <Link className="App-link" to="/LogIn">
                  Log In/Sign Up
                </Link>
              ) : (
                <>
                  <Link className="App-link" to="/Settings">
                    Settings
                  </Link>
                  <Link className="App-link" to="/LogIn" onClick={logOut}>
                    Log Out
                  </Link>
                </>
              )}
            </div>
          </div>
          <Switch>
            <Route exact path="/AllEvents">
              <AllEvents id={id} />
            </Route>
            <Route path="/LogIn">
              <LogIn setOwner={setOwner} setId={setId} />
            </Route>
            <Route path="/Signup">
              <SignUp setOwner={setOwner} setId={setId} />
            </Route>{" "}
            */
            <Route path="/ContactUs">
              <ContactUs />
            </Route>
            <Route path="/MyEvents">
              {id === "" ? (
                <LogIn setOwner={setOwner} setId={setId} />
              ) : (
                <MyEventsPage id={id} />
              )}
            </Route>
            <Route path="/MyGroups">
              {id === "" ? (
                <LogIn setOwner={setOwner} setId={setId} />
              ) : (
                <MyGroupsPage />
              )}
            </Route>
            <Route path="/Leaderboard">
              <Leaderboard isOwner={owner} />
            </Route>
            <Route path="/Settings">
              <Settings id={id} />
            </Route>
            <Route path="/forgotpassword">
              <ResetReq />
            </Route>
            <Route path="/">
              <Welcome />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
