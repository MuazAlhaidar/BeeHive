import React from "react";
import Background from "../Images/LogInPage - Background.png";
import LogoAndTitle from "../Components/LogoAndTitle";
import LogInPanel from "../Components/LogInPanel";
import SignUpButton from "../Components/SignUpButton";

import "../CSS/LogIn.css";

function LogIn() {
  return (
    <div className="Login">
      <div className="Login-Top">
        <div className="Login-TitleAndLogo">
          <LogoAndTitle />
        </div>
        <div className="Login-SignUpButton">
          <SignUpButton />
        </div>
      </div>
      <div className="Login-LoginPanel">
        <LogInPanel />
      </div>
    </div>
  );
}

export default LogIn;
