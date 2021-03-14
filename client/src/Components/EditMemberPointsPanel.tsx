import React from "react";
import "../CSS/EditMemberPointsPanel.css";

function EditMemberPointsPanel() {
  let oldNumber = 2;

  const [newNumber, setNewNumber] = React.useState(oldNumber);

  const incrementNum = () => {
    let n = newNumber;
    n += 1;
    setNewNumber(n);
  };

  const decrementNum = () => {
    let n = newNumber;
    n -= 1;
    setNewNumber(n);
  };

  return (
    <div className="EditMemberPointsPanel">
      <div className="EditMemberPointsPanel-Editor">
        <div className="EditMemberPointsPanel-OldPoints">{oldNumber}</div>
        <div className="EditMemberPointsPanel-PointEditor">
          <button
            className="EditMemberPointsPanel-AddPoint"
            onClick={incrementNum}
          >
            +1
          </button>
          <div className="EditMemberPointsPanel-NewPoints">{newNumber}</div>
          <button
            className="EditMemberPointsPanel-MinusPoint"
            onClick={decrementNum}
          >
            -1
          </button>
        </div>
      </div>
      <button className="EditMemberPointsPanel-SaveButton">Save</button>
    </div>
  );
}

export default EditMemberPointsPanel;
