import { Fire } from "./config.js";
import * as FireAPI from "./Firebase";
import "firebase/auth";
import "firebase/firestore";
import * as Interface from "../Interfaces";

function genMessage(_data: any, _msg: any) {
  return { msg: _msg, data: _data };
}

async function newEvent(
  userid: string,
  title: string,
  desc: string,
  address: string,
  date: Date
) {
  // Adding the event to the Events-WEB table
  let tmp = await FireAPI.newDoc("Events-WEB", {
    title: title,
    address: address,
    date: date,
    description: desc,
    creator: userid,
    rsvp: [],
    signin: [],
  });
  tmp["data"] as Interface.EventInfo;
  return tmp;
}

async function updateEvent(
  id: string,
  title: string,
  desc: string,
  address: string,
  date: Date
) {
  // Updating the document based on the ID
  return FireAPI.updateDoc(
    "Events-WEB",
    {
      title: title,
      description: desc,
      address: address,
      date: date,
    },
    id
  );
}

async function getAllEvents(id: string | undefined) {
  return (await FireAPI.getDoc("Events-WEB")).data
    .map((x: any) => {
      if (x.creator === id) return null;
      x["date"] = x["date"].toDate();
      // If it's 0, then it will return true, or the user IS rsvp to an event
      // else, it will return 1, or the user is not rsvp to an event
      x["relation"] = x["rsvp"].includes(id) ? 0 : 1;
      return x;
    })
    .filter((x: any) => x != null);
}

// Only returns true
async function deleteEvent(EventId: string) {
  // Delete an event using an ID
  return FireAPI.deleteDoc("Events-WEB", EventId);
}

async function updateRSVP(EventId: string, userId: string) {
  Fire.default
    .firestore()
    .collection("Events-WEB")
    .doc(EventId)
    // Using the ID we find the event
    // Update the RSVP list of the event
    .update({ rsvp: Fire.default.firestore.FieldValue.arrayUnion(userId) });
}
async function removeRSVP(EventId: string, userId: string) {
  Fire.default
    .firestore()
    .collection("Events-WEB")
    .doc(EventId)
    // Using the ID we find the event
    // Update the RSVP list of the event
    .update({
      rsvp: Fire.default.firestore.FieldValue.arrayRemove(userId),
      signin: Fire.default.firestore.FieldValue.arrayRemove(userId),
    });
}

async function transferEvent(EventId: string, UserId: string) {
  // Use the event ID to update the creator field of the event
  return FireAPI.updateField("Events-WEB", EventId, { creator: UserId });
}

async function getEventsForManager(userid: string) {
  // Get all of the events that have a creator field that matches
  // the user's ID
  return (
    await FireAPI.getDocUser("Events-WEB", "rsvp", "creator", userid)
  ).map((x: any) => {
    x["date"] = x["date"].toDate();
    return x;
  });
}

async function memberEventUpdate(
  users: Interface.MemberInfoSign[],
  EventId: string
) {
  let signin: any[] = [];
  async function inner() {
    // Update the attendee list
    users.forEach((user) => {
      if (user.signin === true) {
        signin.push(user.id);
      }
      Fire.default
        .firestore()
        .collection("Users-WEB")
        // Gets the ID
        .doc(user.id)
        // Update the points of users
        .update({ points: user.points });
    });
    Fire.default
      .firestore()
      .collection("Events-WEB")
      .doc(EventId)
      .update({ signin });
  }
  return inner()
    .then((res: any) => genMessage(res, "Updated members for events"))
    .catch((err: any) => genMessage(err, "Failed to updated events"));
}
async function memberupdate(
  // users: [{ id: string; points: number; signin: boolean }],
  user: Interface.MemberInfo
) {
  return Fire.default
    .firestore()
    .collection("Users-WEB")
    .doc(user.id)
    .update({ points: user.points });
}

export {
  newEvent,
  updateEvent,
  getAllEvents,
  deleteEvent,
  transferEvent,
  getEventsForManager,
  memberEventUpdate,
  memberupdate,
  updateRSVP,
  removeRSVP,
};
