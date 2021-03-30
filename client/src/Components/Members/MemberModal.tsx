import React from "react";
import Member from "./Member";
import { store, redux_index } from "../../store";
import { setMembers as APIsetMembers } from "../../api/Groups";
import { MemberInfo } from "../../Interfaces";
import "../../CSS/Members/MemberModal.css";

interface IProps {
  // TODO Get the Group ID
  // For IsInGroup
  // Only way we can ge the members
  allMembers: Array<MemberInfo>;
  memberList: Array<MemberInfo>;
  setMemberList: (memberList: Array<MemberInfo>) => void;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  setMembers: (memberList: Array<MemberInfo>, index: number) => void;
}

function MemberModal({
  allMembers,
  memberList,
  setMemberList,
  showModal,
  setShowModal,
  setMembers,
}: IProps) {
  function isInGroup(value: MemberInfo, index: number, array: MemberInfo[]) {
    let retme = true;
    memberList.forEach((m) => {
      if (m.id === value.id) {
        retme = false;
      }
    });
    return retme;
  }

  // const [memList, setMemList] = React.useState(memberList);
  const [pastIn, setpastIn] = React.useState(memberList);
  // Used to removign changes made
  let filteredList = allMembers.filter(isInGroup);
  const [pastOut, setpastOut] = React.useState(filteredList);

  const handleSave = () => {
    // API Call for this group this is the member list
    const state = store.getState().state;
    const index = state.index;
    const id = state.relation;

    // Save it on teh frontend
    console.log(id, index);
    setMembers(memberList, index);
    console.log(id, memberList, index);
    APIsetMembers(id, memberList.map(x => x.Firstname+" "+x.Lastname));

    setShowModal(!showModal);
  };

  const handleCancel = () => {
    setShowModal(!showModal);
  };

  const addToGroup = (member: MemberInfo) => {
    const m = memberList.slice();
    m.push(member);
    setMemberList(m);
  };

  const removeFromGroup = (index: number) => {
    const m = memberList.slice();
    m.splice(index, 1);
    setMemberList(m);
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
                              Firstname={curMem.Firstname}
                              Lastname={curMem.Lastname}
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
                  : memberList.map((curMem: MemberInfo, index: number) => {
                      return (
                        <div className="MemberModal-InGroupMembers">
                          <div className="MemberModal-MemberDiv">
                            <Member
                              Firstname={curMem.Firstname}
                              Lastname={curMem.Lastname}
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
