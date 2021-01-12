import React from "react";
import Group from "./GroupsList";
import EmailModal from "../EmailModal";
import "../../CSS/Groups/GroupsForm.css";

interface GroupInfo {
  name: string;
  contactInfo: string;
  removeGroup: () => void;
}

function GroupsForm({ name, contactInfo, removeGroup }: GroupInfo) {
  const [showEmailModal, setShowEmailModal] = React.useState(false);

  const toggleEmailModal = () => {
    setShowEmailModal(!showEmailModal);
  };

  return (
    <div className="GroupsForm">
      <EmailModal showModal={showEmailModal} setShowModal={setShowEmailModal} />
      <div className="GroupsForm-Name">{name}</div>
      <div className="GroupsForm-ContactInfo">{contactInfo}</div>
      <div className="GroupsForm-Bottom">
        <div className="GroupsForm-BrightButtonGroup">
          <button className="GroupsForm-BrightButton">Edit Group</button>
          <button
            className="GroupsForm-BrightButton"
            onClick={toggleEmailModal}
          >
            Email Group
          </button>
        </div>
        <div className="GroupsForm-DarkButtonGroup">
          <button className="GroupsForm-DarkButton" onClick={removeGroup}>
            Delete Group
          </button>
        </div>
      </div>
    </div>
  );
}

export default GroupsForm;
