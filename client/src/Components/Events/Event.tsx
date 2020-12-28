import React from "react";
import EventsForm from "./EventsForm";

interface IProps {
  index: number;
  name: string;
  selectEvent: (i: number) => void;
}

function Event({ name, index, selectEvent }: IProps) {
  return (
    <div>
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
