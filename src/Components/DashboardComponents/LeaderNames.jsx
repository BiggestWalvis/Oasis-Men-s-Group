import React from "react";

import "../../CSSelements/LeaderNames.css"
import { registerUser, auth, db } from "../../firebase.config";
import { updateDoc, query, where, collection, 
        getDocs, doc, deleteDoc, setDoc } from "firebase/firestore";

export default function LeaderNames(props) {

    const [results, setResults] = React.useState("")

    function updateSelection(input) {
        setResults(input)
    }

    async function submitRequestResult(id) {
        try{
            if(results==="approve"){
                //Receive id from parrent component. 
                //Use id to update the document and update the role
                    const docRef = doc(db, "users", props.id)
                    updateDoc(docRef, {
                        role: "Leader"
                    })
            }else{
            //delete document and remove user
                await setDoc(doc(db, "toDelete", `${props.firstName} ${props.lastName}`), {
                    firstName: props.firstName,
                    lastName: props.lastName,
                    email: props.email,
                    phone: props.phone,
                })
                await deleteDoc(doc(db, "users", props.id))
                console.log(results)
            }
        }catch(err){
            console.error(err)
            alert("You do not have permission for this action")
        }
    }
    
    
    return(
        <div className="LeaderNames--container">
            <div className="LeaderNames--pulledData">  
                <p className="LeaderNames--name">
                    {props.firstName} {props.lastName} would like to become a Leader
                </p>
                <p className="LeaderNames--contactInfo">
                    Email: {props.email}<br />
                    Phone: {props.phone}
                </p>
            </div>
            <form className="LeaderNames--form">
                <div className="LeaderNames--radio">
                    <label>
                        <input 
                            className="radio--btn"
                            type="radio"
                            id="option1"
                            value="approve"
                            checked={results === "approve"}
                            onChange={() => updateSelection("approve")}
                        />Approve Request
                    </label>
                </div>    
                <div className="LeaderNames--radio"> 
                    <label>
                        <input 
                            className="radio--btn"
                            type="radio"
                            id="option2"
                            value="deny"
                            checked={results === "deny"}
                            onChange={() => updateSelection("deny")}
                        />Deny Request
                    </label>
                </div>
                <button 
                    className="LeaderNames--btn"
                    type="button"
                    onClick={() => submitRequestResult(props.id)}
                >Submit
                </button>
            </form>
        </div>
    )
}