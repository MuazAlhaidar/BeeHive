import React from "react";
import "../CSS/SettingsPage.css";
import * as API from "../api/User";

interface IProp {
  id: string;
}

function SettingsPage({ id }: IProp) {
  const [newEmail, setNewEmail] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    API.changeEmail(id, newEmail).then((res) => {
      if (res.data) alert("Change email successfully");
      else alert("Email is already in used");
    });
  };

  return (
    <div className="SettingsPage">
      <div className="SettingsPage-FormDiv">
        <form className="SettingsPage-Form" onSubmit={handleSubmit}>
          <p className="SettingsPage-InputTitle">New Email</p>
          <input
            className="SettingsPage-Input"
            type="text"
            onChange={(e) => setNewEmail(e.target.value)}
            id="newEmail"
            value={newEmail}
            required
          />

          <div className="SettingsPage-Buttons">
            <input
              className="SettingsPage-LigtButton"
              type="submit"
              value="Change Email"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default SettingsPage;
