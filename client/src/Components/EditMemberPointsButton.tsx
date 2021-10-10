import { OverlayTrigger } from "react-bootstrap";
import EditMemberPointsPanel from "./EditMemberPointsPanel";
import "../CSS/EditMemberPointsButtom.css";
import { MemberInfo } from "../Interfaces";

interface IProps {
  member: MemberInfo;
  reloadParent: () => void;
}

function EditMemberPointsButton({ member, reloadParent }: IProps) {
  const pointPanel = (
    <div>
      <EditMemberPointsPanel member={member} reloadParent={reloadParent} />
    </div>
  );

  return (
    <>
      <OverlayTrigger
        trigger="click"
        rootClose
        placement="right"
        overlay={pointPanel}
      >
        <button className="EditMemberPointsButton">Edit</button>
      </OverlayTrigger>
    </>
  );
}

export default EditMemberPointsButton;
