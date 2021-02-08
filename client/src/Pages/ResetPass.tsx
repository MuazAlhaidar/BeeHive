import React from "react";
import {useLocation, useHistory} from "react-router-dom";
import * as API from "../api/User"
import "../CSS/LogInPanel.css";

export default function Display(props:{}){
        const [status, setStatus] = React.useState(0);
        const search = useLocation().search
        const token = new URLSearchParams(search).get('token');
        const request =  API.reset_url(""+token)
        .then(res=>{
                if(res){
                        setStatus(1)
                }
                else{
                        setStatus(-1)
                }
        })
        switch(status){
                case 0:
                        return <> </>
                break;
                case 1:
                        return <>
                                <h1> Reset your password </h1>
                                <ResetPassword token={token}/>
                        </>
                        break;
                        case -1:
                                return <> 
                                        <h1> Your reset pasword token does not show up </h1> </>
                                        break;
                                        default:
                                                return <> </>
        }
}

function ResetPassword(props:{token:any}){
        const [password, setPassword] = React.useState("");
        const history = useHistory()

        return (
                <div className="LoginPanel">
                        <form>
                                <p className="LoginPanel-InputTitle">Password</p>
                                <input
                                        className="LoginPanel-Input"
                                        type="password"
                                        id="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                />
                        </form>
                        <div className="LoginPanel-Buttons">
                                <button className="LoginPanel-Login"  onClick={() => {
                                        API.reset_token(props.token, password)
                                        .then(res =>{
                                                console.log(res)
                                                if(res==true){
                                                        alert("Successfully changed password")
                                                        history.push("/")
                                                }
                                                else{
                                                        alert("Unexpected error")
                                                        history.push("/")
                                                }


                                        })
                                        .catch(err =>{
                                                alert("Unexpected error")
                                                history.push("/")
                                        })
                                }} > Reset Password </button>
                        </div>
                </div>
        );
}
