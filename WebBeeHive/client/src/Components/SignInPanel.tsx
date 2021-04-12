import React from "react";
import "../CSS/SignUpPanel.css";

interface IProps {
  addUser: (
    _firstname: string,
    _lastname: string,
    _password: string,
    _email: string
  ) => void;
}

function SignInPanel({ addUser }: IProps) {
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
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
          onClick={() => addUser(firstname, lastname, password, email)}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default SignInPanel;
