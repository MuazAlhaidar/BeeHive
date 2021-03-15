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
import LogoAndTitle from "./Components/LogoAndTitle";
import ResetPass from "./Pages/ResetPass";
import ResetReq from "./Pages/ResetReq";

function App() {
    const [name, setName] = React.useState("");
    const [id, setId] = React.useState("");
    const [owner, setOwner] = React.useState(0);
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
                            {owner==1?
                             <Link className="App-link" to="/MyGroups">
                                 MyGroups
                             </Link>: ""}
                            <Link className="App-link" to="/Leaderboard">
                                Leaderboard
                            </Link>
                            <Link className="App-link" to="/ContactUs">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                    <Switch>
                        <Route exact path="/">
                            <AllEvents />
                        </Route>
                        <Route path="/LogIn">
                            <LogIn setName={setName} setOwner={setOwner} setId={setId} />
                        </Route>
                        <Route path="/Signup">
                            <SignUp setName={setName} setOwner={setOwner} setId={setId} />
                        </Route>
                        <Route path="/ContactUs">
                            <ContactUs />
                        </Route>
                        <Route path="/MyEvents">
                            {name === "" ? (
                                <LogIn setName={setName} setOwner={setOwner} setId={setId} />
                            ) : (
                                <MyEventsPage id={id} />
                            )}
                        </Route>
                        <Route path="/MyGroups">
                            {name === "" ? (
                                <LogIn setName={setName} setOwner={setOwner} setId={setId} />
                            ) : (
                                <MyGroupsPage id={id} />
                            )}
                        </Route>
                        <Route path="/Leaderboard">
                            <Leaderboard />
                        </Route>
                        <Route path="/resetPassword">
                            <ResetPass />
                        </Route>
                        <Route path="/forgotpassword">
                            <ResetReq />
                        </Route>
                    </Switch>
                </Router>
            </header>
        </div>
    );
}

export default App;
