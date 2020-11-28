import React from "react";
import logo from "./Images/Members App Logo - White Large.png";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
				      <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.doomworld.com%2Fmonthly_2019_05%2F4ezIzWF.jpg.f74e8b271cfff7beb39ae87c1a168e7f.jpg&f=1&nofb=1"  className="App-logo" alt="logo" />
				      <h1> Rolling downtown I need some friends now.</h1>
			      </Route>
		      </Switch>
	      </Router>
      </header>
    </div>
  );
}

export default App;
