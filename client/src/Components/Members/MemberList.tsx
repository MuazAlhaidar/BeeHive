import React from "react";
import "../../CSS/Members/MemberList.css";
import { MemberInfo } from "../../Interfaces";
import Member from "./Member";

interface IProps {
  memberList: Array<MemberInfo>;
  toggleMemberModal: () => void;
}

function MemberList({ memberList, toggleMemberModal }: IProps) {
  const members = memberList;
  // TODO use emails to get names and display them in the map
  return (
    <div>
      <div className="MemberList-Top">
        <label className="MemberList-MemberListLabel">Members</label>
        <button className="MemberList-AddButton" onClick={toggleMemberModal}>
          +
        </button>
      </div>
      <div>
        {members.map((curMember) => {
          return (
            <Member
              Firstname={curMember.Firstname}
              Lastname={curMember.Lastname}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MemberList;
