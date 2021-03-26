import React from "react";
import { OverlayTrigger } from "react-bootstrap";
import EditMemberPointsPanel from "./EditMemberPointsPanel";
import "../CSS/EditMemberPointsButtom.css";

interface MemberInfo {
  id: string;
  firstname: string;
  lastname: string;
  points: number;
}

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
