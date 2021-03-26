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
    // Checkinging fields
    const re = /\S+@\S+\.\S+/;

    if (!re.test(_email)) {
      setStatus(4);
      return false;
    }

    let res = await API.new_user(_email, _password, _firstname, _lastname);
    // Backend shit
    switch (res[0]) {
      case 0:
        // TODO Change values here
        setUser(_username);
        setStatus(0);
        props.setName(_username);
        props.setId(res[1]);
        return true;
      case 1:
        setStatus(1);
        break;
      case 2:
        setStatus(2);
        break;
      case 3:
        setStatus(3);
        break;
    }
    return false;
  }

  function displaystatus() {
    switch (status) {
      case -1:
        return <h1> Sign Up </h1>;
      case 1:
        return <h1> Sign up failed: username/email already in database</h1>;
      case 2:
        return (
          <h1> Sign up failed: DEV ERROR: empty fields have been inserted</h1>
        );
      case 4:
        return <h1> Sign up failed: Bad email format. </h1>;
      case 0:
        return (
          <div>
            {" "}
            <h1> Welcome {user} </h1> <Redirect push to="/" />{" "}
          </div>
        );
      default:
        return <h1> Sign up failed: another reason </h1>;
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
