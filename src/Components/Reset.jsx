import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth, sendPasswordReset } from "../firebase.config"

import '../CSSelements/Reset.css'

export default function Reset() {
    const [email, setEmail] = React.useState("")
    const [user, loading, error] = useAuthState(auth)
    
    const navigate = useNavigate()

    useEffect(() => {
        if (loading) return
        if (user) navigate("/dashboard")
    }, [user, loading])


    return(
        <div className="div--reset--container">
            <label htmlFor="email">
                Enter the Email Address Associated with Your Account
            </label>
            <input 
                type="text"
                id="email"
                className="reset--textBox"
                value={email}
                onChange={(item) => setEmail(item.target.value)}
            />
            <button 
                className="reset--btn"
                onClick={() => sendPasswordReset(email)}
            >
                Send password reset email
            </button>
            <div className='helpLinks--text'>
                Back to <Link className={'helpLinks--link'} to="/login">Login</Link>.
            </div>
        </div> 
    )

}