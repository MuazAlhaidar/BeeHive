import { Fire } from "./config.js";
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

  var user = Fire.default.auth();
  let email = user?.currentUser?.email;
  if (find === true) {
    return Fire.default
      .firestore()
      .collection("Events-WEB")
      .doc(title)
      .set({
        title: title,
        address: address,
        date: date,
        description: desc,
        creator: email,
        rsvp: [],
        signin: [],
      })
      .then((res: any) => genMessage(title, "Made a new group"))
      .catch((err: any) => genMessage(err, "Failed to make group"));
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
  return Fire.default
    .firestore()
    .collection("Events-WEB")
    .get()
    .then((res: any) => res.docs.map((x: any) => x.data()))
    .catch((res: any) => res);
}

// Only returns true
async function deleteEvent(_title: string) {
  return Fire.default
    .firestore()
    .collection("Events-WEB")
    .doc(_title)
    .delete()
    .then((res: any) => genMessage(res, "Deleted"))
    .catch((res: any) => genMessage(res, "Failed to delete event"));
}

async function RSVP(title: string, email: string) {
  Fire.default
    .firestore()
    .collection("Events-WEB")
    .doc(title)
    .update({ rsvp: Fire.default.firestore.FieldValue.arrayUnion(email) });
}

async function transferEvent(Event: string, User: string) {
  return Fire.default
    .firestore()
    .collection("Events-WEB")
    .doc(Event)
    .update({ creator: User })
    .then((res: any) => genMessage(true, "Successfully transfer an event"))
    .catch((err: any) => genMessage(false, "Failed to transfer an event"));
}

async function getEventsForManager(user: string) {
  return Fire.default
    .firestore()
    .collection("Events-WEB")
    .where("creator", "==", user)
    .get()
    .then((res: any) =>
      genMessage(
        res.docs.map((x: any) => x.data()),
        "All events that the current user manages"
      )
    )
    .catch((err: any) =>
      genMessage(err, "Failed to get all events the user manages")
    );
}

async function getEventMembers(event: string) {
  let users = await Fire.default
    .firestore()
    .collection("Events-WEB")
    .doc(event)
    .get();
  let data = (await users.data()) as any;
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
  event: string
) {
  let signin: any[] = [];
  async function inner() {
    users.forEach((user) => {
      if (user.signin === true) {
        signin.push(user.user);
      }
      Fire.default
        .firestore()
        .collection("Users-WEB")
        .doc(user.user)
        .update({ points: user.points });
    });
    Fire.default
      .firestore()
      .collection("Events-WEB")
      .doc(event)
      .update({ signin });
  }
  return inner()
    .then((res: any) => genMessage(res, "Updated members for events"))
    .catch((err: any) => genMessage(err, "Failed to updated events"));
}

// TODO EMAIl

export {
  newEvent,
  updateEvent,
  getAllEvents,
  deleteEvent,
  transferEvent,
  getEventsForManager,
  getEventMembers,
  memberEventUpdate,
  RSVP,
};
