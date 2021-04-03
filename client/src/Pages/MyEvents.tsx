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
import { store, redux_index, redux_members } from "../store";
import { MemberInfo, EventInfo } from "../Interfaces";
import { getFormattedDate, getFormattedTime } from "../DateAndTimeFormat";

async function reload(user: string) {
  const _myevents = await API.getEventManager(user);
  const _mymembers = await API.getMembers(user);
  const myevents = _myevents.data;
  const members = _mymembers.data;

  if (myevents === undefined) {
    return [];
  } else {
    let events: any = {};
    myevents.forEach((i: any) => {
      let date_obj = new Date(i.date.toDate());
      let tmp_event = {
        title: i.title,
        description: i.description,
        address: i.address,
        date: date_obj,
        members: null,
        creator: i.creator,
        signing: i.signin,
        rsvp: i.rsvp,
      };
      events[i.title] = tmp_event;
    });
    if (members !== undefined) {
      members.forEach((i: any) => {
        if (events[i.title].members == null) {
          events[i.title].members = Array<MemberInfo>({
            firstname: i.firstname,
            lastname: i.lastname,
            email: i.email,
            points: i.points,
          });
        } else {
          events[i.title].members.push({
            firstname: i.firstname,
            lastname: i.lastname,
            email: i.email,
            points: i.points,
          });
        }
      });
    }
    console.log(events);
    return Object.values(events) as Array<EventInfo>;
  }
}

function MyEvents(props: { id: any }) {
  const emptyEvent = {} as EventInfo;

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
      await API.update(title, description, address, thedate);
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
      await API.Delete(events[i].title);
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
        curEvent={curEvent}
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
