import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import {config} from "./config.js"
firebase.initializeApp(config);
const db = firebase.firestore()
const auth = firebase.auth()
interface Message{
        data:any,
        msg:string|number
}
import * as User from "./User";
function genMessage(_data:any,_msg:any){ return {msg:_msg, data:_data}}
function testFunc(args, func){ 

        User.login("ahmedzakariya355@gmail.com", "passpass")
        .then(()=>{
                func(... args).then(res=>{console.log(res)}).catch(res=>{console.log(res)}) 
        })
}


async function newEvent(
        title: string,
        desc: string,
        address: string,
        date: string,
        time: string,
) {
        var user = firebase.auth();
        let email = user.currentUser.email
        return db.collection('Events').doc().set({
                title: title,
                address: address,
                date: date,
                time: time,
                description: desc,
                manager: email,
                RSVP: [],
                SignIn: []
        })
        .then(res=>genMessage(true, "Made new event"))
        .catch(res=>genMessage(false, "Failed to make an event"))
}
// testFunc(["Title ", "Description", "Address ", "datetiiomf", "timeeeeeeeeeeeeeeeeee"], newEvent)
async function update(
        id: string,
        email:   string,
        title: undefined | string,
        desc: undefined | string,
        address: undefined | string,
        date:  undefined | string,
        time: undefined | string
) {
        return db.collection('Events').doc(id).set({
                title: title,
                address: address,
                date: date,
                time: time,
                description: desc,
                manager: email,
        })
        .then((res) => genMessage(res, "Updated event"))
        .catch((res) => genMessage(res, "Failed to Updated event"))
}


async function getAllEvents() {
        return db.collection("Events").get()
        .then(res=>res.docs.map(x=> x.data()))
        .catch(res=>res)
}


// Only returns true
async function Delete(_id: string) {
        return db.collection("Events").doc(_id).delete()
        .then((res) => genMessage(res, "Deleted"))
        .catch((res) => genMessage(res, "Failed to delete event"))
}

async function RSVP(id:string, email:string){
        db.collection('Events').doc(id).update(
                {"RSVP": firebase.firestore.FieldValue.arrayUnion(user)}
        )

}
testFunc(["zDvWlry3UyTmULVOVOGd", "Zaki"], RSVP)

/*

   async function Invite(_Event: number, _Users: [number]) {
   return axiosPost("invite", { Event: _Event, Invited: _Users })
   .then((res) => true)
   .catch((err) => false);
   }

   async function Signin(_Event: number, _User: number) {
   return axiosPost("signin", { Event: _Event, User: _User })
   .then((res) => true)
   .catch((err) => {
   return false;
   });
   }

   async function Transfer(_Event: number, MainUser:number, _User: number) {
   return axiosPost("transfer", { Event: _Event, Main:MainUser, Manager: _User })
   .then((res) => true)
   .catch((err) => false );
   }

   async function getEventManager(_id: number) {
   return axiosPost("man", { id: _id })
   .then((res) => res.data)
   }
   async function get_members(){return axiosPost("get_members", {})};

   async function checkRSVP(_event:number, _user:number){
   return axiosPost("rsvp", {Event:_event, User:_user})
   .then(res=>{ return res.data})
   .catch(err=>{console.log(err);return undefined})
   }

   async function update_points(_users:[any]){
   return axiosPost("update-points", {users:_users})
   .then(res=>true)
   .catch(res=>false)
   }


   export {
   axiosGet,
   axiosPost,
   newEvent,
   getEvent,
   update,
   getAllEvents,
   Delete,
   Invite,
   Signin,
   Transfer,
   getEventManager,
   get_members,
   checkRSVP,
   update_points
   }
// module.exports= { login,new_user,reset_password, reset_token}
*/
console.log("---------------------")
