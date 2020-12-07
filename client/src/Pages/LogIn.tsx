import React from "react";
import LogoAndTitle from "../Components/LogoAndTitle";
import LogInPanel from "../Components/LogInPanel";
import SignUpButton from "../Components/SignUpButton";

import { Link, Redirect } from "react-router-dom";
import "../CSS/LogIn.css";
type UserType = {username: string, password:string}

function LogIn(props:{setName:any}) {
        const [user, setUser] = React.useState("");
        const [status, setStatus] = React.useState(0);
        var listUsers = [{username:"user", password:"pass"}, {username: "admin", password:"pass"}]
        let Users = new Map([
                ['user' , 'pass']
                ,['admin' , 'pass']
                ,['Monier' , 'Motorsport 7']
        ]);

        function checkuser(username:string, password:string):boolean{
                if(Users.get(username) == password){
                        setUser(username);
                        setStatus(1)
                        props.setName(username);
                        return true;
                }
                else{
                        setStatus(-1)
                        return false;
                }
        }

        function displaystatus(){
                switch(status){
                        case 0:
                                return(<h1> Identify yourself </h1>)
                        break;
                        case -1:
                                return(<h1> Failed hacker </h1>)
                        break;
                        case 1:
                                return(<div> <h1> Welcome {user} </h1> <Redirect push to= "/" /> </div>)
                        break;
                }
        }

        return (
                <div className="Login">
                        {displaystatus() }
                        <div className="Login-Top">
                                <div className="Login-TitleAndLogo">
                                        <LogoAndTitle />
                                </div>
                                <div className="Login-SignUpButton">
                                        <SignUpButton />
                                </div>
                        </div>
                        <div className="Login-LoginPanel">
                                <LogInPanel changeUser={ checkuser } />
                        </div>
                </div>
        );
}

export default LogIn;
