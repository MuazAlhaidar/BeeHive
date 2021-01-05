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


async function new_user( user:any ){
    return axiosPost("new",  {
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
		    // console.log(user, err.response.data)
		    return [1, undefined];
		case 402:
		    return [2, undefined];
		case 403:
		    return [-1,undefined];
		default:
		    return err.response.status
	    }
	})

}

async function reset_password(_email:string){
    return axiosPost("reset_request", {email:_email})
	.then(ret =>  true )
	.catch(ret => false )

}

async function reset_token(_token:string, _newpass:string){
    return axiosPost("reset_token",{token:_token, password:_newpass} )
	.then(res => true)
	.catch(res => false)

}


export {axiosPost,axiosGet,  login,new_user,reset_password, reset_token}
// module.exports= { login,new_user,reset_password, reset_token}

