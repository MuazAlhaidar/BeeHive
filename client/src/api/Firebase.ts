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
function getid(value:{id:string, data:()=>any}){
        let tmp = value.data()
        tmp["id"]=value.id
        return tmp
}
export async function query(collection, queryTerm=undefined, query=undefined){
        const ref = Fire.default.firestore().collection(collection)
        if(queryTerm!==undefined){
                return ref.where(queryTerm, "==", query).get()
        }
        else{
                return ref.get()
        }

}
export async function newDoc(collection, entry,queryTerm=undefined  ){
        const ref = Fire.default.firestore().collection(collection)
        function makeDoc(entry){
                return ref
                .doc() // We use a title as the ID for an event
                .set(entry)
                .then((res: any) => genMessage(true, "Made a new "+collection))
                .catch((err: any) => genMessage(err, "Failed to make a "+collection));
        }
        if(queryTerm === undefined){
                return makeDoc(entry)
        }
        else {
                let result = await query(collection,  queryTerm, entry[queryTerm])
                if(result.size >0){
                        return genMessage(-1, collection + "  already exist for value " + queryTerm + " which is "  + entry[queryTerm])
                }
                else{
                        return makeDoc(entry)
                } 
        }
}


export async function updateDoc(collection, entry, id, queryTerm=undefined){
        const ref = Fire.default.firestore().collection(collection)
        function updateDoc(id,entry){
                return ref
                .doc(id) // We use a title as the ID for an event
                .update(entry)
                .then((res: any) => genMessage(true, "Updated "+collection))
                .catch((err: any) => genMessage(err, "Failed to update a "+collection));
        }
        if(queryTerm === undefined){
                console.log(queryTerm, "Am i fucking undefined?")
                return updateDoc(id, entry)
        }
        else {
                let result = await query(collection,  queryTerm, entry[queryTerm])
                if(result.size >0){ 
                        // Because we could be updating a key vlaue that already exist, we have to chekc for thisk
                        let found = (result.docs.map(x=>getid(x)))[0]
                        if(found.id === id){
                                return updateDoc(id,entry)
                        }
                        else{
                                return genMessage(-1, collection + "  already exist for value " + queryTerm)
                        }
                }
                else{
                        return updateDoc(id,entry)
                } 
        }

}
export async function getDoc(collection, queryTerm=undefined, cquery=""){
        const ref = Fire.default.firestore().collection(collection)
        function getALLdocs(res){
                return genMessage(res.docs.map((x:any)=>getid(x)), "Got documents for " + collection + " that matches" + cquery)
        }
        let result = await query(collection, queryTerm, cquery)
        return getALLdocs(result)
}

export async function getDocsSub(collection, subcollection, subterm:string, subqueryTerm=undefined, queryTerm=undefined, cquery=undefined){
        let main = await  query(collection, queryTerm, cquery)
        let enteries = main.docs.map(x=>getid(x))
        let tmp= Promise.all(enteries.map( async doc=>{
                let subs= await Promise.all(doc[subterm].map(async entry=>{
                        let found = await query(subcollection, subqueryTerm, entry)
                        // Reason we want [0] is because the query form above
                        // should only return one entyr:
                        // ala we are getting the primary key for thid doc
                        let tmp =  found.docs.map(x=>getid(x))[0]
                        return  tmp
                }))
                doc["."+subterm] = subs
                // return doc
                return doc
        }))
        return tmp
}

export async function update(collection, id, obj){
        const ref = Fire.default.firestore().collection(collection)
        return genMessage(await ref.doc(id).update(obj), "Updated " + collection+"/"+id)
}
export async function delet(collection, id){
        const ref = Fire.default.firestore().collection(collection)
        return genMessage(await ref.doc(id).delete(), "Delete "+collection+"/" + id)
}
