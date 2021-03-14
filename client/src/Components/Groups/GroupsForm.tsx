import React from "react";
import "../../CSS/Groups/GroupsForm.css";

interface IProps {
  name: string;
  contactInfo: string;
  removeGroup: () => void;
  toggleGroupEditModal: () => void;
  toggleEmailModal: () => void;
}

function GroupsForm({
  name,
  contactInfo,
  removeGroup,
  toggleGroupEditModal,
  toggleEmailModal,
}: IProps) {
  return (
    <div className="GroupsForm">
      <div className="GroupsForm-NameDiv">
        <label className="GroupsForm-NameLabel">Name</label>
        <div className="GroupsForm-Name">{name}</div>
      </div>
      <div className="GroupsForm-ContactInfoDiv">
        <label className="GroupsForm-ContactInfoLabel">Contact Info</label>
        <div className="GroupsForm-ContactInfo">{contactInfo}</div>
      </div>
      <div className="GroupsForm-Bottom">
        <div className="GroupsForm-BrightButtonGroup">
          <button
            className="GroupsForm-BrightButton"
            onClick={toggleGroupEditModal}
          >
            Edit Group
          </button>
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
