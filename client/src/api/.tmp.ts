import {newDoc, updateDoc, getDoc, query, getDocUser, update } from "./Firebase"
import {login, newUser} from "./User";
import {newEvent, updateEvent, getAllEvents, deleteEvent, transferEvent, getEventsForManager} from "./Event";
// newUser("ahmedzakariya355@gmail.com", "passpass", "Zaki", "Ahmed")
// login("ahmedzakariya355@gmail.com", "passpass")

let graphinetime="J1BDpjN2bfzpICosmbbG"
let zaki="og1pncoW4SdP4Y1LaQYA"
// newEvent(zaki, "THE MOON", "DIO", "MASAKAON", new Date())
// .then(res=>{
//         console.log(res)
// })

// .catch(res=>{
//         console.log(res)
// })
//
// getDocUser("Events-WEB", "rsvp", "creator", zaki)
getEventsForManager(zaki)
.then(res=>{
        console.log(res)
})

.catch(res=>{
        console.log(res)
})
