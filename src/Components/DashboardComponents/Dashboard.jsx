import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../../firebase.config";
import { query, collection, getDocs, where } from "firebase/firestore";
import DashboardBody from "./DashboardBody"

import '../../CSSelements/Dashboard.css'


export default function Dashboard(props) {
    const [user, loading, error] = useAuthState(auth)
    const [firstName, setFirstName] = React.useState("")
    const [lastName, setLastName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [phone, setPhone] = React.useState("")


    //navigate to the correct webpage
    const navigate = useNavigate()

    //fetch the name of the leader who signed in
    const fetchUserName = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user.uid))
            const doc = await getDocs(q)
            const data = doc.docs[0].data()
            setFirstName(data.firstName)
            setLastName(data.lastName)
            setEmail(data.email)
            setPhone(data.phone)
        } catch (err) {
            console.error(err)
            alert("An error occured while fetching user data")
        }
    }

    //don't do anything while the page is loading,
    //once loaded, send to new page
    useEffect(() => {
        if (loading) return
        if (!user) return navigate("/")
        fetchUserName()
    }, [user, loading])

    return(
        <div className="container">      
            <div className="dashboard--banner">
            Welcome {firstName} {lastName}!   
            </div>
            <div className="dashboard--body">
                <DashboardBody 
                    bodyDisplay={props.displayOptions}
                    firstName={firstName}
                    lastName={lastName}
                    email={email}
                    phone={phone}
                />
            </div>
        </div>
    )
}