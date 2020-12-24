import React from "react";
import ContactUsInfo from "../Components/ContactUsInfo";
import "../CSS/ContactUs.css";

function ContactUs() {
  return (
    <div className="ContactUs">
      <div className="ContactUs-Body">
        <div className="ContactUs-Info">
          <ContactUsInfo />
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
