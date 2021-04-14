import React from "react";
import EditMemberPointsButton from "../EditMemberPointsButton";
import "../../CSS/Events/EventMemberModal.css";
import { memberEventUpdate } from "../../api/Event";
import { MemberInfo, MemberInfoSign } from "../../Interfaces";

interface IProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  members: MemberInfo[] | null;
  eventid: string | null;
  signin: String[] | null;
  reloadPage: boolean;
  setReloadPage: (reloadPage: boolean) => void;
}

function EventMemberModal({
  showModal,
  setShowModal,
  members,
  eventid,
  signin,
  reloadPage,
  setReloadPage,
}: IProps) {
  let sortedList = Array<MemberInfoSign>({
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    points: 0,
    isowner: false,
    signin: false,
  });

  if (members !== null && members.length !== 0) {
    let _members = (members as unknown) as MemberInfo[];
    // Sort the members from highest points to lowest
    sortedList = _members
      .sort((a, b) => (a.points < b.points ? 1 : -1))
      .map(
        (member: any): MemberInfoSign => {
          // Sets whether the user is signin or not
          let tmp = member;
          if (signin != null) {
            let issignin = signin.includes(member.id);
            tmp["signin"] = issignin;
            tmp["inital"] = issignin;
          } else tmp["signin"] = false;
          tmp["inital"] = false;

          return tmp;
        }
      );
  }

  const [reload, setReload] = React.useState(false);

  const handleSave = () => {
    if (sortedList != null && sortedList.length > 0 && eventid !== null) {
      memberEventUpdate(sortedList, eventid);
      setReloadPage(!reloadPage);
    }
    setShowModal(!showModal);
  };

  const handleCancel = () => {
    if (members != null) {
      members.forEach((member: any) => {
        member["signin"] = member["inital"];
      });
    }
    setReloadPage(!reloadPage);
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
              {/* List all of them members out */}
              {sortedList[0].id !== ""
                ? sortedList.map((member, index) => {
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
                            defaultChecked={member.signin}
                            onChange={() => {
                              sortedList[index].signin = !member.signin;
                            }}
                                  required
                          />
                        </form>
                        <div className="EventMemberModal-Points">
                          {member.points}
                        </div>
                        <EditMemberPointsButton
                          member={member}
                          reloadParent={() => {
                            setReload(!reload);
                          }}
                        />
                      </div>
                    );
                  })
                : null}
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
