const axios = require("axios")
// Change port to be dynamic,
let baseurl = "http://localhost:4200/api/events/";

async function axiosGet(url:string, _data:any){
    return axios.get(baseurl+url, {params: _data})
}
async function axiosPost(url:string, _data:any){
    return axios.post(baseurl+url,   _data , {headers:{'Content-Type':'application/json'}})
}


async function newEvent(name:string, desc:string, address:string, time:Date, manager:number):Promise<Boolean>{
    return axiosPost("new", {Name:name,  Description:desc, Address:address, Time:time, Manager:manager})
	.then(ret => true)
	.catch(err =>  false)
}

async function getEvent(_id:number){
    // return axios.get(baseurl+"get", {params:{
    // 	id:_id
    // }})
    
    return axiosGet("get", {id:_id})
	.then(res => res)
	.catch(err =>  {console.log(err); {}} )
    
}

async function update(_id:number, _name:undefined|string, _desc:undefined|string, _address:undefined|string, _time:undefined|Date, _manager:undefined|number){
    return axiosPost("update", {id:_id, Name:_name,  Description:_desc, Address:_address, Time:_time, Manager:_manager})
	.then(res => res)
	.catch(err => {console.log(err); {}})
}

export {axiosGet, axiosPost, newEvent, getEvent, update}
// module.exports= { login,new_user,reset_password, reset_token}

