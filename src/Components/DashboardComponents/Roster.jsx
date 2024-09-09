import { addDoc, collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { checkInCollection, rosterCollection } from "../../firebase.config";
import RosterBox from "./RosterBox";

import "../../CSSelements/Roster.css"

export default function Roster(){

    const [roster, setRoster] = React.useState([])

    const rosterQuery = query(rosterCollection)

// gather roster infromation
    async function gatherData() {
        await getDocs(rosterQuery)
            .then((snapshot) => {
                let rosterList = []
                snapshot.docs.forEach((doc) => {
                    rosterList.push({ ...doc.data(), id: doc.id })
                })
                setRoster(rosterList)
            })
    }
//sort roster information by last name
    roster.sort(function (a,b) {
        if (a.lastName < b.lastName ){
            return -1
        }
        if (a.lastName > b.lastName){
            return 1
        }
        return 0
    })

    useEffect(() => {
        gatherData()
    }, [])


    return(
        <div className="roster--container">
            {roster.map((tab,index) => (
                    <RosterBox 
                        key={index}
                        firstName={tab.firstName}
                        lastName={tab.lastName}
                        phone={tab.phone}
                        id={tab.id}
                    />
            ))}
        </div>

    )
}