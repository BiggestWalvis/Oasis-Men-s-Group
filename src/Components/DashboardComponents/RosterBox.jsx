import React from "react";
import "../../CSSelements/RosterBox.css"

export default function RosterBox(props) {

let lastName = props.lastName
lastName = lastName.replace(/\s+/g, '')

    return(
        <div className="RosterBox--container">
            <p className="name">
                {lastName}, {props.firstName}
            </p>
            <p className="Phone">
                {props.phone}
            </p>
        </div>
    )


}