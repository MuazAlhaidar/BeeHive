const axios = require("axios")
// Change port to be dynamic,
let baseurl = "http://localhost:4200/api/events/";

async function axiosGet(url:string, _data:any){
        // return axios.get(baseurl+url, { data: {_data}  })
        // return axios.get(baseurl+url, { data: _data  }, {headers:{'Content-Type':'application/json'}} )
		return axios.get(baseurl+url, _data,{
			headers:{ 'Content-Type': 'application/json' }
		})


}
async function axiosPost(url:string, _data:any){
        return axios.post(baseurl+url,   _data , {headers:{'Content-Type':'application/json'}})
}


async function newEvent(name:string, desc:string, address:string, time:Date, manager:number):Promise<Boolean>{
        return axiosPost("new", {Name:name,  Description:desc, Address:address, Time:time, Manager:manager})
        .then(ret => true)
        .catch(err =>  false)

}

export {axiosGet, axiosPost, newEvent}
// module.exports= { login,new_user,reset_password, reset_token}

