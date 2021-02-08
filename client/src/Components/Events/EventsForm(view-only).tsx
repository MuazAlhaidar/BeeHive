import React from "react";
import TwitterLogo from "../../Images/Twitter_Social_Icon_Rounded_Square_Color.png";
import FacebookLogo from "../../Images/f_logo_RGB-Blue_58.png";
import "../../CSS/Events/EventsForm(view-only).css";

interface EventInfo {
  name: string;
  address: string;
  time: string;
  date: string;
  description: string;
}

function EventsForm({ name, address, time, date, description }: EventInfo) {
  return (
    <div className="EventsForm-view-only">
      <div className="EventsForm-view-only-Top">
        <div className="EventsForm-view-only-NameAddressTimeDateGroup">
          <div className="EventsForm-view-only-NameDiv">
            <label className="EventsForm-view-only-NameLabel">Name</label>
            <div className="EventsForm-view-only-Name">{name}</div>
          </div>
          <div className="EventsForm-view-only-AddressTimeDateGroup">
            <div className="EventsForm-view-only-AddressTimeDateLabel">
              <label className="EventsForm-view-only-AddressLabel">
                Address
              </label>
              <label className="EventsForm-view-only-TimeLabel">Time</label>
              <label className="EventsForm-view-only-DateLabel">Date</label>
            </div>
            <div className="EventsForm-view-only-AddressTimeDateInfo">
              <div className="EventsForm-view-only-Address">{address}</div>
              <div className="EventsForm-view-only-Time">{time}</div>
              <div className="EventsForm-view-only-Date">{date}</div>
            </div>
          </div>
        </div>
        <div className="EventsForm-view-only-SocialMediaButtons">
          <img
            className="EventsForm-view-only-SocialMediaButtons-Twitter"
            src={TwitterLogo}
          />
          <img
            className="EventsForm-view-only-SocialMediaButtons-Facebook"
            src={FacebookLogo}
          />
        </div>
      </div>
      <div className="EventsForm-view-only-DescriptionDiv">
        <label className="EventsForm-view-only-DescriptionLabel">
          Description
        </label>
        <div className="EventsForm-view-only-Description">{description}</div>
      </div>
    </div>
  );
}

export default EventsForm;
