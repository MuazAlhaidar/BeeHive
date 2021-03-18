import React from "react";
import LogInPanel from "../Components/LogInPanel";
import SignUpButton from "../Components/SignUpButton";

import * as API from "../api/User";
import { Redirect } from "react-router-dom";
import "../CSS/LogIn.css";

function LogIn(props: { setName: any; setId: any; setOwner: any }) {
  const [user, setUser] = React.useState("");
  const [status, setStatus] = React.useState(0);
  function checkuser(username: string, password: string): Promise<boolean> {
    return API.login(username, password)
      .then((res) => {
        if (res[0] !== -1) {
          setUser(username);
          setStatus(1);
          props.setName(username);
          props.setId(res[0]);
          props.setOwner(res[1]);
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
