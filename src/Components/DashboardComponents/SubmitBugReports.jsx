import React from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth, currentDate } from "../../firebase.config";

import '../../CSSelements/SubmitBugReports.css'

export default function SubmitBugReports(props){

    const [reportState, setReportState] = React.useState(false)
    const [reportContent, setReportContent] = React.useState("")

    const [user, loading, error] = React.useState(auth)
    
    

    const submitReport = async (e) => {
        e.preventDefault()

        await addDoc(collection(db, "BugReports"),{
                                    reportContent: reportContent,
                                    firstName: props.firstName,
                                    lastName: props.lastName,
                                    email: props.email,
                                    phone: props.phone,
                                    date: currentDate,
            })      
        setReportState(true)
    }

    const updateContent = (event) => {
        setReportContent(event.target.value)
    }



    return(
        <div className="BugReport--Container">
            {reportState ? 
                <div className="BugReport--Confirmation"> 
                    <h2 >Report Submitted!</h2> 
                    <h3>The Admin will attempt to fix this issue as soon as possible.</h3>    
                    <button 
                        className="BugReport--btn"
                        onClick={() => setReportState(false)}
                    >Submit another Bug Report
                    </button>
                </div>    
            : 
                <div className="BugReport--reportScreen">
                    <textarea 
                        className="BugReport--textArea" 
                        onChange={updateContent}
                        placeholder="Enter what bug you found here. Please be as descriptive as possible and describe what you were doing, and what you were trying to do."
                    ></textarea>
                    <button 
                        className="BugReport--btn" 
                        type="button" 
                        onClick={submitReport}
                    >Submit Report</button>
                </div>
            }

            
        </div>

    )
}