import React from "react";
import GroupsEdit from "./GroupsEdit";
import EmailModal from "../EmailModal";
import "../../CSS/Groups/GroupsForm.css";

interface GroupInfo {
  name: string;
  contactInfo: string;
  removeGroup: () => void;
  editGroup: (name: string, contactInfo: string) => void;
}

function GroupsForm({ name, contactInfo, removeGroup, editGroup }: GroupInfo) {
  const [showEmailModal, setShowEmailModal] = React.useState(false);
  const [showGroupEditModal, setShowGroupEditModal] = React.useState(false);

  const toggleEmailModal = () => {
    setShowEmailModal(!showEmailModal);
  };

  const toggleGroupEditModal = () => {
    setShowGroupEditModal(!showGroupEditModal);
  };

  return (
    <div className="GroupsForm">
      <EmailModal showModal={showEmailModal} setShowModal={setShowEmailModal} />
      <GroupsEdit
        showModal={showGroupEditModal}
        setShowModal={setShowGroupEditModal}
        editGroup={editGroup}
      />
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
