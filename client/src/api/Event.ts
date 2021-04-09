import { Fire } from "./config.js";
import * from "./Firebase" as FireAPI
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
  title: string,
  desc: string,
  address: string,
  date: Date
) {
  let find = await Fire.default
    .firestore()
    .collection("Events-WEB")
    .doc(title) // We use a title as the ID for an event
    .get()
    .then((documentSnapshot: any) => {
      // If the document already exists then fail
      if (documentSnapshot.exists) {
        return genMessage(
          -1,
          "This Event already exists. \n Please enter a new Name."
        );
      } else {
        return true;
      }
    });

  let user = Fire.default.auth();
  let email = user?.currentUser?.email;
  if (find === true) {
    // If the event does not exist
    return Fire.default
      .firestore()
      .collection("Events-WEB")
      .doc(title) // We use a title as the ID for an event
      .set({
        title: title,
        address: address,
        date: date,
        description: desc,
        creator: email,
        rsvp: [],
        signin: [],
      })
      .then((res: any) => genMessage(title, "Made a new event"))
      .catch((err: any) => genMessage(err, "Failed to make event"));
  } else return find;
}

async function updateEvent(
  title: string,
  desc: string,
  address: string,
  date: Date
) {
  let find = await Fire.default
    .firestore()
    .collection("Events-WEB")
    .doc(title)
    .get()
    .then((documentSnapshot: any) => {
      if (documentSnapshot.exists) {
        return genMessage(
          -1,
          "This Event already exists. \n Please enter a new Name."
        );
      } else {
        return true;
      }
    });

  if (find === true) {
    // If the provided event name does not exist
    return Fire.default
      .firestore()
      .collection("Events-WEB")
      .doc(title)
      .update({
        title: title,
        description: desc,
        address: address,
        date: date,
      })
      .then((res: any) => genMessage(res, "Updated event"))
      .catch((res: any) => genMessage(res, "Failed to Updated event"));
  } else {
    return find;
  }
}

async function getAllEvents() {
  return (
    Fire.default
      .firestore()
      .collection("Events-WEB")
      .get()
      // Return all Events
      .then((res: any) => res.docs.map((x: any) =>{
              let tmp = x.data()
              tmp["id"] = tmp.id
              return tmp

      }))
      .catch((res: any) => res)
  );
}
getAllEvents().then(res=>{
        console.log(res)
})

// Only returns true
async function deleteEvent(EventTitle: string) {
  return (
    Fire.default
      .firestore()
      .collection("Events-WEB")
      // Using the title (since we are using it as an ID)
      // Find the event and delete it
      .doc(EventTitle)
      .delete()
      .then((res: any) => genMessage(res, "Deleted the event"))
      .catch((res: any) => genMessage(res, "Failed to delete event"))
  );
}

// TODO have a function to unRSVP from an event
async function updateRSVP(EventTitle: string, email: string) {
  Fire.default
    .firestore()
    .collection("Events-WEB")
    .doc(EventTitle)
    // Using the title we find the event
    // Update the RSVP list of the event
    .update({ rsvp: Fire.default.firestore.FieldValue.arrayUnion(email) });
}

async function transferEvent(EventTitle: string, User: string) {
  return (
    Fire.default
      .firestore()
      .collection("Events-WEB")
      .doc(EventTitle)
      // Find the event using the title
      // and change the creator to the new user
      .update({ creator: User })
      .then((res: any) => genMessage(true, "Successfully transfer an event"))
      .catch((err: any) => genMessage(false, "Failed to transfer an event"))
  );
}

async function getEventsForManager(user: string) {
  return (
    Fire.default
      .firestore()
      .collection("Events-WEB")
      // Find the event with the given user as the creator
      .where("creator", "==", user)
      .get()
      .then((res: any) =>
        // Return the Events
        genMessage(
          res.docs.map((x: any) => x.data()),
          "All events that the current user manages"
        )
      )
      .catch((err: any) =>
        genMessage(err, "Failed to get all events the user manages")
      )
  );
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
