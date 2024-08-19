import React, { useEffect } from "react";
import DashboardHeader from "./DashboardComponents/DashboardHeader";
import Dashboard from "./DashboardComponents/Dashboard";

import '../CSSelements/LeaderMainPage.css'

export default function LeaderMainPage() {

    const [displayOptions, setDisplayOptions] = React.useState(0)

    function updateDisplay(input){
        setDisplayOptions(input)
    }
    

    return(
        <div className="LeaderMainPage--container">
            <div className="LeaderMainPage--header">
                <DashboardHeader 
                    updateDisplay={updateDisplay}
                />
            </div>
            <div className="LeaderMainPage--body">
                <Dashboard
                    displayOptions={displayOptions} 
                />
            </div>
        </div>

    )
}