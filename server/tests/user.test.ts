const User = require("../users/API.ts");

const _user="user"+new Date();
const _email="email"+new Date();
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

test("Add new user and login", done =>{
        User.new_user({username:_user, email:_email, password:_pass, role_id:2, points:5 })
        .then(res =>{
                User.login(_user, _pass)
                .then(res=>{
                        expect(res).toBe(true)
                        done();
                })
                .catch(err => done(err))
                User.login("other", "meme")
                .then(res=>{
                        expect(res).toBe(false)
                        done();
                })
                .catch(err => done(err))
        })
        .catch(err => done(err))

});



test("Add existing user failure due to duplicated", done=>{
        User.new_user(genrandom( {username:_user}))
        .then(res => {
                expect(res).toBe(1)
                done()
        })
        .catch(err => done(err))
        User.new_user(genrandom({email:_email}))
        .then(res => {
                expect(res).toBe(1)
                done()
        })
        .catch(err => done(err))
})

test("Reset password request", done=>{
        User.reset_password("MF DOOM")
        .then(res =>  expect(res).toBe(false))
        .catch(err => done(err))

        User.reset_password(_email)
        .then(res => {expect(res).toBe(true); done()})
        .catch(err => done(err))

})

test("Reset password token", done=>{
        User.reset_password(_email)
        .then(() => {
                User.reset_token("Failure", "Chciekn fruit")
                .then(res => {expect(res).toBe(false); done()})
                .catch(err => done(err))

                // Once we change password tokenizer, change this
                User.reset_token(_email+"chicken", "Chciekn fruit")
                .then(res => {expect(res).toBe(true); done()})
                .catch(err => done(err))

                User.reset_token(_email+"chicken", "Chciekn fruit")
                .then(res => {expect(res).toBe(false); done()})
                .catch(err => done(err))
        })
        .catch(err => done(err))

})
/*
*/

