import React from "react";
import LogoandTitle from "../Components/LogoAndTitle";
import ContactUsInfo from "../Components/ContactUsInfo";
import "../CSS/ContactUs.css";

function ContactUs() {
  return (
    <div className="ContactUs">
      <div className="ContactUs-Top">
        <div className="ContactUs-TitleAndLogo">
          <LogoandTitle />
        </div>
      </div>
      <div className="ContactUs-Info">
        <ContactUsInfo />
      </div>
    </div>
  );
}

export default ContactUs;
