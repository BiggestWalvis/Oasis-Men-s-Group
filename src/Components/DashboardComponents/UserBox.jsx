import React from "react";

import "../../CSSelements/UserBox.css"



export default function UserBox(props) {

let lastName = props.lastName
lastName = lastName.replace(/\s+/g, '')

    return(
        <div className="UserBox--container">
            <p className="name">
                {lastName}, {props.firstName}
            </p>
        </div>
    )
}