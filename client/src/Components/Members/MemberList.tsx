import React from "react";
import "../../CSS/Members/MemberList.css";

import Member from "./Member";
import MemberModal from "./MemberModal";

interface MemberInfo {
  username: string;
  id: number;
}

interface IProps {
  memberList: Array<MemberInfo>;
  toggleMemberModal: () => void;
}

function MemberList({ memberList, toggleMemberModal }: IProps) {
  const members = memberList;

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
          return <Member username={curMember.username} />;
        })}
      </div>
    </div>
  );
}

export default MemberList;
