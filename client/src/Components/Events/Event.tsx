import "../../CSS/Events/Event.css";

interface IProps {
  index: number;
  name: string;
  selectEvent: (i: number) => void;
}

function Event({ name, index, selectEvent }: IProps) {
  return (
    <div className="Event">
      {/* if the event gets clicked on, run the select
          event function in the MyEvents or AllEvents pages */}
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
