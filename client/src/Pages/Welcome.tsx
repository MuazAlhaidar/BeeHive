import React from "react";
import blackLogo from "../Images/Members App Logo - Final Large.png";
import whiteLogo from "../Images/Members App Logo - White Large.png";

import "../CSS/Welcome.css";

function Welcome() {
  return (
    <div className="Welcome">
      <div className="Welcome-PageDiv">
        <div className="Welcome-Logos">
          <img
            src={blackLogo}
            alt="Beehive Logo"
            className="Welcome-BeehiveLogo"
          />
          <img
            src={whiteLogo}
            alt="Beehive Logo"
            className="Welcome-BeehiveWhiteLogo"
          />
        </div>
        <h1 className="Welcome-Title">Welcome to BeeHive</h1>
        <div className="Welcome-Body">
          <p>
            BeeHive is a member engagment Web and Android application that was
            created with the goals of
            <ul>
              <li>
                Helping with member engagment/recruitment efforts within an
                organization
              </li>
              <li>Simplifying social media engagment</li>
              <li>Streamlining group emailing efforts</li>
            </ul>
            The final applications' main features allow the registered user to
            <ul>
              <li>Create/edit/manage events</li>
              <li>Create/edit/manage groups (If they are an Owner)</li>
              <li>Email event RSVPs & members</li>
              <li>Email groups (If they are an Owner)</li>
              <li>Share an event on both Twitter & Facebook</li>
              <li>Check off event attendies</li>
            </ul>
            And more!!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
