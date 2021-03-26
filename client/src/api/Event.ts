import {Fire} from "./config.js"
import "firebase/auth";
import "firebase/firestore";
var chance = require('chance').Chance();




interface Message{
        data:any,
        msg:string|number
}
function genMessage(_data:any,_msg:any){ return {msg:_msg, data:_data}}


async function newEvent(
        title: string,
        desc: string,
        address: string,
        date: string,
        time: string,
) {
        var user = Fire.auth();
        let email = user?.currentUser?.email
        var uuid = chance.string() + chance.string({length: 10})
        return Fire.firestore().collection('Events').doc(uuid).set({
                title: title,
                address: address,
                date: date,
                time: time,
                description: desc,
                creator: email,
                RSVP: [],
                SignIn: []
        })
        .then((res:any)=>genMessage(uuid, "Made new event"))
        .catch((err:any)=>genMessage(false, "Failed to make an event"))
}
async function update(
        id: string,
        title: undefined | string,
        desc: undefined | string,
        address: undefined | string,
        date:  undefined | string,
        time: undefined | string
) {
        return Fire.firestore().collection('Events').doc(id).update({
                title: title,
                description: desc,
                address: address,
                date: date,
                time: time,
        })
        .then((res:any) => genMessage(res, "Updated event"))
        .catch((res:any) => genMessage(res, "Failed to Updated event"))
}


async function getAllEvents() {
        return Fire.firestore().collection("Events").get()
        .then((res:any)=>res.docs.map((x:any)=> x.data()))
        .catch((res:any)=>res)
}


// Only returns true
async function Delete(_id: string) {
        return Fire.firestore().collection("Events").doc(_id).delete()
        .then((res:any) => genMessage(res, "Deleted"))
        .catch((res:any) => genMessage(res, "Failed to delete event"))
}

async function RSVP(id:string, email:string){
        Fire.firestore().collection('Events').doc(id).update(
                {"RSVP": Fire.firestore.FieldValue.arrayUnion(email)})

}




async function Transfer(Event: string, User: string) {
        return Fire.firestore().collection("Events").doc(Event).update({creator:User})
        .then((res:any) => genMessage(true, "Successfully transfer an event"))
        .catch((err:any) => genMessage(false, "Failed to transfer an event") );
}

async function getEventManager(user:string) {
        return Fire.firestore().collection("Events").where('creator', '==', user).get()
        .then((res:any)=> genMessage(res.docs.map((x:any)=>x.data()), "All events that hte current user manages"))
        .catch((err:any)=> genMessage(err, "Failed to get all events the usert manages"))
}

async function getMembers(event:string){
        let users = await Fire.firestore().collection("Events").doc(event).get()
        let data = users.data()  as any
        let promises = data["SignIn"].map(async (user:any)=>{
                let tmp = await Fire.firestore().collection("Users").doc(user).get()
                return tmp.data()
        })
        return Promise.all(promises)
        .then((res:any)=>genMessage(res, "All members for an event"))
        .catch((err:any)=>genMessage(err, "Failed to get lal members for an event"))
}

async function memberEventUpdate(users:[{user:string, points:number, signin:boolean}], event:string){
        let signin:any[]=[]
        async function inner(){
                users.forEach(user=>{
                        if(user.signin == true){ signin.push(user.user)}
                        Fire.firestore().collection("Users").doc(user.user).update({userPoints:user.points})
                })
                Fire.firestore().collection("Events").doc(event).update({SignIn:signin})
        }
        return inner()
        .then((res:any)=>genMessage(res, "Updated members for events"))
        .catch((err:any)=>genMessage(err, "Failed to updated events"))
}


export {
        newEvent,
        update,
        getAllEvents,
        Delete,
        Transfer,
        getEventManager,
        getMembers,
        memberEventUpdate,
        RSVP
}
/*
*/
