import React from "react";
import "../../CSS/Groups/GroupsForm.css";
import { GroupInfo } from "../../Interfaces";

interface IProps {
  group: GroupInfo;
  toggleGroupEditModal: () => void;
  toggleEmailModal: () => void;
  toggleConfirmationModal: () => void;
}

function GroupsForm({
  group,
  toggleGroupEditModal,
  toggleEmailModal,
  toggleConfirmationModal,
}: IProps) {
  return (
    <div className="GroupsForm">
      <div className="GroupsForm-NameDiv">
        <label className="GroupsForm-NameLabel">Name</label>
        <div className="GroupsForm-Name">{group.name}</div>
      </div>
      <div className="GroupsForm-ContactInfoDiv">
        <label className="GroupsForm-ContactInfoLabel">Contact Info</label>
        <div className="GroupsForm-ContactInfo">{group.description}</div>
      </div>
      <div className="GroupsForm-Bottom">
        <div className="GroupsForm-BrightButtonGroup">
          <button
            className="GroupsForm-BrightButton"
            onClick={toggleGroupEditModal}
          >
            Edit
          </button>
          <button
            className="GroupsForm-BrightButton"
            onClick={toggleEmailModal}
          >
            Email
          </button>
        </div>
        <div className="GroupsForm-DarkButtonGroup">
          <button
            className="GroupsForm-DarkButton"
            onClick={toggleConfirmationModal}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default GroupsForm;
