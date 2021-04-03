import React from "react";
import Member from "./Member";
import { store } from "../../store";
import {
  setGroupMembers as APIsetMembers,
  getGroupMembers as APIgetMembers,
} from "../../api/Groups";
import { MemberInfo } from "../../Interfaces";
import "../../CSS/Members/MemberModal.css";
// import { resolve } from "dns";

interface IProps {
  // TODO Get the Group ID
  // For IsInGroup
  // Only way we can ge the members
  groupID: string;
  allMembers: Array<MemberInfo>;
  memberList: Array<string>;
  setMemberList: (memberList: Array<string>) => void;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  setMembers: (memberList: Array<string>, index: number) => void;
}

function MemberModal({
  groupID,
  allMembers,
  memberList,
  setMemberList,
  showModal,
  setShowModal,
  setMembers,
}: IProps) {
  // TODO
  const [reload, setReload] = React.useState(false);

  let groupEmailList = Array<string>();
  APIgetMembers(groupID).then((response: any) => {
    groupEmailList = response.data.members;
  });

  let groupMembers = Array<MemberInfo>();
  allMembers.forEach((member) => {
    if (groupEmailList.includes(member.email)) {
      groupMembers.push(member);
    }
  });

  function isInGroup(value: MemberInfo, index: number, array: MemberInfo[]) {
    let retme = true;
    groupMembers.forEach((m) => {
      if (m.email === value.email) {
        retme = false;
      }
    });
    return retme;
  }

  // const [pastIn, setpastIn] = React.useState(memberList);
  // Used to removing changes made
  let filteredList = allMembers.filter(isInGroup);
  // const [pastOut, setpastOut] = React.useState(filteredList);

  const handleSave = () => {
    // clicking save just gets emails from groupUser and assigns them to the API
    // API Call for this group this is the member list
    const state = store.getState().state;
    const index = state.index;
    const groupEmails = groupMembers.map((x) => x.email);

    // Save it on the frontend
    console.log(groupID, index);
    setMembers(groupEmails, index);
    console.log(groupID, memberList, index);
    setMemberList(groupEmails);
    APIsetMembers(groupID, groupEmails);

    setShowModal(!showModal);
  };

  const handleCancel = () => {
    setShowModal(!showModal);
  };

  const addToGroup = (member: MemberInfo) => {
    const m = groupMembers.slice();
    m.push(member);
    groupMembers = m;
    setReload(!reload);
  };

  const removeFromGroup = (index: number) => {
    const m = groupMembers.slice();
    m.splice(index, 1);
    groupMembers = m;
    setReload(!reload);
  };

  return (
    <div>
      {showModal ? (
        <div className="MemberModal-Background">
          <div className="MemberModal">
            <div className="MemberModal-Topbar">Member Manager</div>
            <div className="MemberModal-CatagoryLabels">
              <div>Not In Group</div>
              <div>In Group</div>
            </div>
            <div className="MemberModal-Body">
              <div className="MemberModal-NotInGroup">
                {!Array.isArray(filteredList) || !filteredList.length
                  ? null
                  : filteredList.map((curMem: MemberInfo, index: number) => {
                      return (
                        <div className="MemberModal-NotInGroupMembers">
                          <div className="MemberModal-MemberDiv">
                            <Member
                              Firstname={curMem.firstname}
                              Lastname={curMem.lastname}
                            />
                          </div>
                          <button
                            className="MemberModal-AddButton"
                            onClick={() => {
                              addToGroup(curMem);
                            }}
                          >
                            +
                          </button>
                        </div>
                      );
                    })}
              </div>
              <div className="MemberModal-InGroup">
                {!Array.isArray(memberList) || !memberList.length
                  ? null
                  : groupMembers.map((curMem: MemberInfo, index: number) => {
                      return (
                        <div className="MemberModal-InGroupMembers">
                          <div className="MemberModal-MemberDiv">
                            <Member
                              Firstname={curMem.firstname}
                              Lastname={curMem.lastname}
                            />
                          </div>
                          <button
                            className="MemberModal-RemoveButton"
                            onClick={() => {
                              removeFromGroup(index);
                            }}
                          >
                            x
                          </button>
                        </div>
                      );
                    })}
              </div>
            </div>
            <div className="MemberModal-Buttons">
              <button
                className="MemberModal-LightButton"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button className="MemberModal-DarkButton" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default MemberModal;
