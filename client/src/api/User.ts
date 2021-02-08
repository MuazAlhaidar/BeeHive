const axios = require("axios")
// Change port to be dynamic,
let baseurl = "http://localhost:4200/api/users/";

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

async function login(_username:string, _password:string){
        // return axiosPost("login", { username:_username, password:_password} )
        return axiosPost("login", { username:_username, password:_password} )
        .then(() => {  return true })
        .catch(() => {  return false })
}

async function new_user( credintals:{username:string, password:string, email:string, role_id:number, points:number} ){
        var user  = { username:credintals["username"], password:credintals["password"], email:credintals["email"], role_id:credintals["role_id"], points:credintals["points"], }
        // for(let key in user){
        //         if(user[key] === undefined && key!=="points" && key!=="role_id"){
        //                 // Maybe chagne size/length?
        //                 user[key]= Math.random().toString(36);
        //         }
        //         else if(user[key] === undefined){
        //                 user[key]=Math.floor( Math.random()*(10-0)+0)
        //         }

        // }
        return axios.post(baseurl+"users/new",{
                username:user.username,
                password:user.password,
                email:user.email,
                role_id:user.role_id,
                points:user.points 
        }, {
                headers:{ 'Content-Type': 'application/json'}
        })
        .then(() => {return 0})
        .catch((err:any)=>{
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

async function reset_password(_email:string){
        return axiosPost(baseurl+"users/reset_request", {email:_email})
        .then(ret =>  true )
        .catch(ret => false )

}

async function reset_token(_token:string, _newpass:string){
        return axiosPost(baseurl+"users/reset_token",{token:_token, password:_newpass} )
        .then(res => true)
        .catch(res => false)

}

export { login,new_user,reset_password, reset_token}
// module.exports= { login,new_user,reset_password, reset_token}
