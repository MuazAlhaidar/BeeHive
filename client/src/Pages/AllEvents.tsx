import React from "react";
import "../CSS/Events/MyEvents.css";
import EventList from "../Components/Events/EventsList(view-only)";
import EventsForm from "../Components/Events/EventsForm(view-only)";
import EventsFormNonMember from "../Components/Events/EventsForm(NonMember)";
import * as API from "../api/Event";

interface MemberInfo {
  name: string;
  points: number;
}

interface EventInfo {
  name: string;
  address: string;
  time: string;
  date: string;
  description: string;
  members: Array<MemberInfo> | null;
}

interface IProp {
  name: string;
}

async function reload() {
  const allevents = await API.getAllEvents();
  const events = allevents.map((i: any) => {
    var date_obj = new Date(i.Time);
    let _date =
      +(+date_obj.getMonth()) +
      "/" +
      date_obj.getDay() +
      "/" +
      date_obj.getFullYear();
    let minute = date_obj.getMinutes();
    let hour = date_obj.getHours();
    let _hour = ("0" + hour).slice(-2);
    let _minute = ("0" + minute).slice(-2);
    let _time = _hour + ":" + _minute;
    return {
      name: i.Name,
      description: i.Description,
      address: i.Address,
      time: _time,
      date: _date,
      members: null,
    };
  });
  return events;
}

function MyEvents({ name }: IProp) {
  const [events, setEvents] = React.useState(Array<EventInfo>());
  React.useEffect(() => {
    reload().then((res) => setEvents(res));
  }, []);
  const [eventIndex, setEventIndex] = React.useState(0);

  const selectEvent = (i: number) => {
    let index = i === undefined ? 0 : i;
    setEventIndex(index);
  };

  return (
    <div className="MyEvents">
      <div className="MyEvents-EventList">
        <EventList eventList={events} selectEvent={selectEvent} />
      </div>
      <div className="MyEvents-EventForm">
        {name === "" ? (
          eventIndex > events.length - 1 ? (
            <EventsFormNonMember
              name={""}
              address={""}
              time={""}
              date={""}
              description={""}
            />
          ) : (
            <EventsFormNonMember
              name={events[eventIndex].name}
              address={events[eventIndex].address}
              time={events[eventIndex].time}
              date={events[eventIndex].date}
              description={events[eventIndex].description}
            />
          )
        ) : eventIndex > events.length - 1 ? (
          <EventsForm
            name={""}
            address={""}
            time={""}
            date={""}
            description={""}
          />
        ) : (
          <EventsForm
            name={events[eventIndex].name}
            address={events[eventIndex].address}
            time={events[eventIndex].time}
            date={events[eventIndex].date}
            description={events[eventIndex].description}
          />
        )}
        {/* {eventIndex > events.length - 1 ? (
          <EventsForm
            name={""}
            address={""}
            time={""}
            date={""}
            description={""}
          />
        ) : (
          <EventsForm
            name={events[eventIndex].name}
            address={events[eventIndex].address}
            time={events[eventIndex].time}
            date={events[eventIndex].date}
            description={events[eventIndex].description}
          />
        )} */}
      </div>
    </div>
  );
}

export default MyEvents;
