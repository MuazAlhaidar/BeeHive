import React from "react";
import { OverlayTrigger } from "react-bootstrap";
import EditMemberPointsPanel from "./EditMemberPointsPanel";
import "../CSS/EditMemberPointsButtom.css";

interface IProps {
  id: number;
  points: number;
}

function EditMemberPointsButton({ id, points }: IProps) {
  const pointPanel = (
    <div>
      <EditMemberPointsPanel id={id} points={points} />
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
