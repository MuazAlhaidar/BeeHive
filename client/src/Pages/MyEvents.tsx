import React from "react";
import "../CSS/Events/MyEvents.css";
import EventList from "../Components/Events/EventsList";
import EventsForm from "../Components/Events/EventsForm";
import EmailModal from "../Components/EmailModal";
import EventEdit from "../Components/Events/EventsEdit";
import EventMemberModal from "../Components/Events/EventMemberModal";
import TransferManagerModal from "../Components/TransferManagerModal";
import ConfirmationModal from "../Components/ConfirmationModal";
import * as API from "../api/Event";
import { store, redux_index } from "../store";
import { MemberInfo, EventInfo } from "../Interfaces";
import { getFormattedDate, getFormattedTime } from "../DateAndTimeFormat";

async function reload(user: string) {
  const myevents = (await API.getEventsForManager(user))
    .data as Array<EventInfo>;
  let tmp = myevents.map(async (i: EventInfo) => {
    i.rsvp = (await API.getEventMembers(i.title)).data;
    let tmp = i.date as any;
    i.date = tmp.toDate();
    return i;
  });
  return Promise.all(tmp).then((res: Array<EventInfo>) => res);
}

function MyEvents(props: { id: any }) {
  const emptyEvent: EventInfo = {
    title: "",
    creator: "",
    address: "",
    date: new Date(2000, 1, 1, 0, 0),
    description: "",
    rsvp: Array<string>(),
    sigin: Array<string>(),
  };

  const [events, setEvents] = React.useState(Array<EventInfo>());
  const [eventIndex, setEventIndex] = React.useState(-1);
  const [showEventEditModal, setShowEventEditModal] = React.useState(false);
  const [showEventMemberModal, setShowEventMemberModal] = React.useState(false);
  const [showEmailModal, setShowEmailModal] = React.useState(false);
  const [checkReload, setReload] = React.useState(false);
  const [
    showTransferManagerModal,
    setShowTransferManagerModal,
  ] = React.useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = React.useState(
    false
  );
  const [curEvent, setCurEvent] = React.useState({
    title: "",
    address: "",
    time: "",
    date: "",
    description: "",
  });

  React.useEffect(() => {
    reload(props.id).then((res) => setEvents(res));
  }, [eventIndex, checkReload]);

  const toggleEmailModal = () => {
    setShowEmailModal(!showEmailModal);
  };

  const toggleEventEditModal = () => {
    setShowEventEditModal(!showEventEditModal);
  };

  const toggleEventMemberModal = () => {
    setShowEventMemberModal(!showEventMemberModal);
  };

  const toggleTransferManagerModal = () => {
    setShowTransferManagerModal(!showTransferManagerModal);
  };

  const toggleConfirmationModal = () => {
    setShowConfirmationModal(!showConfirmationModal);
  };

  const selectEvent = (i: number) => {
    let index = i === undefined ? 0 : i;
    setEventIndex(index);
    i === undefined
      ? setCurEvent({
          title: "",
          address: "",
          time: "",
          date: "",
          description: "",
        })
      : setCurEvent({
          title: events[index].title,
          address: events[index].address,
          time: getFormattedTime(events[index]),
          date: getFormattedDate(events[index]),
          description: events[index].description,
        });
    store.dispatch(redux_index(i));
  };

  const addEvent = async (
    title: string,
    address: string,
    time: string,
    date: string,
    description: string
  ) => {
    let [month, day, year] = date.split("-").map((i) => parseInt(i));
    let [hour, minute] = time.split(":").map((i) => parseInt(i));
    let thedate = new Date(year, month - 1, day, hour, minute);
    let _tmp = await API.newEvent(title, description, address, thedate);
    const e = events.slice();
    e.push({
      title,
      address,
      date: thedate,
      description,
      rsvp: Array<string>(),
      sigin: Array<string>(),
      creator: "",
    });
    setEvents(e);
    setEventIndex(events.length);
    setCurEvent({
      title,
      address,
      time,
      date,
      description,
    });
  };

  const editEvent = async (
    title: string,
    address: string,
    time: string,
    date: string,
    description: string
  ) => {
    if (events[eventIndex] !== undefined) {
      let [month, day, year] = date.split("-").map((i) => parseInt(i));
      let [hour, minute] = time.split(":").map((i) => parseInt(i));
      let thedate = new Date(year, month - 1, day, hour - 5, minute);
      await API.updateEvent(title, description, address, thedate);
      const e = events.slice();
      e[eventIndex].title = title;
      e[eventIndex].address = address;
      e[eventIndex].date = thedate;
      e[eventIndex].description = description;
      setEvents(e);
      setCurEvent({
        title: events[eventIndex].title,
        address: events[eventIndex].address,
        time:
          events[eventIndex].date.getHours() +
          ":" +
          events[eventIndex].date.getMinutes(),
        date: events[eventIndex].date.getDate().toString(),
        description: events[eventIndex].description,
      });
    }
  };

  const removeEvent = async (i: number) => {
    if (events[i] !== undefined) {
      await API.deleteEvent(events[i].title);
      const e = events.slice();
      e.splice(i, 1);
      setEvents(e);
      setEventIndex(-1);
    }

    setCurEvent({
      title: "",
      address: "",
      time: "",
      date: "",
      description: "",
    });
  };

  return (
    <div className="MyEvents">
      <EmailModal showModal={showEmailModal} setShowModal={setShowEmailModal} />
      <EventEdit
        showModal={showEventEditModal}
        setShowModal={setShowEventEditModal}
        editEvent={editEvent}
        currentEvent={curEvent}
        setCurEvent={setCurEvent}
      />
      <EventMemberModal
        showModal={showEventMemberModal}
        setShowModal={setShowEventMemberModal}
        members={
          events[eventIndex] !== undefined ? events[eventIndex].rsvp : null
        }
      />
      <TransferManagerModal
        showModal={showTransferManagerModal}
        setShowModal={setShowTransferManagerModal}
        setReload={setReload}
        event={
          events[eventIndex] !== undefined ? events[eventIndex].title : null
        }
        reload={checkReload}
      />
      <ConfirmationModal
        showModal={showConfirmationModal}
        setShowModal={setShowConfirmationModal}
        removeFunction={() => {
          removeEvent(eventIndex);
        }}
      />
      <div className="MyEvents-EventList">
        <EventList
          eventList={events}
          selectEvent={selectEvent}
          addEvent={addEvent}
        />
      </div>
      <div className="MyEvents-EventForm">
        {eventIndex > events.length - 1 || eventIndex < 0 ? (
          <EventsForm
            event={emptyEvent}
            toggleEmailModal={toggleEmailModal}
            toggleEventEditModal={toggleEventEditModal}
            toggleEventMemberModal={toggleEventMemberModal}
            toggleTransferManagerModal={toggleTransferManagerModal}
            toggleConfirmationModal={toggleConfirmationModal}
          />
        ) : (
          <EventsForm
            event={events[eventIndex]}
            toggleEmailModal={toggleEmailModal}
            toggleEventEditModal={toggleEventEditModal}
            toggleEventMemberModal={toggleEventMemberModal}
            toggleTransferManagerModal={toggleTransferManagerModal}
            toggleConfirmationModal={toggleConfirmationModal}
          />
        )}
      </div>
    </div>
  );
}

export default MyEvents;
