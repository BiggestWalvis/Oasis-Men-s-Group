import { collection, query, getDocs, doc, where } from "firebase/firestore";
import React, { useEffect } from "react";
import { auth, db } from "../../firebase.config";

import LeaderNames from "./LeaderNames";

import "../../CSSelements/LeaderAccountRequests.css"

export default function LeaderAccountRequests(){

//get all documents in "users" that are requesting access
const q = query(collection(db, "users"), where("role", "==", "RequestingAccess"))

//state array to allow for live screen updates
const [requestingAccess, setRequestingAccess] = React.useState([])

//get specific documents, then put all documents in an array
const querySnapshot = getDocs(q)
                        .then((snapshot) => {
                            let leadersArray = []
                            snapshot.forEach((doc) => {
                                leadersArray.push({ ...doc.data(), id: doc.id})
                                })
                        setRequestingAccess(leadersArray)
                        })

    return(
        <div className="dashboard-leader-container">
            <h3>Please Approve or Deny Leader Accounts</h3>
            {requestingAccess.length > 0 ? 
                <div>
                    {requestingAccess.map((tab,index) => (
                    <LeaderNames
                        key={index}
                        firstName={tab.firstName}
                        lastName={tab.lastName}
                        email={tab.email}
                        phone={tab.phone}
                        id={tab.id}
                    />
                    ))}
                </div>
                :
                <p className="title-p">There are no leader accounts to approve</p>
            }
        </div>

    )
}