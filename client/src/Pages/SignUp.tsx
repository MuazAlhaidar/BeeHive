import React from "react";
import SignInPanel from "../Components/SignInPanel";
import * as API from "../api/User";

import { Redirect } from "react-router-dom";
import "../CSS/LogIn.css";

function LogIn(props: { setName: any }) {
  const [user, setUser] = React.useState("");
  const [status, setStatus] = React.useState(-1);
  let Users = new Map([
    ["user", "pass"],
    ["admin", "pass"],
    ["Monier", "Motorsport 7"],
  ]);

  async  function  checkuser(_username: string, _password: string, _email:string): Promise<boolean> {
	  // Checkinging fields
	const re = /\S+@\S+\.\S+/
	console.log(_email, re.test(_email))

	  console.log("REGEX", re.test(_email) )

	  if(! re.test(_email)){
		  setStatus(4)
		  return false
	  }


	  let res=await (API.new_user({username:_username, password:_password, email:_email, role_id:0, points:0}))
	  // Backend shit
          console.log("--------------------------")
	  switch(res[0]){
		  case 0:
			  setUser(_username)
                          setStatus(0)
                          props.setName(_username);
                          return true;
		  break;
		  case 1:
			  setStatus(1)
		  break;
		  case 2:
			  setStatus(2)
		  break;
		  case 3:
			  setStatus(3)
		  break;
	  }
	  return false;


  }

  function addUser(username: string, password: string) {
    Users.set(username, password);
  }

  function displaystatus() {
	  switch (status) {
		  case -1:
			  return <h1> Sign Up FUCK </h1>;
		  case 1:
			  return <h1> Sign up failed: username/email already in database</h1>;
		  case 2:
			  return <h1> Sign up failed: DEV ERROR: empty fields have been inserted</h1>;
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
			  return <h1> Sign up failed:  another reason </h1>
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

export default LogIn;
