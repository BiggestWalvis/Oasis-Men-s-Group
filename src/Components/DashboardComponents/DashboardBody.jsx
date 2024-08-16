import React from "react";
import Attendance from "./Attendance";
import LeaderAccountRequests from "./LeaderAccountRequests";
import MyProfile from './MyProfile'
import SubmitBugReports from "./SubmitBugReports";
import NewVisitors from "./NewVisitors"

import '../../CSSelements/DashboardBody.css'

export default function DashboardBody(props) {

//array for various different display values
    const display = [
        {
            content: <div className="attendance--NewVisitors">
                        <Attendance />
                        <NewVisitors />
                    </div>
        },
        {
            content: <MyProfile 
                        firstName={props.firstName}
                        lastName={props.lastName}
                        email={props.email}
                        phone={props.phone}
                    />
        },
        {
            content: <LeaderAccountRequests />
        },
        {
            content: <SubmitBugReports 
                        firstName={props.firstName}
                        lastName={props.lastName}
                        email={props.email}
                        phone={props.phone}
                    />
        },
    ]
    
    return(
        <div className="dashboard--body--content">
            {display[props.bodyDisplay].content}
        </div>
    )
}