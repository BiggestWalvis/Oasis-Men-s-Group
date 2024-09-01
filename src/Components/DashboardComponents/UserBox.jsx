import React, { useEffect } from "react";

import "../../CSSelements/UserBox.css"
import { Checkbox } from "@mui/material";
import { db } from "../../firebase.config";
import { doc, updateDoc } from "firebase/firestore";



export default function UserBox(props) {

    const [checked, setChecked] = React.useState(props.recorded)
    
    function updateFirestore() {
        if (checked === true) {
        updateDoc(doc(db, "checkIn", props.id), {
                    recorded: true})
        }else{
            updateDoc(doc(db, "checkIn", props.id), {
                recorded: false})
        }
    }
    
    function updateChecked() {
        setChecked((prevState) => !prevState)
    }
      

    let lastName = props.lastName
    lastName = lastName.replace(/\s+/g, '')

    useEffect(() => {
        updateFirestore()
    },[checked])
    
    return(
        <div className="UserBox--container">
            <p className="name">
                {lastName}, {props.firstName}
            </p>
            <Checkbox 
                className="recorded-btn"
                checked={checked}
                onChange={updateChecked}
            >
            </Checkbox>
        </div>
    )
}