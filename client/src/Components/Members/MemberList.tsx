import "../../CSS/Members/MemberList.css";
// import { MemberInfo } from "../../Interfaces";
// import Member from "./Member";

interface IProps {
  groupId: string;
  toggleMemberModal: () => void;
}

function MemberList({ groupId, toggleMemberModal }: IProps) {
  // TODO use emails to get names and display them in the map
  // Use groupId to get all members
  return (
    <div>
      <div className="MemberList-Top">
        <label className="MemberList-MemberListLabel">Members</label>
        <button className="MemberList-AddButton" onClick={toggleMemberModal}>
          +
        </button>
      </div>
      <div>
        {/* {members.map((curMember) => {
          return (
            <Member
              Firstname={curMember.Firstname}
              Lastname={curMember.Lastname}
            />
          );
        })} */}
      </div>
    </div>
  );
}

export default MemberList;
