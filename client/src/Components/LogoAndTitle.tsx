import React from "react";
import logo from "../Images/Members App Logo - White Large.png";

import "../CSS/LogoAndTitle.css";

function LogoAndTitle() {
  return (
    <div className="Logo">
      <img src={logo} className="Logo-Img" />
      <h1 className="Logo-Font">BeeHive</h1>
    </div>
  );
}

export default LogoAndTitle;
