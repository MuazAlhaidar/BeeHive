// import {newDoc, updateDoc, getDoc, query, getDocsSub, update } from "./Firebase"
import {login} from "User"
import {newEvent} from "Event"
// subquery("Events-WEB", "", "")
// .then(res=>{
//         res.docs.forEach(x=>{
//                 console.log(x.data())
//         })
// })
// .catch(res=>{
//         console.log(res)
// })

// newDoc("Events-WEB", {address:"My house", date:new Date(), description:"WOW", rsvp:["ahmedzakariya355@gmail.com"], signin:[], title:"East SIDE"}, "title")
// getDoc("Events-WEB")
// getDocsSub("Events-WEB", "Users-WEB", "rsvp", "email", "owner","ahmedzakariya355@gmail.com")


.then(res=>{
        res.forEach((entry:any)=>{
                console.log(entry)

        })

})

.catch(res=>{
        console.log(res)
})
