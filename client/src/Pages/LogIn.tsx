import React from "react";
import LogoAndTitle from "../Components/LogoAndTitle";
import LogInPanel from "../Components/LogInPanel";

import "../CSS/LogIn.css";

function LogIn() {
  return (
    <div className="Login">
      <div className="Login-TitleAndLogo">
        <LogoAndTitle />
      </div>
      <div className="Login-LoginPanel">
        <LogInPanel />
      </div>
    </div>
  );
}

export default LogIn;
