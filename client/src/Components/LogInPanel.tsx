import React from "react";
import { Link } from "react-router-dom";
import "../CSS/LogInPanel.css";

function LogInPanel(props: { changeUser: any }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <div className="LoginPanel">
      <form>
        <p className="LoginPanel-InputTitle">Username</p>
        <input
          className="LoginPanel-Input"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          id="Username"
          value={username}
        />
        <p className="LoginPanel-InputTitle">Password</p>
        <input
          className="LoginPanel-Input"
          type="password"
          id="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </form>
      <div className="LoginPanel-Buttons">
        <button className="LoginPanel-LoginAsGuest">Login as Guest</button>
        <button
          className="LoginPanel-Login"
          onClick={() => props.changeUser(username, password)}
        >
          Login
        </button>
      </div>
      <Link className="LoginPanel-ForgotPassword" to="/ForgotPassword">
        Forgot Password?
      </Link>
    </div>
  );
}

export default LogInPanel;
