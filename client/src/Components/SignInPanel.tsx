import React from "react";
import "../CSS/SignUpPanel.css";

function SignInPanel(props: { addUser: any }) {
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  return (
    <div className="SignUpPanel">
      <form>
        <div>
          <p className="SignUpPanel-InputTitle">Enter your Firstname</p>
          <input
            className="SignUpPanel-Input"
            type="text"
            onChange={(e) => setFirstname(e.target.value)}
            id="Firstname"
            value={firstname}
          />

          <p className="SignUpPanel-InputTitle">Enter your Lastname</p>
          <input
            className="SignUpPanel-Input"
            type="text"
            onChange={(e) => setLastname(e.target.value)}
            id="Lastname"
            value={lastname}
          />
        </div>

        <p className="SignUpPanel-InputTitle">Enter a new Username</p>
        <input
          className="SignUpPanel-Input"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          id="Username"
          value={username}
        />

        <p className="SignUpPanel-InputTitle">Enter your Email</p>
        <input
          className="SignUpPanel-Input"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          id="Email"
          value={email}
        />

        <p className="SignUpPanel-InputTitle">Enter a new Password</p>
        <input
          className="SignUpPanel-Input"
          type="password"
          id="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </form>
      <div className="SignUpPanel-Buttons">
        <button
          className="SignUpPanel-SignUpButton"
          onClick={() => props.addUser(username, password, email)}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default SignInPanel;
