import React from "react";
import "../../CSS/Groups/GroupsEdit.css";

interface IProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  editGroup: (name: string, contactInfo: string) => void;
}

function GroupsEdit({ showModal, setShowModal, editGroup }: IProps) {
  const [curGroup, setCurGroup] = React.useState({
    name: "",
    contactInfo: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editGroup(curGroup.name, curGroup.contactInfo);
    setShowModal(!showModal);
    setCurGroup({ name: "", contactInfo: "" });
  };

  const handleCancel = () => {
    setShowModal(!showModal);
    setCurGroup({ name: "", contactInfo: "" });
  };

  return (
    <div>
      {showModal ? (
        <div className="GroupsEdit-Background">
          <div className="GroupsEdit-EditFormDiv">
            <form className="GroupsEdit-EditForm" onSubmit={handleSubmit}>
              <div className="GroupsEdit-NameDiv">
                <label className="GroupsEdit-NameLabel">Name</label>
                <input
                  className="GroupsEdit-Name"
                  type="text"
                  id="name"
                  value={curGroup.name}
                  onChange={(e) =>
                    setCurGroup({
                      name: e.target.value,
                      contactInfo: curGroup.contactInfo,
                    })
                  }
                />
              </div>
              <div className="GroupsEdit-ContactInfoDiv">
                <label className="GroupsEdit-ContactInfoLabel">
                  ContactInfo
                </label>
                <textarea
                  className="GroupsEdit-ContactInfo"
                  aria-multiline
                  id="contactInfo"
                  value={curGroup.contactInfo}
                  onChange={(e) =>
                    setCurGroup({
                      name: curGroup.name,
                      contactInfo: e.target.value,
                    })
                  }
                />
              </div>
              <div className="GroupsEdit-BtnDiv">
                <button className="GroupsEdit-CancelBtn" onClick={handleCancel}>
                  Cancel
                </button>
                <input
                  className="GroupsEdit-UpdateBtn"
                  type="submit"
                  value="Update"
                />
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default GroupsEdit;
