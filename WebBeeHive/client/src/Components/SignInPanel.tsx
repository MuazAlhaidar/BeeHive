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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addUser(firstname, lastname, password, email);
  };

  return (
    <div className="SignUpPanel">
      <form onSubmit={handleSubmit}>
        <div>
          <p className="SignUpPanel-InputTitle">Enter your Firstname</p>
          <input
            className="SignUpPanel-Input"
            type="text"
            onChange={(e) => setFirstname(e.target.value)}
            id="Firstname"
            value={firstname}
            required
          />

          <p className="SignUpPanel-InputTitle">Enter your Lastname</p>
          <input
            className="SignUpPanel-Input"
            type="text"
            onChange={(e) => setLastname(e.target.value)}
            id="Lastname"
            value={lastname}
            required
          />
        </div>

        <p className="SignUpPanel-InputTitle">Enter your Email</p>
        <input
          className="SignUpPanel-Input"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          id="Email"
          value={email}
          required
        />

        <p className="SignUpPanel-InputTitle">Enter a new Password</p>
        <input
          className="SignUpPanel-Input"
          type="password"
          id="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />

        <div className="SignUpPanel-Buttons">
          <input
            className="SignUpPanel-SignUpButton"
            type="submit"
            value="Sign Up"
          />
        </div>
      </form>
    </div>
  );
}

export default SignInPanel;
