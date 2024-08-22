import React, { useEffect } from 'react'
import { checkInCollection, auth, signInAnonymously, currentDate } from '../firebase.config';
import { getDocs, query, setDoc, where, doc } from 'firebase/firestore';
import PhoneInput from 'react-phone-number-input/input';

import 'react-phone-number-input/style.css'
import '../CSSelements/CheckIn.css'

export default function CheckIn() {
    const [firstName, setFirstName] = React.useState("")
    const [lastName, setLastName] = React.useState("")
    const [phone, setPhone] = React.useState("")
    const [checkInSuccess, setCheckInSuccess] = React.useState(false)
    
    const date = new Date().toISOString().split('T')[0]


    const submitData = async (e) => {
        e.preventDefault()
        if (firstName === "" || lastName === "" || phone === ""){
            alert("Please fill in all fields")
        }else{

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
                                                        date: date,
                                                        newGuy: "false",
                                                        id: docRef.id
                                    })
                            //if old user, then create new checkIn document with newGuy set to false
                                }else {
                                    setDoc(doc(checkInCollection, docRef.id),{
                                                        firstName,
                                                        lastName,
                                                        phone: phone,
                                                        date: date,
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
            setCheckInSuccess(true)
            setFirstName("")
            setLastName("")
            setPhone("")
        }    
    }

    function handleClick() {
        setCheckInSuccess(false)
    }



    return(
        <div className='div--CheckIn--Container'>
            <form className='form--main'>
                <h1 className='main--title'>Check-In</h1>
                {checkInSuccess === false ? 
                    <div className='checkInSuccess--container'>
                        <label className="checkIn--label" htmlFor='first-name'>First Name</label>
                        <input 
                            type="text" 
                            id='first-name'
                            className='checkIn--textBox'
                            minLength="2"
                            value={firstName}
                            onChange={(item) => setFirstName(item.target.value)}
                            required
                        ></input>
                        <label className="checkIn--label" htmlFor='last-name'>Last Name</label>
                        <input 
                            type="text" 
                            id='last-name'
                            className='checkIn--textBox'
                            minLength="2"
                            value={lastName}
                            onChange={(item) => setLastName(item.target.value)}
                            required
                        ></input>
                        <label className="checkIn--label" htmlFor='phone'>Phone Number</label>
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
                    </div>
                    :
                    <div className='checkInSuccess--container'>
                        <h2>You have Successfully Checked In</h2>
                        <button
                            className='resetCheckInSuccess'
                            type='button'
                            onClick={handleClick}
                        >
                            Return to Login
                        </button>
                    </div>
                }
            </form>
        </div>
    )
}