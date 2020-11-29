import React from "react";
import logo from "./Images/Members App Logo - White Large.png";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import EventPage from "./pages/Event"

function App() {
  return (
    <div className="App">
      <header className="App-header">
	      <Router>
		      <nav>
			      <ul>
				      <li> <Link to="/"> Welcome to Hell </Link> </li>
				      <li> <Link to="/Events"> Events </Link> </li>
			      </ul>
		      </nav>
		      <Switch>
			      <Route exact path="/">
				      <img src={logo} className="App-logo" alt="logo" />
				      <h1> Hands off my property </h1>
				      <p>
					      Welcome to <code>BeeHive</code>!
				      </p>
			      </Route>
			      <Route path="/Events">
				      <EventPage />
			      </Route>
		      </Switch>
	      </Router>
      </header>
    </div>
  );
}

export default App;
