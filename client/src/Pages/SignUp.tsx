import React from "react";
import LogoAndTitle from "../Components/LogoAndTitle";
import SignInPanel from "../Components/SignInPanel";

import { Link, Redirect } from "react-router-dom";
import "../CSS/LogIn.css";
type UserType = { username: string; password: string };

function LogIn(props: { setName: any }) {
  const [user, setUser] = React.useState("");
  const [status, setStatus] = React.useState(0);
  var listUsers = [
    { username: "user", password: "pass" },
    { username: "admin", password: "pass" },
  ];
  let Users = new Map([
    ["user", "pass"],
    ["admin", "pass"],
    ["Monier", "Motorsport 7"],
  ]);

  function checkuser(username: string, password: string): boolean {
    if (Users.get(username) == password) {
      setUser(username);
      setStatus(1);
      props.setName(username);
      return true;
    } else {
      setStatus(-1);
      return false;
    }
  }

  function displaystatus() {
    switch (status) {
      case 0:
        return <h1> Sign Up </h1>;
        break;
      case -1:
        return <h1> Log in failed </h1>;
        break;
      case 1:
        return (
          <div>
            {" "}
            <h1> Welcome {user} </h1> <Redirect push to="/" />{" "}
          </div>
        );
        break;
    }
  }

  return (
    <div className="Login">
      <div className="Login-SignInPanel">
        <SignInPanel changeUser={checkuser} />
      </div>
      {displaystatus()}
    </div>
  );
}

export default LogIn;
