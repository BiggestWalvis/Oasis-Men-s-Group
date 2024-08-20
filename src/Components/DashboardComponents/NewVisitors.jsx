import React, { useEffect } from "react"
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { auth, db, currentDate } from "../../firebase.config";

import "../../CSSelements/NewVisitors.css"

//create a card for each user that checked in on the checkIn screen
//who is a new user
export default function NewVisitors() {
    //state arrays for new guy data
    const [newGuyArray, setNewGuyArray] = React.useState([])
    const [newGuyUpdate, setNewGuyUpdate] = React.useState(true)
    
    //find all documents in checkIn with a newGuy tag
    const visitorQuery = query(collection(db, "checkIn"),
                            where('newGuy', '==', `true`))

    //put all the documents with a newguy tag into a state array
    function gatherData() {
        getDocs(visitorQuery)
            .then((snapshot) => {
                let newGuys = []
                snapshot.docs.forEach((doc) => {
                    newGuys.push({ ...doc.data(), id: doc.id})
                })
                setNewGuyArray(newGuys)
            })
    }
    //set the newguy tag to false, 
    //in order to notify all users that the new guy has been reached out to
    const notNewGuy = (input) => {
        updateDoc(doc(db, "checkIn", input), {
                    newGuy: "false"      
        })
        setNewGuyUpdate(prevState => !prevState)
        return
    }

    useEffect(() => {
        gatherData()
    }, [newGuyUpdate])

    return(
        <div className="newGuys--container">
            <h3 className="newGuys--title">New Visitors:</h3>
            {newGuyArray.map((tab, index) => (
                <div className="newGuy--element" key={index}>  
                    <div className="newGuy--info">
                        <p className="newGuy--text">Name: {tab.firstName} {tab.lastName}</p>
                        <p className="newGuy--text">Phone #: {tab.phone}</p>
                        <p className="newGuy--text">Attended: {tab.date}</p>
                    </div>
                    <button 
                        className="newGuy--btn"
                        onClick={() => notNewGuy(tab.id)}
                    >
                        I have reached out to the new guy
                    </button>
                </div>
            ))}
        </div>
    )
}

