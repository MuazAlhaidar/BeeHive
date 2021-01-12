import React from "react";
import "../../CSS/Groups/GroupsAdd.css";

interface MemberInfo {
  name: string;
}

interface IProps {
  addGroup: (
    name: string,
    contactInfo: string,
    members: Array<MemberInfo>
  ) => void;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

function GroupsAdd({ addGroup, showModal, setShowModal }: IProps) {
  const [newGroup, setNewGroup] = React.useState({
    name: "",
    contactInfo: "",
  });

  const emptyMembersList = new Array<MemberInfo>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addGroup(newGroup.name, newGroup.contactInfo, emptyMembersList);
    setShowModal(!showModal);
    setNewGroup({ name: "", contactInfo: "" });
  };

  const handleCancel = () => {
    setShowModal(!showModal);
    setNewGroup({ name: "", contactInfo: "" });
  };

  return (
    <div>
      {showModal ? (
        <div className="GroupsAdd-Background">
          <div className="GroupsAdd-AddFormDiv">
            <form className="GroupsAdd-AddForm" onSubmit={handleSubmit}>
              <div className="GroupsAdd-NameDiv">
                <input
                  className="GroupsAdd-Name"
                  placeholder="Name"
                  type="text"
                  id="name"
                  value={newGroup.name}
                  onChange={(e) =>
                    setNewGroup({
                      name: e.target.value,
                      contactInfo: newGroup.contactInfo,
                    })
                  }
                />
              </div>
              <div className="GroupsAdd-ContactInfoDiv">
                <textarea
                  className="GroupsAdd-ContactInfo"
                  placeholder="ContactInfo"
                  aria-multiline
                  id="contactInfo"
                  value={newGroup.contactInfo}
                  onChange={(e) =>
                    setNewGroup({
                      name: newGroup.name,
                      contactInfo: e.target.value,
                    })
                  }
                />
              </div>
              <div className="GroupsAdd-BtnDiv">
                <button className="GroupsAdd-CancelBtn" onClick={handleCancel}>
                  Cancel
                </button>
                <input
                  className="GroupsAdd-AddBtn"
                  type="submit"
                  value="Submit"
                />
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default GroupsAdd;
