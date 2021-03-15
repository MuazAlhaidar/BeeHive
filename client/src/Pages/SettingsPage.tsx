import React from "react";
import "../CSS/SettingsPage.css";

function SettingsPage() {
  const [oldEmail, setOldEmail] = React.useState("");
  const [newEmail, setNewEmail] = React.useState("");

  return (
    <div className="SettingsPage">
      <div className="SettingsPage-FormDiv">
        <form className="SettingsPage-Form">
          <p className="SettingsPage-InputTitle">Old Email</p>
          <input
            className="SettingsPage-Input"
            type="text"
            onChange={(e) => setOldEmail(e.target.value)}
            id="OldEmail"
            value={oldEmail}
          />
          <p className="SettingsPage-InputTitle">New Email</p>
          <input
            className="SettingsPage-Input"
            type="text"
            onChange={(e) => setNewEmail(e.target.value)}
            id="newEmail"
            value={newEmail}
          />
        </form>
        <div className="SettingsPage-Buttons">
          <button className="SettingsPage-LigtButton">Change Email</button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
