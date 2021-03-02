import React from "react";
import LogInPanel from "../Components/LogInPanel";
import SignUpButton from "../Components/SignUpButton";

import * as API from "../api/User";
import { Redirect } from "react-router-dom";
import "../CSS/LogIn.css";
// type UserType = { username: string; password: string };

function LogIn(props: { setName: any; setId: any }) {
  const [user, setUser] = React.useState("");
  const [status, setStatus] = React.useState(0);
  // var listUsers = [
  //   { username: "user", password: "pass" },
  //   { username: "admin", password: "pass" },
  // ];
  // let Users = new Map([
  //   ["user", "pass"],
  //   ["admin", "pass"],
  //   ["Monier", "Motorsport 7"],
  // ]);

  function checkuser(username: string, password: string): Promise<boolean> {
    return API.login(username, password)
      .then((res) => {
        console.log("WHAT THE HECK", res);
        if (res !== -1) {
          setUser(username);
          setStatus(1);
          props.setName(username);
          props.setId(res);
          return true;
        } else {
          setStatus(-1);
          return false;
        }
      })
      .catch(() => {
        setStatus(-1);
        return false;
      });
  }

  function displaystatus() {
    switch (status) {
      case 0:
        return <h1> Log In </h1>;
      case -1:
        return <h1> Log in failed </h1>;
      case 1:
        return (
          <div>
            {" "}
            <h1> Welcome {user} </h1> <Redirect push to="/" />{" "}
          </div>
        );
    }
  }

  return (
    <div className="Login">
      <div className="Login-Top">
        <SignUpButton />
      </div>
      <div className="Login-LoginPanel">
        <LogInPanel changeUser={checkuser} />
      </div>
      {displaystatus()}
    </div>
  );
}

export default LogIn;
