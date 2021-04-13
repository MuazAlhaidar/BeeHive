import React from "react";
import "../CSS/SettingsPage.css";
import * as API from "../api/User";

interface IProp {
  id: string;
}

function SettingsPage({ id }: IProp) {
  const [newEmail, setNewEmail] = React.useState("");

  return (
    <div className="SettingsPage">
      <div className="SettingsPage-FormDiv">
        <form className="SettingsPage-Form">
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
          <button
            className="SettingsPage-LigtButton"
            onClick={() => {
              API.changeEmail(id, newEmail).then((res) => {
                      console.log(res)
                if (res.data) alert("Change email successfully");
                else alert("Email is already in used");
              });
            }}
          >
            Change Email
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
