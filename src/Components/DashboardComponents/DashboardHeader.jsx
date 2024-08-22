import React, { useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { auth, logout, db } from "../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth"
import { Link, useNavigate } from 'react-router-dom'
import { query, getDocs, where, collection } from "firebase/firestore";

import "../../CSSelements/DashboardHeader.css"
import "../images/gear.png"

export default function DashboardHeader(props) {
    //an anchor element used to position the settings menu
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [user, loading, error] = useAuthState(auth)
    
    const navigate = useNavigate()

    useEffect(() => {
        //if (loading) {return}
        if (!user) navigate("/login")
    }, [user, loading])    

    //resets the anchor element based on the click event
    const handleClose = (element) => {
            setAnchorEl(null);
        if(element === "menu"){
            return
        }else{
            props.updateDisplay(element)
        }
    };

    //sets the anchor element based on the click event
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return(
        <div className="dashboardHeader--container">
            <button 
                className="settings--btn"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
            ><img 
                className="settings--icon" 
                src="https://i.postimg.cc/qqrn1qxC/settings-icon.png"/>
            </button>
            <Menu   
                keepMounted
                anchorEl={anchorEl}
                onClose={() => handleClose("menu")}
                open={Boolean(anchorEl)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >   
                <MenuItem onClick={() => handleClose(0)}>
                    Dashboard 
                </MenuItem>
                <MenuItem onClick={() => handleClose(1)}>
                    Daily Attendance 
                </MenuItem>
                <MenuItem onClick={() => handleClose(2)}>
                    My Profile 
                </MenuItem>
                <MenuItem onClick={() => handleClose(3)}>
                    Leader Account Requests
                </MenuItem>
                <MenuItem onClick={() => handleClose(4)}>
                    Submit Bug Reports
                </MenuItem>
                <MenuItem onClick={() => handleClose(5)}>
                    QR Code
                </MenuItem>
                <MenuItem onClick={() => logout()}>
                    Logout
                </MenuItem> 
            </Menu>
             
        </div>
    )
}