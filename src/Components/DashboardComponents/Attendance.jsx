import React, { useEffect } from "react";
import { collection, query, where, getDocs, getCountFromServer } from "firebase/firestore";
import { auth, db, logout } from "../../firebase.config.jsx";
import NewVisitors from "./NewVisitors.jsx"

import '../../CSSelements/Attendance.css'

export default function Attendance() {
//month and year states which will be selected by the user
    const [month, setMonth] = React.useState("")
    const [year, setYear] = React.useState("")

//each weekly array, saved in state
    const [week1Array, setWeek1Array] = React.useState([])
    const [week2Array, setWeek2Array] = React.useState([])
    const [week3Array, setWeek3Array] = React.useState([])
    const [week4Array, setWeek4Array] = React.useState([])
    const [week5Array, setWeek5Array] = React.useState([])

//each monthly array, saved in state
    const [month1Array, setMonth1Array] = React.useState([])
    const [month2Array, setMonth2Array] = React.useState([])
    const [month3Array, setMonth3Array] = React.useState([])
    const [month4Array, setMonth4Array] = React.useState([])
    const [month5Array, setMonth5Array] = React.useState([])
    const [month6Array, setMonth6Array] = React.useState([])
    const [month7Array, setMonth7Array] = React.useState([])
    const [month8Array, setMonth8Array] = React.useState([])
    const [month9Array, setMonth9Array] = React.useState([])
    const [month10Array, setMonth10Array] = React.useState([])
    const [month11Array, setMonth11Array] = React.useState([])
    const [month12Array, setMonth12Array] = React.useState([])

//state to hold all documents
    const [yearlyArray, setYearlyArray] = React.useState([])

//Query all documents within the year selected
    const yearlyQuery = query(collection(db, "checkIn"),
                        where('date', '>=', `01/01/${year}`),
                        where('date', '<=', `12/31/${year}`))
    
    async function gatherData() {
        //pull weekly data from Firestore and store in appropriate state array
            await getDocs(yearlyQuery)
                .then((snapshot) => {
                    let yearlyAttendees = []
                    snapshot.docs.forEach((doc) => {
                        yearlyAttendees.push({ ...doc.data(), id: doc.id })
                    })
                    setYearlyArray(yearlyAttendees)
                })
        }

//temporary arrays to allow for monthly data organization
    let month1Attendees = []
    let month2Attendees = []
    let month3Attendees = []
    let month4Attendees = []
    let month5Attendees = []
    let month6Attendees = []
    let month7Attendees = []
    let month8Attendees = []
    let month9Attendees = []
    let month10Attendees = []
    let month11Attendees = []
    let month12Attendees = []

    //pull monthly data from the array
    function organizeDataMonthly() {
            yearlyArray.forEach(i => {
                if(i.date >= `01/01/${year}` && i.date <= `01/31/${year}`){
                    month1Attendees.push({i})
                }else if(i.date >= `02/01/${year}` && i.date <= `02/29/${year}`){
                    month2Attendees.push({i})
                }else if(i.date >= `03/01/${year}` && i.date <= `03/31/${year}`){
                    month3Attendees.push({i})
                }else if(i.date >= `04/01/${year}` && i.date <= `04/31/${year}`){
                    month4Attendees.push({i})
                }else if(i.date >= `05/01/${year}` && i.date <= `05/31/${year}`){
                    month5Attendees.push({i})
                }else if(i.date >= `06/01/${year}` && i.date <= `06/31/${year}`){
                    month6Attendees.push({i})
                }else if(i.date >= `07/01/${year}` && i.date <= `07/31/${year}`){
                    month7Attendees.push({i})
                }else if(i.date >= `08/01/${year}` && i.date <= `08/31/${year}`){
                    month8Attendees.push({i})
                }else if(i.date >= `09/01/${year}` && i.date <= `09/31/${year}`){
                    month9Attendees.push({i})
                }else if(i.date >= `10/01/${year}` && i.date <= `10/31/${year}`){
                    month10Attendees.push({i})
                }else if(i.date >= `11/01/${year}` && i.date <= `11/31/${year}`){
                    month11Attendees.push({i})
                }else if(i.date >= `12/01/${year}` && i.date <= `12/31/${year}`){
                    month12Attendees.push({i})
                }
            })
        //set monthly data to State
            setMonth1Array(month1Attendees)
            setMonth2Array(month2Attendees)
            setMonth3Array(month3Attendees)
            setMonth4Array(month4Attendees)
            setMonth5Array(month5Attendees)
            setMonth6Array(month6Attendees)
            setMonth7Array(month7Attendees)
            setMonth8Array(month8Attendees)
            setMonth9Array(month9Attendees)
            setMonth10Array(month10Attendees)
            setMonth11Array(month11Attendees)
            setMonth12Array(month12Attendees)
    }
    
//temporary arrays to allow fro weekly organizing of data
    let week1Attendees = []
    let week2Attendees = []
    let week3Attendees = []
    let week4Attendees = []
    let week5Attendees = []
//organize weekly data
    function organizeDataWeekly(){
        yearlyArray.forEach((i) => {
            if(i.date >= `${month}/01/${year}` && i.date <= `${month}/07/${year}`){
                week1Attendees.push({i})
            }else if(i.date >= `${month}/08/${year}` && i.date <= `${month}/14/${year}`){
                week2Attendees.push({i})
            }else if(i.date >= `${month}/15/${year}` && i.date <= `${month}/21/${year}`){
                week3Attendees.push({i})
            }else if(i.date >= `${month}/22/${year}` && i.date <= `${month}/28/${year}`){
                week3Attendees.push({i})
            }else if(i.date >= `${month}/29/${year}` && i.date <= `${month}/31/${year}`){
                week3Attendees.push({i})
            }
        })
    //set weekly data to state
        setWeek1Array(week1Attendees)
        setWeek2Array(week2Attendees)
        setWeek3Array(week3Attendees)
        setWeek4Array(week4Attendees)
        setWeek5Array(week5Attendees)
    }

    useEffect(() => {
        if (yearlyArray.length >= 1){
            organizeDataMonthly()
            organizeDataWeekly()
        }
    }, [yearlyArray])
    
//function to determine the year and month that a user selects
    function selectYear() {
    const years = document.getElementById("years")
    const selectedValue = years.options[years.selectedIndex].value
    setYear(selectedValue)
    }
    function selectMonth() {
        const months = document.getElementById("months")
        const selectedValue = months.options[months.selectedIndex].value
        setMonth(selectedValue)
    }
    
//function to determine the yearly average
    function yearlyAverage(){
        let totalMonths = 0
        
        if (month1Array.length > 0){
            totalMonths++
        }
        if (month2Array.length > 0){
            totalMonths++
        }
        if (month3Array.length > 0){
            totalMonths++
        }
        if (month4Array.length > 0){
            totalMonths++
        }
        if (month5Array.length > 0){
            totalMonths++
        }
        if (month6Array.length > 0){
            totalMonths++
        }
        if (month7Array.length > 0){
            totalMonths++
        }
        if (month8Array.length > 0){
            totalMonths++
        }
        if (month9Array.length > 0){
            totalMonths++
        }
        if (month10Array.length > 0){
            totalMonths++
        }
        if (month11Array.length > 0){
            totalMonths++
        }
        if (month12Array.length > 0){
            totalMonths++
        }
        return yearlyArray.length/totalMonths
    }


    return(
        <div className="Attendance">
            <div className="dataSelection">
                <div className="monthSelection">
                    <label htmlFor="month">Select Month</label>
                    <select className="select--selection" id="months" onChange={selectMonth}>
                        <option value="">--Please Choose a Month--</option>
                        <option value="01">January</option>
                        <option value="02">Feburary</option>
                        <option value="03">March</option>
                        <option value="04">April</option>
                        <option value="05">May</option>
                        <option value="06">June</option>
                        <option value="07">July</option>
                        <option value="08">August</option>
                        <option value="09">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                </div>
                <div className="yearSelection">
                    <label htmlFor="year">Select Year</label>
                    <select className="select--selection" id="years" onChange={selectYear}>
                        <option value="">--Please Choose a Year--</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                        <option value="2030">2030</option>
                        <option value="2031">2031</option>
                        <option value="2032">2032</option>
                        <option value="2033">2033</option>
                        <option value="2034">2034</option>
                        <option value="2035">2035</option>
                    </select>
                </div>
                <button 
                    type="button" 
                    onClick={gatherData}
                    className="gatherDataBtn"
                >Gather Data
                </button>
            </div>    
                
            <div className="dataOutput">    
                <p className="monthly--output">
                    Week 1 Attendance: {week1Array.length} <br />
                    Week 2 Attendance: {week2Array.length} <br />
                    Week 3 Attendance: {week3Array.length} <br />
                    Week 4 Attendance: {week4Array.length} <br />
                    Week 5 Attendance: {week5Array.length} <br />
                    --------------------------------------<br />
                    Monthly Total: {week1Array.length + week2Array.length 
                                    + week3Array.length + week4Array.length 
                                    + week5Array.length} 
                </p>
                <p className="yearly--output"> 
                    January: {month1Array.length}<br />
                    Feburary: {month2Array.length}<br />
                    March: {month3Array.length}<br />
                    April: {month4Array.length}<br />
                    May: {month5Array.length}<br />
                    June: {month6Array.length}<br />
                    July: {month7Array.length}<br />
                    August: {month8Array.length}<br />
                    September: {month9Array.length}<br />
                    October: {month10Array.length}<br />
                    November: {month11Array.length}<br />
                    December: {month12Array.length}<br />
                    --------------------<br />
                    Monthly Average: {yearlyAverage()} <br />
                </p>
            </div>
        </div>
    )
}