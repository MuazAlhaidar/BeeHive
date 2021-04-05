import React from "react";
import SignInPanel from "../Components/SignInPanel";
import * as API from "../api/User";

import { Redirect } from "react-router-dom";
import "../CSS/LogIn.css";

function SignUp(props: { setName: any; setId: any; setOwner: any }) {
  const [user, setUser] = React.useState("");
  const [status, setStatus] = React.useState(-1);

  async function checkuser(
    _firstname: string,
    _lastname: string,
    _password: string,
    _email: string
  ): Promise<boolean> {
    // Checking if the email is valid with this regex
    const re = /\S+@\S+\.\S+/;

    if (!re.test(_email)) {
      setStatus(4);
      return false;
    }

    let res = await API.newUser(_email, _password, _firstname, _lastname);
    // Backend
    switch (res.data) {
      case 1:
        setStatus(1);
        break;
      case 2:
        setStatus(2);
        break;
      case 3:
        setStatus(3);
        break;
      default:
        // TODO Change values here
        setUser(_email);
        setStatus(0);
        props.setName(_firstname);
        props.setId(_email);
        props.setOwner(false);
        return true;
    }
    return false;
  }

  function displaystatus() {
    switch (status) {
      case -1:
        return <h1> Sign Up </h1>;
      case 1:
        return <h1> Sign up failed: username/email already in use</h1>;
      case 2:
        return <h1> Sign up failed: There are empty fields</h1>;
      case 4:
        return <h1> Sign up failed: Email format is invalid. </h1>;
      case 0:
        return (
          <div>
            <h1> Welcome {user} </h1> <Redirect push to="/" />{" "}
          </div>
        );
      default:
        return <h1> Sign up failed - Error Code {status} </h1>;
    }
  }

  return (
    <div className="Login">
      <div className="Login-SignInPanel">
        <SignInPanel addUser={checkuser} />
      </div>
      {displaystatus()}
    </div>
  );
}

export default SignUp;
