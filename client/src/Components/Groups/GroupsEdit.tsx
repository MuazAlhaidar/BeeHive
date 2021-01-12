import React from "react";
import "../../CSS/Groups/GroupsEdit.css";

interface IProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

function GroupsEdit({ showModal, setShowModal }: IProps) {
  const [curGroup, setCurGroup] = React.useState({
    name: "",
    contactInfo: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
                <input
                  className="GroupsEdit-Name"
                  placeholder="Name"
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
                <textarea
                  className="GroupsEdit-ContactInfo"
                  placeholder="ContactInfo"
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
