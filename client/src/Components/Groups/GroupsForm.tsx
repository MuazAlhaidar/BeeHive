import React from "react";
import Group from "./GroupsList";
import "../../CSS/Groups/GroupsForm.css";

interface GroupInfo {
  name: string;
  contactInfo: string;
  removeGroup: () => void;
}

function GroupsForm({ name, contactInfo, removeGroup }: GroupInfo) {
  return (
    <div className="GroupsForm">
      <div className="GroupsForm-Name">{name}</div>
      <div className="GroupsForm-ContactInfo">{contactInfo}</div>
      <div className="GroupsForm-Bottom">
        <div className="GroupsForm-BrightButtonGroup">
          <button className="GroupsForm-BrightButton">Edit Group</button>
          <button className="GroupsForm-BrightButton">Email Group</button>
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
