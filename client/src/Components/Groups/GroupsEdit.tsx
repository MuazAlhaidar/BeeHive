import React from "react";
import "../../CSS/Groups/GroupsEdit.css";

interface IProps {
  showModal: boolean;
  currentGroup: {
    name: string;
    description: string;
  };
  setCurGroup: (curGroup: { name: string; description: string }) => void;
  setShowModal: (showModal: boolean) => void;
  editGroup: (name: string, description: string) => void;
}

function GroupsEdit({
  showModal,
  setShowModal,
  editGroup,
  currentGroup,
  setCurGroup,
}: IProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editGroup(currentGroup.name, currentGroup.description);
    setShowModal(!showModal);
    setCurGroup({ name: "", description: "" });
  };

  const handleCancel = () => {
    setShowModal(!showModal);
    setCurGroup({ name: "", description: "" });
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
                  value={currentGroup.name}
                  onChange={(e) =>
                    setCurGroup({
                      name: e.target.value,
                      description: currentGroup.description,
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
                  id="description"
                  value={currentGroup.description}
                  onChange={(e) =>
                    setCurGroup({
                      name: currentGroup.name,
                      description: e.target.value,
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
