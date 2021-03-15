import React from "react";
import EditMemberPointsButton from "../EditMemberPointsButton";
import "../../CSS/Events/EventMemberModal.css";

interface MemberInfo {
  id: number;
  firstname: string;
  lastname: string;
  points: number;
}

interface IProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

function EventMemberModal({ showModal, setShowModal }: IProps) {
  const fakeMembers = Array<MemberInfo>(
    { id: 1, firstname: "John", lastname: "Keng", points: 20 },
    { id: 2, firstname: "Andrew", lastname: "Slade", points: 22 },
    { id: 3, firstname: "Kyle", lastname: "Stevens", points: 55 },
    { id: 4, firstname: "James", lastname: "Cicili", points: 55 },
    { id: 5, firstname: "Lisa", lastname: "Jenki", points: 12 },
    { id: 5, firstname: "Lisa", lastname: "Jenki", points: 12 },
    { id: 5, firstname: "Lisa", lastname: "Jenki", points: 12 },
    { id: 5, firstname: "Lisa", lastname: "Jenki", points: 12 },
    { id: 5, firstname: "Lisa", lastname: "Jenki", points: 12 },
    { id: 5, firstname: "Lisa", lastname: "Jenki", points: 12 },
    { id: 5, firstname: "Lisa", lastname: "Jenki", points: 12 },
    { id: 5, firstname: "Lisa", lastname: "Jenki", points: 12 },
    { id: 5, firstname: "Lisa", lastname: "Jenki", points: 12 },
    { id: 5, firstname: "Lisa", lastname: "Jenki", points: 12 },
    { id: 5, firstname: "Lisa", lastname: "Jenki", points: 12 },
    { id: 5, firstname: "Lisa", lastname: "Jenki", points: 12 },
    { id: 5, firstname: "Lisa", lastname: "Jenki", points: 12 },
    { id: 5, firstname: "Lisa", lastname: "Jenki", points: 12 },
  );

  const [sortedList, setSortedList] = React.useState(
    fakeMembers.sort((a, b) => (a.points < b.points ? 1 : -1))
  );

  const [hasAttended, setHasAttended] = React.useState(false);

  const setAttended = () => {
    setHasAttended(!hasAttended);
  };

  const handleSave = () => {
    setShowModal(!showModal);
  };

  const handleCancel = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      {showModal ? (
        <div className="EventMemberModal-Background">
          <div className="EventMemberModal-Div">
            <div className="EventMemberModal-TopBar">
              <div className="EventMemberModal-FirstName">First</div>
              <div className="EventMemberModal-LastName">Last</div>
              <div className="EventMemberModal-Attended">Attended</div>
              <div className="EventMemberModal-Points">Points</div>
            </div>
            <div className="EventMemberModal-MemberList">
              {sortedList.map((member, index) => {
                return (
                  <div
                    className={
                      index % 2 === 0
                        ? "EventMemberModal-MemberInfo-lightgrey"
                        : "EventMemberModal-MemberInfo-white"
                    }
                  >
                    <div className="EventMemberModal-FirstName">
                      {member.firstname}
                    </div>
                    <div className="EventMemberModal-LastName">
                      {member.lastname}
                    </div>
                    <form className="EventMemberModal-Attended">
                      <input
                        type="checkbox"
                        defaultChecked={false}
                        onChange={setAttended}
                      />
                    </form>
                    <div className="EventMemberModal-Points">
                      {member.points}
                    </div>
                    <EditMemberPointsButton />
                  </div>
                );
              })}
            </div>
            <div className="EventMemberModal-BottomBar">
              <div className="EventMemberModal-Buttons">
                <button
                  className="EventMemberModal-LightButton"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="EventMemberModal-DarkButton"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default EventMemberModal;
