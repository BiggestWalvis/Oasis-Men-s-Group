import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from "react-router-dom"
import { auth, db, registerUser } from "../firebase.config"
import { doc, setDoc, addDoc,collection, getDocs, query, where } from 'firebase/firestore';

import '../CSSelements/LeaderRegister.css'

export default function LeaderRegister(props) {

//variables to determine user auth
    const [user, loading, error] = useAuthState(auth)

//state variables that are determined by user inputs
    const [firstName, setFirstName] = React.useState("")
    const [lastName, setLastName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [phone, setPhone] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")

//variable used to determine what is shown on the screen
    let notRegistered = true

//function to validate password 
//and to register the user if everything is in order
    const register = async (e) => {
        if (password !== confirmPassword) {
            alert("Your password does not match")
        }else {
            e.preventDefault()
            await registerUser(firstName, lastName, email, phone, password)
    //set variable to false to change what is shown on the screen
            notRegistered = false
            }
        }

//variable used to navigate to different pages
    const navigate = useNavigate()    

//Do nothing if the page is loading. 
//If it isn't loading, then send to dashboard
    useEffect(() => {
        if (loading) return
        if (user) navigate("/login")

    }, [user, loading])


    return(
        <div className='div--Register--container'>
            {notRegistered ? <div>
                <form className='form--main'>
                    <h1 className='main--title'>Leader Sign-up Request</h1>
                    <label htmlFor='firstName'>First Name</label>
                    <input 
                        type="text" 
                        id='firstName' 
                        className='register--textBox'
                        value={firstName}
                        onChange={(item) => setFirstName(item.target.value)}
                        required>
                    </input>
                    <label htmlFor='lastName'>Last Name</label>
                    <input 
                        type="text" 
                        id='lastName' 
                        className='register--textBox'
                        value={lastName}
                        onChange={(item) => setLastName(item.target.value)}
                        required>
                    </input>
                    <label htmlFor='email'>Email</label>
                    <input 
                        type="email" 
                        id='email' 
                        className='register--textBox'
                        value={email}
                        onChange={(item) => setEmail(item.target.value)}
                        required>
                    </input>
                    <label htmlFor='email'>Phone Number</label>
                    <input 
                        type="phone" 
                        id='phone' 
                        className='register--textBox'
                        value={phone}
                        onChange={(item) => setPhone(item.target.value)}
                        required>
                    </input>
                    <label htmlFor='password'>Password</label>
                    <input 
                        type="password" 
                        id='password' 
                        className='register--textBox'
                        value={password}
                        onChange={(item) => setPassword(item.target.value)}
                        required>
                    </input>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input 
                        type="password" 
                        id='confirmPassword' 
                        className='register--textBox'
                        value={confirmPassword}
                        onChange={(item) => setConfirmPassword(item.target.value)}
                        required>              
                    </input>
                    <button 
                        className="button-submit" 
                        type='submit'
                        onClick={register}
                        >
                            Submit
                    </button>
                </form>
                <div className='helpLinks--text'>
                    Already have an account? <Link className={'helpLinks--link'} to="/login">Login</Link> now.
                </div>
            </div>
            :
            <h3>You have Requested an Account</h3>
            }
        </div>
    )
}