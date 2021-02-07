const User = require("../users/API.ts");

const _user="user"+new Date();
const _email="email"+new Date();
// const _email =a.getMonth()+"."+a.getDate()+"."+a.getFullYear()+"."+a.getHours()+""+a.getMinutes()+"@gmail.com"
const realmail = "zakahmed@umich.edu"
const realmail2 = "ahmedzakariya355@gmail.com"
const realmail3 = "graphinetime@gmail.com"
const _pass="pass"+new Date();
function genrandom(credintals:any={}){
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
        return user
}
function gentoken(email){
        return email+"zaki"
}

test("Add new user and login", done =>{
        User.new_user({username:_user, email:_email, password:_pass, role_id:2, points:5 })
        .then(() =>{
                User.login(_user, _pass)
                .then(res=>{
                        expect(res).not.toBe(-1)
                        done();
                })
                .catch(err => done(err))
                User.login("other", "meme")
                .then(res=>{
                        expect(res).toBe(-1)
                        done();
                })
                .catch(err => done(err))
        })
        .catch(err => done(err))

});



test("Add existing user failure due to duplicated", done=>{
        User.new_user(genrandom( {username:_user}))
        .then(res => {
                expect(res[0]).toBe(1)
        })
        .catch(err => done(err))
        User.new_user(genrandom({email:_email}))
        .then(res => {
                expect(res[0]).toBe(1)
                done()
        })
        .catch(err => done(err))
})

test("Reset password request", async done=>{
        let tmpuser = await  User.new_user({username: "JOTARIO!!", email:realmail3, password:"Shadow", role_id:0, points:0})
        User.reset_password("MF DOOM")
        .then(res =>  expect(res).toBe(false))
        .catch(err => done(err))

        User.reset_password(realmail3)
        .then(res => {expect(res).toBe(true); done()})
        .catch(err => done(err))

})

test("Reset password token", async done=>{
        let tmpuser = await  User.new_user({username: "Diago", email:realmail2, password:"Shadow", role_id:0, points:0})
        User.reset_password(realmail2)
        .then(async res => {

                User.reset_url(gentoken(realmail2))
                .then(res => { expect(res).toBe(true)})
                .catch(err => done(err))

                User.reset_token("fake token")
                .then(res => { expect(res).toBe(false)})
                .catch(err => done(err))


                done();

        })
        .catch(err => done(err))
})
/*
*/

test("Resetting the password once and for all", async done=>{
        // Once we change password tokenizer, change this
        let tmpuser = await  User.new_user({username: "Diago", email:realmail2, password:"Shadow", role_id:0, points:0})
        let tmp=await User.reset_password(realmail2)
        User.reset_token(gentoken(realmail2),  "dio")
        .then(res => {expect(res).toBe(true)

              User.reset_token(gentoken(realmail),  "FAILURE")
              .then(res => {expect(res).toBe(false); done()})
              .catch(err => done(err))
        })
        .catch(err => done(err))


        /*
           User.reset_token(gentoken(_email), "BAD MAN")
           .then(res => {expect(res).toBe(false); done()})
           .catch(err => done(err))
           */
})
/*
*/
