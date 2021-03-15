import React from "react";
import TwitterLogo from "../../Images/Twitter_Social_Icon_Rounded_Square_Color.png";
import FacebookLogo from "../../Images/f_logo_RGB-Blue_58.png";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import "../../CSS/Events/EventsForm.css";

interface EventInfo {
  name: string;
  address: string;
  time: string;
  date: string;
  description: string;
  removeEvent: () => void;
  toggleEventEditModal: () => void;
  toggleEmailModal: () => void;
  toggleEventMemberModal: () => void;
  toggleTransferManagerModal: () => void;
  toggleConfirmationModal: () => void;
}

function EventsForm({
  name,
  address,
  time,
  date,
  description,
  removeEvent,
  toggleEmailModal,
  toggleEventEditModal,
  toggleEventMemberModal,
  toggleTransferManagerModal,
  toggleConfirmationModal,
}: EventInfo) {
  const quote = `Come join me at the ${name} event!`;
  const hashtags = ["BeeHive"];

  return (
    <div className="EventsForm">
      <div className="EventsForm-Top">
        <div className="EventsForm-NameAddressTimeDateGroup">
          <div className="EventsForm-NameDiv">
            <label className="EventsForm-NameLabel">Name</label>
            <div className="EventsForm-Name">{name}</div>
          </div>
          <div className="EventsForm-AddressTimeDateGroup">
            <div className="EventsForm-AddressTimeDateLabel">
              <label className="EventsForm-AddressLabel">Address</label>
              <label className="EventsForm-TimeLabel">Time</label>
              <label className="EventsForm-DateLabel">Date</label>
            </div>
            <div className="EventsForm-AddressTimeDateInfo">
              <div className="EventsForm-Address">{address}</div>
              <div className="EventsForm-Time">{time}</div>
              <div className="EventsForm-Date">{date}</div>
            </div>
          </div>
        </div>
        <div className="EventsForm-SocialMediaButtons">
          <TwitterShareButton
            url="http://localhost:3000/"
            title={quote}
            hashtags={hashtags}
          >
            <img
              alt="Twitter Icon"
              className="EventsForm-SocialMediaButtons-Twitter"
              src={TwitterLogo}
            />
          </TwitterShareButton>
          <FacebookShareButton
            url="https://www.google.com/"
            quote={quote}
            hashtag="#BeeHive"
          >
            <img
              alt="Facebook Icon"
              className="EventsForm-SocialMediaButtons-Facebook"
              src={FacebookLogo}
            />
          </FacebookShareButton>
        </div>
      </div>
      <div className="EventsForm-DescriptionDiv">
        <label className="EventsForm-DescriptionLabel">Description</label>
        <div className="EventsForm-Description">{description}</div>
      </div>
      <div className="EventsForm-Bottom">
        <div className="EventsForm-BrightButtonGroup">
          <button
            className="EventsForm-BrightButton"
            onClick={toggleEventEditModal}
          >
            Edit Event
          </button>
          <button
            className="EventsForm-BrightButton"
            onClick={toggleEventMemberModal}
          >
            Members
          </button>
          <button
            className="EventsForm-BrightButton"
            onClick={toggleEmailModal}
          >
            Email Members
          </button>
          <button
            className="EventsForm-BrightButton"
            onClick={toggleTransferManagerModal}
          >
            Transfer Manager
          </button>
        </div>
        <div className="EventsForm-DarkButtonGroup">
          <button
            className="EventsForm-DarkButton"
            onClick={toggleConfirmationModal}
          >
            Delete Event
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventsForm;
