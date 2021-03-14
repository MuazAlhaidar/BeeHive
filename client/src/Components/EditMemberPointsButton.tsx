import React from "react";
import { Overlay } from "react-bootstrap";
import EditMemberPointsPanel from "./EditMemberPointsPanel";
import "../CSS/EditMemberPointsButtom.css";

function EditMemberPointsButton() {
  const [show, setShow] = React.useState(false);
  const target = React.useRef(null);

  return (
    <>
      <button
        className="EditMemberPointsButton"
        ref={target}
        onClick={() => setShow(!show)}
      >
        Edit
      </button>
      <Overlay target={target.current} show={show} placement="right">
        {({ placement, arrowProps, show: _show, popper, ...props }) => (
          <div {...props}>
            <EditMemberPointsPanel />
          </div>
        )}
      </Overlay>
    </>
  );
}

export default EditMemberPointsButton;
