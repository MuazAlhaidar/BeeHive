
import React from "react";
import {useLocation,useHistory } from "react-router-dom";
import * as API from "../api/User"
import "../CSS/LogInPanel.css";

export default function Request(props:{}){
        const [email, setEmail] = React.useState("");
        const history = useHistory()
        return <div> 
                <h1> What is your email? </h1>
                <form>
                        <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} />
                        <button onClick={(evt) => 
                        {
                                evt.preventDefault()

                                API.reset_password(email, true)
                                .then(res=>{
                                        if(res){
                                                alert("Your request has been done successfully. Check email for the code")
                                                history.push("/")
                                        }
                                        else{
                                                console.log("Invalid email")
                                        }

                                })
                        }}> Submit Request? </button>
                </form>
                </div>



}

