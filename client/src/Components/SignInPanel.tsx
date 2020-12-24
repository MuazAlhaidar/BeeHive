import React from "react";
import "../CSS/LogInPanel.css";

function LogInPanel(props: { changeUser: any }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <div className="LoginPanel">
      <form>
        <p className="LoginPanel-InputTitle">Enter a New Username</p>
        <input
          className="LoginPanel-Input"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          id="Password"
          value={username}
        />
        <p className="LoginPanel-InputTitle">Enter a New Password</p>
        <input
          className="LoginPanel-Input"
          type="text"
          id="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </form>
      <div className="LoginPanel-Buttons">
        <button
          className="LoginPanel-Login"
          onClick={() => props.changeUser(username, password)}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default LogInPanel;
