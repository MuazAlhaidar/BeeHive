
const axios = require("axios");
// Change port to be dynamic,

async function axiosPostE(url: string, _data: any) {
        let baseurl = "http://localhost:4200/api/events/";
        return axios.post(baseurl + url, _data, {
                headers: { "Content-Type": "application/json" },
        });
}

async function newEvent(
        name: string,
        desc: string,
        address: string,
        time: Date,
        manager: number
) {
        return axiosPostE("new", {
                Name: name,
                Description: desc,
                Address: address,
                Time: time,
                Manager: manager,
        })
        .then((ret) => {
                console.log(ret)
                return ret.data;
        })
        .catch((err) => {
                console.log("FAIL")
                return undefined;
        });
}


async function axiosPostU(url:string, _data:any){
        let baseurl = "http://localhost:4200/api/users/";
        return axios.post(baseurl+url,   _data , {headers:{'Content-Type':'application/json'}})
}
async function new_user( user:any ){
        return axiosPostU("new",  {
                username:user.username,
                password:user.password,
                email:user.email,
                role_id:user.role_id,
                points:user.points 
        })
        .then(ret => {return [0, ret.data.id]})
        .catch((err:any)=>{
                switch(err.response.status){
                        case 401:
                                return [1, undefined];
                        case 402:
                                return [2, undefined];
                        case 403:
                                return [3,undefined];
                        default:
                                return err.response.status
                }
        })

}

new_user({username:"Zaki", password:"pass", email:"Zaki@gmail.com", role_id:0, points:0})
new_user({username:"Muaz", password:"pass", email:"Muaz@gmail.com", role_id:0, points:0})
new_user({username:"Kevin", password:"pass", email:"Kevin@gmail.com", role_id:0, points:0})
new_user({username:"Monier", password:"pass", email:"Monier@gmail.com", role_id:0, points:0})

newEvent("Zaki", "ABCD", "1234", new Date(), 1)
newEvent("Muaz", "", "", new Date(), 1)
newEvent("Kevin", "", "", new Date(), 2)
newEvent("Monier", "", "", new Date(), 3)
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
console.log("WOOOOOOOOOOOOOOOOOOO");
