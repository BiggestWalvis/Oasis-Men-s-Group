import React from "react";

import '../../CSSelements/DashboardSidebar.css'
import Button from "../Button";

export default function DashboardSidebar(props) {
    
//create array of elements to show in the sidebar with various keys
//map over the array and create a button tab for each item
//recieve function from Dashboard
        //update the Dashboard-level state to a new value, 
        //based off the sidebar button selected
    const dashboardDisplays =[
        {
            key: 0,
            label: "Attendance Data",
        },
        {
            key: 1,
            label: "New Arrivals",
        },
        {
            key: 2,
            label: "User Information",
        },
        {
            key: 3,
            label: "Leader Approval",
        },
        {
            key: 4,
            label: "Bug Report",
        },
    ]


return(
    <div className="dashboard--sidebar">
        {dashboardDisplays.map((tab) => (
            <Button 
                key={tab.key}
                label={tab.label}
                onClick={() => props.changeDisplay(tab.key)}
                isActive={props.bodyDisplay === tab.key ? true : false}
                name="dashboardBtns"
            />
        ))}
    </div>
)


}