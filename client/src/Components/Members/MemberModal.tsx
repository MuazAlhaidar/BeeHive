import React from "react";
import Member from "./Member";
import { store } from "../../store";
import {
  setGroupMembers as APIsetMembers,
  // getGroupMembers as APIgetMembers,
} from "../../api/Groups";
import { MemberInfo } from "../../Interfaces";
import "../../CSS/Members/MemberModal.css";
// import { resolve } from "dns";

interface IProps {
  // TODO Get the Group ID
  // For IsInGroup
  // Only way we can get the members
  groupID: string;
  allMembers: Array<MemberInfo>;
  memberList: Array<MemberInfo>;
  setMemberList: (memberList: Array<MemberInfo>) => void;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  setMembers: (memberList: Array<MemberInfo>, index: number) => void;
  index: number
}


function MemberModal({
  groupID,
  allMembers,
  memberList,
  setMemberList,
  showModal,
  setShowModal,
  setMembers,
  index
}: IProps) {
  // TODO
  const [reload, setReload] = React.useState(false);
  const [groupMembers, setGroupMembers] = React.useState(memberList);
  const refreshFilter = (lst:any) =>{
         let RETURN= allMembers.filter((member)=> {
                  let retme=true;
                  lst.forEach((x:any)=>{
                          if(x.id == member.id)
                                  retme=false
                  })
                  return retme

          })
          return RETURN
  }
  let [NonMembers, setNonMembers] = React.useState(
          refreshFilter(memberList)
  );
  React.useEffect(()=>{
          setNonMembers(refreshFilter(groupMembers))
  }, [reload,])
  React.useEffect(()=>{
          setGroupMembers(memberList)
          setNonMembers(refreshFilter(memberList))
  },[memberList, index])
  refreshFilter(memberList)

  

  const handleSave = () => {
    // clicking save just gets emails from groupUser and assigns them to the API
    // API Call for this group this is the member list
    const state = store.getState().state;
    const index = state.index;

    // Save it on the frontend
    setMembers(groupMembers, index);
    setMemberList(groupMembers);

    const groupEmails = groupMembers.map((x) => x.id);
    APIsetMembers(groupID, groupEmails);

    setShowModal(!showModal);
  };

  const handleCancel = () => {
          setGroupMembers(memberList)
          setReload(!reload)
    setShowModal(!showModal);
  };

  const addToGroup = (member: MemberInfo) => {
    const m = groupMembers.slice();
    m.push(member);
    setGroupMembers(m)
    setReload(!reload);
  };

  const removeFromGroup = (index: number) => {
    const m = groupMembers.slice();
    m.splice(index, 1);
    setGroupMembers(m)
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
                      {allMembers.length==0
                  ? null
                  : NonMembers.map((curMem: MemberInfo, index: number) => {
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
                {groupMembers.length==0
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
