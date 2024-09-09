import React from "react";
import Attendance from "./Attendance";
import LeaderAccountRequests from "./LeaderAccountRequests";
import Roster from "./Roster";
import MyProfile from './MyProfile'
import SubmitBugReports from "./SubmitBugReports";
import NewVisitors from "./NewVisitors"
import SharableQRCode from "./SharableQRCode";

import '../../CSSelements/DashboardBody.css'
import DailyAttendance from "./DailyAttendance";

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
            content: <DailyAttendance />
        },
        {
            content: <Roster />
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
        {
            content: <SharableQRCode />
        },
        
    ]
    
    return(
        <div className="dashboard--body--content">
            {display[props.bodyDisplay].content}
        </div>
    )
}