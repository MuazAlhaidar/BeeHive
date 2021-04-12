import "../../CSS/Members/MemberList.css";
import { MemberInfo } from "../../Interfaces";
import Member from "./Member";

interface IProps {
  groupId: string;
  users:MemberInfo[];
  toggleMemberModal: () => void;
}

function MemberList({ groupId, toggleMemberModal,users }: IProps) {
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
        {users.map((curMember) => {
          return (
            <Member
              Firstname={curMember.firstname}
              Lastname={curMember.lastname}
            />
          );
        })} 
      </div>
    </div>
  );
}

export default MemberList;
