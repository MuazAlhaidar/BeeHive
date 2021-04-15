import React from "react";
import { Link } from "react-router-dom";
import "../CSS/LogInPanel.css";

function LogInPanel(props: { changeUser: any }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.changeUser(email, password);
  };

  return (
    <div className="LoginPanel">
      <form onSubmit={handleSubmit}>
        <p className="LoginPanel-InputTitle">Email</p>
        <input
          className="LoginPanel-Input"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          id="Username"
          value={email}
          required
        />

        <p className="LoginPanel-InputTitle">Password</p>
        <input
          className="LoginPanel-Input"
          type="password"
          id="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />

        <div className="LoginPanel-Buttons">
          <button className="LoginPanel-LoginAsGuest">Login as Guest</button>
          <input className="LoginPanel-Login" type="submit" value="Login" />
        </div>
      </form>
      <Link className="LoginPanel-ForgotPassword" to="/ForgotPassword">
        Forgot Password?
      </Link>
    </div>
  );
}

export default LogInPanel;
