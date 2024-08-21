import React, { useEffect } from 'react'
import { checkInCollection, auth, signInAnonymously } from '../firebase.config';
import { getDocs, query, setDoc, where, doc } from 'firebase/firestore';
import PhoneInput from 'react-phone-number-input/input';

import 'react-phone-number-input/style.css'
import '../CSSelements/CheckIn.css'

export default function CheckIn() {
    const [firstName, setFirstName] = React.useState("")
    const [lastName, setLastName] = React.useState("")
    const [phone, setPhone] = React.useState("")
    
    const date = new Date().toISOString().split('T')[0]


    const submitData = async (e) => {
        e.preventDefault()

        signInAnonymously(auth).then(() => {
        try{
        //pull all documents that match the checkin information
            const checkForDocs = async () => {
                const q = query(checkInCollection,
                                        where(`phone`, `==`, `${phone}`))
                await getDocs(q).then((snapshot) => {
                            //look in each document for an old guy
                            let isNewGuy = ""
                                snapshot.docs.forEach((doc) => {
                                    if (doc.data().newGuy === "false") {
                                        isNewGuy = "false"
                                    }
                               })
                            const docRef = doc(checkInCollection)
                            if(isNewGuy === "false"){
                                setDoc(doc(checkInCollection, docRef.id),{
                                                    firstName,
                                                    lastName,
                                                    phone: phone,
                                                    date,
                                                    newGuy: "false",
                                                    id: docRef.id
                                })
                        //if old user, then create new checkIn document with newGuy set to false
                            }else {
                                setDoc(doc(checkInCollection, docRef.id),{
                                                    firstName,
                                                    lastName,
                                                    phone: phone,
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
    setFirstName("")
    setLastName("")
    setPhone("")
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
                <PhoneInput 
                    id='phone'
                    defaultCountry="US"
                    minLength='10'
                    className='checkIn--textBox'
                    placeholder='(555) 123-4567'
                    value={phone}
                    onChange={(item)=>setPhone(item)}
                    required
                />
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