import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db, logInWithEmailAndPassword, logout } from "../firebase.config"
import { useAuthState } from "react-firebase-hooks/auth"

import '../CSSelements/LeaderLogIn.css'
import { collection, doc, query, where, getDocs, getDoc } from 'firebase/firestore'

export default function LeaderLogin(props) {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [user, loading, error] = useAuthState(auth)
    
    const navigate = useNavigate()

    //login to firestore db
    const login = async (email, password) => {
        await logInWithEmailAndPassword(email, password)
    }
    //get user role from firestore db
    const getRole = async () => {
            const uid = user.uid
            const docSnap = await getDoc(doc(db, "users", `${uid}`))
            const userType = docSnap.data().role

        //check if role is correct for website access
            if (userType === "RequestingAccess") {
                logout()
                navigate("/")
                alert("Your account has not been approved yet")
            } else {
                navigate("/dashboard")
            } 
    }

    useEffect(() => {
        if (loading) {return}
        if (user) {getRole()}
    }, [user, loading])

    return (
        <div className='leaderLogIn'>
            <form className='form--main'>
                <h1 className='main--title'>Leader Log-In</h1>
                <label htmlFor='email'>Email Address</label>
                <input 
                    type="text" 
                    id='email'
                    className='login--textBox'
                    value={email}
                    onChange={(input) => setEmail(input.target.value)}
                    required>   
                </input>
                <label htmlFor='password'>Password</label>
                <input 
                    type="password" 
                    id='password'
                    className='login--textBox'
                    value={password} 
                    onChange={(input) => setPassword(input.target.value)}
                    required>
                </input>
                <button 
                    className="button--submit" 
                    type='button'
                    onClick={() => login(email, password)}
                >
                        Submit 
                </button>
            </form>
            <div className='helpLinks'>
                <Link to ="/reset">Forgot Password</Link>
            </div>
            <div className='helpLinks'>
                Don't have an account? <Link to="/register">Register</Link> now.
            </div>
        </div>
    )
}