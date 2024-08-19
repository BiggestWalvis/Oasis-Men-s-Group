import React, { useEffect } from 'react'
import { checkInCollection, auth, signInAnonymously } from '../firebase.config';
import { getDocs, query, setDoc, where, doc } from 'firebase/firestore';

import '../CSSelements/CheckIn.css'

export default function CheckIn() {
    const [firstName, setFirstName] = React.useState("")
    const [lastName, setLastName] = React.useState("")
    const [phone, setPhone] = React.useState("")
    
    const date = new Date().toISOString().split('T')[0]


    const submitData = async (e) => {
        e.preventDefault()

        signInAnonymously(auth).then(() => {
            console.log("before try")
        try{
        //pull all documents that match the checkin information
            const checkForDocs = async () => {
                console.log("checkForDocs")
                const q = query(checkInCollection,
                                        where(`phone`, `==`, `${phone}`))
                console.log("checkForDocs2")
                await getDocs(q).then((snapshot) => {
                            //look in each document for an old guy
                            console.log("checkForDocs3")
                            let isNewGuy = ""
                                snapshot.docs.forEach((doc) => {
                                    if (doc.data().newGuy === "false") {
                                        isNewGuy = "false"
                                    }
                                console.log(isNewGuy)
                               })
                            const docRef = doc(checkInCollection)
                            if(isNewGuy === "false"){
                                setDoc(doc(checkInCollection, docRef.id),{
                                                    firstName,
                                                    lastName,
                                                    phone,
                                                    date,
                                                    newGuy: "false",
                                                    id: docRef.id
                                })
                        //if old user, then create new checkIn document with newGuy set to false
                            }else {
                                setDoc(doc(checkInCollection, docRef.id),{
                                                    firstName,
                                                    lastName,
                                                    phone,
                                                    date,
                                                    newGuy: "true",
                                                    id: docRef.id
                                })
                            }
                    })
                
            }
            checkForDocs()
        //if no documents match the checkin information, we have a new guy                    
        }catch(err){
            console.error(err)
            setIsNewGuy("true")
        }
    })
    alert("You have Checked In!")
    }



    return(
        <div className='div--CheckIn--Container'>
            <form className='form--main'>
                <h1 className='main--title'>Check-In</h1>
                <label htmlFor='first-name'>First Name</label>
                <input 
                    type="text" 
                    id='first-name'
                    className='checkIn--textBox'
                    minLength="2"
                    value={firstName}
                    onChange={(item) => setFirstName(item.target.value)}
                    required
                ></input>
                <label htmlFor='last-name'>Last Name</label>
                <input 
                    type="text" 
                    id='last-name'
                    className='checkIn--textBox'
                    minLength="2"
                    value={lastName}
                    onChange={(item) => setLastName(item.target.value)}
                    required
                ></input>
                <label htmlFor='phone'>Phone Number</label>
                <input 
                    type="tel" 
                    id='phone'
                    minLength="10"
                    maxLength="10"
                    className='checkIn--textBox'
                    value={phone}
                    onChange={(item) => setPhone(item.target.value)}
                    required
                ></input>
                <button 
                    className="button-submit" 
                    type='submit'
                    onClick={submitData}>
                        Submit
                </button>
            </form>
        </div>
    )
}