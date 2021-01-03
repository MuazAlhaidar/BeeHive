import React from "react";
import "../../CSS/Events/Event.css";

interface IProps {
  index: number;
  name: string;
  selectEvent: (i: number) => void;
}

function Event({ name, index, selectEvent }: IProps) {
  return (
    <div className="Event">
      <button
        className="Event-Button"
        onClick={() => {
          selectEvent(index);
        }}
      >
        {name}
      </button>
    </div>
  );
}

export default Event;
