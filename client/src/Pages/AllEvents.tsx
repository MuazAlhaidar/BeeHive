import React from "react";
import "../CSS/Events/MyEvents.css";
import EventList from "../Components/Events/EventsList(view-only)";
import EventsForm from "../Components/Events/EventsForm(view-only)";
import EventsFormNonMember from "../Components/Events/EventsForm(NonMember)";
import * as API from "../api/Event";
import { store, redux_index, redux_rsvp } from "../store";

interface MemberInfo {
  name: string;
  points: number;
}

enum Relation {
  Manager,
  RSVP,
  NotRSVP,
}

interface EventInfo {
  name: string;
  address: string;
  time: string;
  date: string;
  description: string;
  members: Array<MemberInfo> | null;
  id: string;
  relation: Relation;
}

interface IProp {
  name: string;
  id: number | any;
}

async function reload(id: any) {
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
    let _relation = null;
    {
      if (i.Manager === 1) {
        _relation = Relation.Manager;
      } else if (i.RSVP === 1) {
        _relation = Relation.RSVP;
      } else {
        _relation = Relation.NotRSVP;
      }
    }
    return {
      name: i.Name,
      description: i.Description,
      address: i.Address,
      time: _time,
      date: _date,
      members: null,
      id: i.id,
      relation: _relation,
    };
  });
  return events;
}

function MyEvents({ name, id }: IProp) {
  const [events, setEvents] = React.useState(Array<EventInfo>());
  const set_relation = (i: number) => {
    API.RSVP(events[i].id, id);
    if (events[i].relation === Relation.RSVP) {
      events[i].relation = Relation.NotRSVP;
    } else if (events[i].relation === Relation.NotRSVP) {
      events[i].relation = Relation.RSVP;
    }
  };
  React.useEffect(() => {
    reload(id).then((res) => setEvents(res));
  }, []);
  const [eventIndex, setEventIndex] = React.useState(-1);

  const selectEvent = (i: number) => {
    let index = i === undefined ? 0 : i;
    store.dispatch(redux_index(i));
    store.dispatch(redux_rsvp(events[i].relation));
    setEventIndex(index);
  };

  return (
    <div className="MyEvents">
      <div className="MyEvents-EventList">
        <EventList eventList={events} selectEvent={selectEvent} />
      </div>
      <div className="MyEvents-EventForm">
        {name === "" ? (
          eventIndex > events.length - 1 || eventIndex < 0 ? (
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
        ) : eventIndex > events.length - 1 || eventIndex < 0 ? (
          <EventsForm
            name={""}
            address={""}
            time={""}
            date={""}
            description={""}
            set_relation={set_relation}
          />
        ) : (
          <EventsForm
            name={events[eventIndex].name}
            address={events[eventIndex].address}
            time={events[eventIndex].time}
            date={events[eventIndex].date}
            description={events[eventIndex].description}
            set_relation={set_relation}
          />
        )}
      </div>
    </div>
  );
}

export default MyEvents;
