import React from "react";
import { sendPasswordReset } from "../../firebase.config";

export default function MyProfile(props){

    return(
        <div className="profile--container">
            <h3>Personal Profile:</h3>
            <div className="profile--information">
                <p className="profile--p">Name: {props.firstName} {props.lastName}</p>
                <p className="profile--p">Email: {props.email}</p>
                <p className="profile--p">Phone: {props.phone}</p>
                <p className="profile--p">Password:
                    <button 
                        className="profile--resetbtn"
                        onClick={() => sendPasswordReset(props.email)}
                    >Send Password Rest Email
                    </button>
                </p>
            </div>
        </div>
    )
}