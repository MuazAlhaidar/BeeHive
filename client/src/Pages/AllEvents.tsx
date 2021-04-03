import React from "react";
import "../CSS/Events/MyEvents.css";
import EventList from "../Components/Events/EventsList(view-only)";
import EventsForm from "../Components/Events/EventsForm(view-only)";
import EventsFormNonMember from "../Components/Events/EventsForm(NonMember)";
import * as API from "../api/Event";
import { store, redux_index, redux_rsvp, Relation } from "../store";
import { EventInfo } from "../Interfaces";

interface EventInfo2 extends EventInfo {
  relation: Relation;
}

interface IProp {
  name: string;
  id: number | any;
}

async function reload(id: any) {
  const allevents = await API.getAllEvents();
  const events = allevents.map((i: any) => {
    let date_obj = new Date(i.date.toDate());
    let _relation = null;
    switch (i.relation) {
      case Relation.Manager:
        _relation = Relation.Manager;
        break;
      case Relation.RSVP:
        _relation = Relation.RSVP;
        break;
      default:
        _relation = Relation.NotRSVP;
    }
    return {
      title: i.title,
      creator: i.creator,
      description: i.description,
      address: i.address,
      date: date_obj,
      rsvp: i.rsvp,
      signin: i.signin,
      relation: _relation,
    };
  });
  return events;
}

function MyEvents({ name, id }: IProp) {
  const [events, setEvents] = React.useState(Array<EventInfo2>());
  // const set_relation = (i: number) => {
  //   API.RSVP(events[i].title, id);
  //   if (events[i].relation === Relation.RSVP) {
  //     events[i].relation = Relation.NotRSVP;
  //   } else if (events[i].relation === Relation.NotRSVP) {
  //     events[i].relation = Relation.RSVP;
  //   }
  // };
  React.useEffect(() => {
    reload(id).then((res) => setEvents(res));
  }, []);
  const [eventIndex, setEventIndex] = React.useState(-1);
  const emptyEvent = {
    title: "",
    creator: "",
    address: "",
    date: new Date(2000, 1, 1, 0, 0),
    description: "",
    rsvp: Array<string>(),
    sigin: Array<string>(),
    relation: Relation.NotRSVP,
  } as EventInfo2;

  const selectEvent = (i: number) => {
    let index = i === undefined ? 0 : i;
    store.dispatch(redux_index(i));
    store.dispatch(redux_rsvp(events[i].relation));
    console.log(`EventDate: ${events[index].date.getMonth()}`);
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
            <EventsFormNonMember event={emptyEvent} />
          ) : (
            <EventsFormNonMember event={events[eventIndex]} />
          )
        ) : eventIndex > events.length - 1 || eventIndex < 0 ? (
          <EventsForm event={emptyEvent} />
        ) : (
          <EventsForm event={events[eventIndex]} />
        )}
      </div>
    </div>
  );
}

export default MyEvents;
