import { Fire } from "./config.js";
import * as FireAPI from "./Firebase";
import "firebase/auth";
import "firebase/firestore";

interface Message {
  data: any;
  msg: string | number;
}

function genMessage(_data: any, _msg: any) {
  return { msg: _msg, data: _data };
}

async function newEvent(
  userid:string,
  title: string,
  desc: string,
  address: string,
  date: Date

) {
  let user = Fire.default.auth();
  let email = user?.currentUser?.email;
  // let userid =await FireAPI.getDoc("Users-WEB", "email", email)
  console.log(userid)

    // If the event does not exist
    return FireAPI.newDoc("Events-WEB", {
        title: title,
        address: address,
        date: date,
        description: desc,
        creator: userid,
        rsvp: [],
        signin: [],
      }, "title")
  } 


async function updateEvent(
  id:string,
  title: string,
  desc: string,
  address: string,
  date: Date
) {
        return FireAPI.updateDoc("Events-WEB", {
        title: title,
        description: desc,
        address: address,
        date: date,
      }, id, "title")

}

async function getAllEvents() {
        return FireAPI.getDoc("Events-WEB")
}

// Only returns true
async function deleteEvent(EventId: string) {
        return FireAPI.delet("Events-WEB", EventId)
}

async function updateRSVP(EventId: string, userId: string) {
  Fire.default
    .firestore()
    .collection("Events-WEB")
    .doc(EventId)
    // Using the title we find the event
    // Update the RSVP list of the event
    .update({ rsvp: Fire.default.firestore.FieldValue.arrayUnion(userId) });
}

async function transferEvent(EventId: string, UserId: string) {
        return FireAPI.update("Events-WEB", EventId, {creator:UserId})
}

async function getEventsForManager(userid: string) {
        return FireAPI.getDocsSub("Events-WEB", "Users-WEB", "rsvp", "email", "creator", userid)
  // return (
  //   Fire.default
  //     .firestore()
  //     .collection("Events-WEB")
  //     // Find the event with the given user as the creator
  //     .where("creator", "==", user)
  //     .get()
  //     .then((res: any) =>
  //       // Return the Events
  //       genMessage(
  //         res.docs.map((x: any) => x.data()),
  //         "All events that the current user manages"
  //       )
  //     )
  //     .catch((err: any) =>
  //       genMessage(err, "Failed to get all events the user manages")
  //     )
  // );
}

async function getEventMembers(EventTitle: string) {
  // Get the event object
  let event = await Fire.default
    .firestore()
    .collection("Events-WEB")
    .doc(EventTitle)
    .get();
  let data = (await event.data()) as any;
  // Return all RSVPs of that event
  // In the form of a User
  // This way we can update user points and such
  let promises = data.rsvp.map(async (user: any) => {
    let tmp = await Fire.default
      .firestore()
      .collection("Users-WEB")
      .doc(user)
      .get();
    return tmp.data();
  });

  return Promise.all(promises)
    .then((res: any) => genMessage(res, "All members for an event"))
    .catch((err: any) =>
      genMessage(err, "Failed to get all members for an event")
    );
}

async function memberEventUpdate(
  users: [{ user: string; points: number; signin: boolean }],
  EventTitle: string
) {
  let signin: any[] = [];
  async function inner() {
    // Update the attendee list
    users.forEach((user) => {
      if (user.signin === true) {
        signin.push(user.user);
      }
      Fire.default
        .firestore()
        .collection("Users-WEB")
        .doc(user.user)
        // Update the points of users
        .update({ points: user.points });
    });
    Fire.default
      .firestore()
      .collection("Events-WEB")
      .doc(EventTitle)
      .update({ signin });
  }
  return inner()
    .then((res: any) => genMessage(res, "Updated members for events"))
    .catch((err: any) => genMessage(err, "Failed to updated events"));
}

// TODO EMAIL

export {
  newEvent,
  updateEvent,
  getAllEvents,
  deleteEvent,
  transferEvent,
  getEventsForManager,
  getEventMembers,
  memberEventUpdate,
  updateRSVP,
};
