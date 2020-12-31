const axios = require("axios")
// Change port to be dynamic,
let baseurl = "http://localhost:4200/api/";

async function axiosGet(url, _data){
        return axios.get(url, { data: _data  })
}
async function axiosPost(url, _data){
        return axios.post(url, {  _data  }, {headers:{'Content-Type':'application/json'}})
}

async function login(_username, _password){
        var ret=true
        return axios.get(baseurl+"users/login", {
                data:{
                        username:_username,
                        password:_password
                }

        })
        .then(() => {  return true })
        .catch(() => {  return false })
}

async function new_user( credintals={}){
        var user  = { username:credintals["username"], password:credintals["password"], email:credintals["email"], role_id:credintals["role_id"], points:credintals["points"], }
        for(let key in user){
                if(user[key] === undefined && key!=="points" && key!=="role_id"){
                        // Maybe chagne size/length?
                        user[key]= Math.random().toString(36);
                }
                else if(user[key] === undefined){
                        user[key]=Math.floor( Math.random()*(10-0)+0)
                }

        }
        return axios.post(baseurl+"users/new",{
                username:user.username,
                password:user.password,
                email:user.email,
                role_id:user.role_id,
                points:user.points 
        }, {
                headers:{ 'Content-Type': 'application/json'}
        })
        .then(res => {return 0})
        .catch(err=>{
                switch(err.response.status){
                        case 401:
                                return 1;
                        case 402:
                                return 2;
                        case 403:
                                return -1;
                        default:
                                return err.response.status
                }
        })

}

async function reset_password(_email){
        axiosGet(baseurl+"users/reset_request", {email:_email})
        .then(ret => console.log("Beat box"))
        .catch(ret => console.log("FANCY CLOWN"))

}

new_user({username:"MF DOOM", email:"1"})
reset_password("2")

