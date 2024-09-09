import React from "react";
import "../../CSSelements/RosterBox.css"

export default function RosterBox(props) {


    return(
        <div className="RosterBox--container">
            <p className="name">
                {props.lastName}, {props.firstName}
            </p>
            <p className="Phone">
                {props.phone}
            </p>
        </div>
    )


}