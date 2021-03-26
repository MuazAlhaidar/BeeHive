import {firebase} from "./config.js"


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
        console.log(firebase)
        console.log("0-------------------")
        var user = firebase.app().auth();
        let email = user?.currentUser?.email
        return firebase.firestore().collection('Events').doc().set({
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
async function update(
        id: string,
        email:   string,
        title: undefined | string,
        desc: undefined | string,
        address: undefined | string,
        date:  undefined | string,
        time: undefined | string
) {
        return firebase.firestore().collection('Events').doc(id).set({
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
        return firebase.firestore().collection("Events").get()
        .then(res=>res.docs.map(x=> x.data()))
        .catch(res=>res)
}


// Only returns true
async function Delete(_id: string) {
        return firebase.firestore().collection("Events").doc(_id).delete()
        .then((res) => genMessage(res, "Deleted"))
        .catch((res) => genMessage(res, "Failed to delete event"))
}

async function RSVP(id:string, email:string){
        firebase.firestore().collection('Events').doc(id).update(
                {"RSVP": firebase.firestore.FieldValue.arrayUnion(email)})

}




async function Transfer(Event: string, User: string) {
        return firebase.firestore().collection("Events").doc(Event).update({manager:User})
        .then((res) => genMessage(true, "Successfully transfer an event"))
        .catch((err) => genMessage(false, "Failed to transfer an event") );
}

async function getEventManager(user:string) {
        return firebase.firestore().collection("Events").where('manager', '==', user).get()
        .then(res=> genMessage(res.docs.map(x=>x.data()), "All events that hte current user manages"))
        .catch(err=> genMessage(err, "Failed to get all events the usert manages"))
}

async function getMembers(event:string){
        let users = await firebase.firestore().collection("Events").doc(event).get()
        let data = users.data()  as any
        let promises = data["SignIn"].map(async (user:any)=>{
                let tmp = await firebase.firestore().collection("Users").doc(user).get()
                return tmp.data()
        })
        return Promise.all(promises)
        .then(res=>genMessage(res, "All members for an event"))
        .catch(err=>genMessage(err, "Failed to get lal members for an event"))
}

async function memberEventUpdate(users:[{user:string, points:number, signin:boolean}], event:string){
        let signin:any[]=[]
        async function inner(){
                users.forEach(user=>{
                        if(user.signin == true){ signin.push(user.user)}
                        firebase.firestore().collection("Users").doc(user.user).update({userPoints:user.points})
                })
                firebase.firestore().collection("Events").doc(event).update({SignIn:signin})
        }
        return inner()
        .then(res=>genMessage(res, "Updated members for events"))
        .catch(err=>genMessage(err, "Failed to updated events"))
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
