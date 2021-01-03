import React from "react";
import TwitterLogo from "../../Images/Twitter_Social_Icon_Rounded_Square_Color.png";
import FacebookLogo from "../../Images/f_logo_RGB-Blue_58.png";
import "../../CSS/Events/EventsForm.css";

interface EventInfo {
  name: string;
  address: string;
  time: string;
  date: string;
  description: string;
  removeEvent: () => void;
}

function EventsForm({
  name,
  address,
  time,
  date,
  description,
  removeEvent,
}: EventInfo) {
  return (
    <div className="EventsForm">
      <div className="EventsForm-Top">
        <div className="EventsForm-NameAddressTimeDateGroup">
          <div className="EventsForm-Name">{name}</div>
          <div className="EventsForm-AddressTimeDateGroup">
            <div className="EventsForm-Address">{address}</div>
            <div className="EventsForm-Time">{time}</div>
            <div className="EventsForm-Date">{date}</div>
          </div>
        </div>
        <div className="EventsForm-SocialMediaButtons">
          <img
            className="EventsForm-SocialMediaButtons-Twitter"
            src={TwitterLogo}
          />
          <img
            className="EventsForm-SocialMediaButtons-Facebook"
            src={FacebookLogo}
          />
        </div>
      </div>
      <div className="EventsForm-Description">{description}</div>
      <div className="EventsForm-Bottom">
        <div className="EventsForm-BrightButtonGroup">
          <button className="EventsForm-BrightButton">Edit Event</button>
          <button className="EventsForm-BrightButton">Members</button>
          <button className="EventsForm-BrightButton">Email Members</button>
        </div>
        <div className="EventsForm-DarkButtonGroup">
          <button className="EventsForm-DarkButton" onClick={removeEvent}>
            Delete Event
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventsForm;
