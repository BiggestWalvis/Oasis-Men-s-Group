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

//Query for each weekly total
    const week1Query = query(collection(db, "checkIn"), 
                        where('date', '>=', `${year}-${month}-01`), 
                        where('date', '<=', `${year}-${month}-07`))
    const week2Query = query(collection(db, "checkIn"), 
                        where('date', '>=', `${year}-${month}-08`), 
                        where('date', '<=', `${year}-${month}-14`))
    const week3Query = query(collection(db, "checkIn"), 
                        where('date', '>=', `${year}-${month}-15`), 
                        where('date', '<=', `${year}-${month}-21`))
    const week4Query = query(collection(db, "checkIn"), 
                        where('date', '>=', `${year}-${month}-22`), 
                        where('date', '<=', `${year}-${month}-28`))
    const week5Query = query(collection(db, "checkIn"), 
                        where('date', '>=', `${year}-${month}-29`), 
                        where('date', '<=', `${year}-${month}-31`))

//Query for each monthly totals
    const month1Query = query(collection(db, "checkIn"), 
                        where('date', '>=', `${year}-01-01`), 
                        where('date', '<=', `${year}-01-31`))
    const month2Query = query(collection(db, "checkIn"), 
                        where('date', '>=', `${year}-02-01`), 
                        where('date', '<=', `${year}-02-31`))
    const month3Query = query(collection(db, "checkIn"), 
                        where('date', '>=', `${year}-03-01`), 
                        where('date', '<=', `${year}-03-31`))
    const month4Query = query(collection(db, "checkIn"), 
                        where('date', '>=', `${year}-04-01`), 
                        where('date', '<=', `${year}-04-31`))
    const month5Query = query(collection(db, "checkIn"), 
                        where('date', '>=', `${year}-05-01`), 
                        where('date', '<=', `${year}-05-31`))
    const month6Query = query(collection(db, "checkIn"), 
                        where('date', '>=', `${year}-06-01`), 
                        where('date', '<=', `${year}-06-31`))
    const month7Query = query(collection(db, "checkIn"), 
                        where('date', '>=', `${year}-07-01`), 
                        where('date', '<=', `${year}-07-31`))
    const month8Query = query(collection(db, "checkIn"), 
                        where('date', '>=', `${year}-08-01`), 
                        where('date', '<=', `${year}-08-31`))
    const month9Query = query(collection(db, "checkIn"), 
                        where('date', '>=', `${year}-09-01`), 
                        where('date', '<=', `${year}-09-31`))
    const month10Query = query(collection(db, "checkIn"), 
                        where('date', '>=', `${year}-10-01`), 
                        where('date', '<=', `${year}-10-31`))
    const month11Query = query(collection(db, "checkIn"), 
                        where('date', '>=', `${year}-11-01`), 
                        where('date', '<=', `${year}-11-31`))
    const month12Query = query(collection(db, "checkIn"), 
                        where('date', '>=', `${year}-12-01`), 
                        where('date', '<=', `${year}-12-31`))

    const yearlyTotal = (month1Array.length + month2Array.length
                        + month3Array.length + month4Array.length
                        + month5Array.length + month6Array.length
                        + month7Array.length + month8Array.length
                        + month9Array.length + month10Array.length
                        + month11Array.length + month12Array.length
                        )
    const monthsWithData = () => {
        let months = (month1Array.length > 1 ? 1 : 0) + (month2Array.length > 1 ? 1 : 0) +
                    (month3Array.length > 1 ? 1 : 0) + (month4Array.length > 1 ? 1 : 0) + 
                    (month5Array.length > 1 ? 1 : 0) + (month6Array.length > 1 ? 1 : 0) + 
                    (month7Array.length > 1 ? 1 : 0) + (month8Array.length > 1 ? 1 : 0) + 
                    (month9Array.length > 1 ? 1 : 0) + (month10Array.length > 1 ? 1 : 0) + 
                    (month11Array.length > 1 ? 1 : 0) + (month12Array.length > 1 ? 1 : 0)
        return(months)
    }

//function to gather data from Firestore
    function gatherData() {
    //pull weekly data from Firestore and store in appropriate state array
        getDocs(week1Query)
            .then((snapshot) => {
                let attendeesWeek1 = []
                snapshot.docs.forEach((doc) => {
                    attendeesWeek1.push({ ...doc.data(), id: doc.id })
                })
                setWeek1Array(attendeesWeek1)
            })
        getDocs(week2Query)
            .then((snapshot) => {
                let attendeesWeek2 = []
                snapshot.docs.forEach((doc) => {
                    attendeesWeek2.push({ ...doc.data(), id: doc.id })
                })
                setWeek2Array(attendeesWeek2)
            })
        getDocs(week3Query)
            .then((snapshot) => {
                let attendeesWeek3 = []
                snapshot.docs.forEach((doc) => {
                    attendeesWeek3.push({ ...doc.data(), id: doc.id })
                })
                setWeek3Array(attendeesWeek3)
            })
        getDocs(week4Query)
            .then((snapshot) => {
                let attendeesWeek4 = []
                snapshot.docs.forEach((doc) => {
                    attendeesWeek4.push({ ...doc.data(), id: doc.id })
                })
                setWeek4Array(attendeesWeek4)
            })
        getDocs(week5Query)
            .then((snapshot) => {
                let attendeesWeek5 = []
                snapshot.docs.forEach((doc) => {
                    attendeesWeek5.push({ ...doc.data(), id: doc.id })
                })
                setWeek5Array(attendeesWeek5)
            })

    //pull monthly data from Firestore and store in appriate state array
        getDocs(month1Query)
            .then((snapshot) => {
                let attendeesMonth1 = []
                snapshot.docs.forEach((doc) => {
                    attendeesMonth1.push({ ...doc.data(), id: doc.id })
                })
                setMonth1Array(attendeesMonth1)
            })
        getDocs(month2Query)
            .then((snapshot) => {
                let attendeesMonth2 = []
                snapshot.docs.forEach((doc) => {
                    attendeesMonth2.push({ ...doc.data(), id: doc.id })
                })
                setMonth2Array(attendeesMonth2)
            })
        getDocs(month3Query)
            .then((snapshot) => {
                let attendeesMonth3 = []
                snapshot.docs.forEach((doc) => {
                    attendeesMonth3.push({ ...doc.data(), id: doc.id })
                })
                setMonth3Array(attendeesMonth3)
            })
        getDocs(month4Query)
            .then((snapshot) => {
                let attendeesMonth4 = []
                snapshot.docs.forEach((doc) => {
                    attendeesMonth4.push({ ...doc.data(), id: doc.id })
                })
                setMonth4Array(attendeesMonth4)
            })
        getDocs(month5Query)
            .then((snapshot) => {
                let attendeesMonth5 = []
                snapshot.docs.forEach((doc) => {
                    attendeesMonth5.push({ ...doc.data(), id: doc.id })
                })
                setMonth5Array(attendeesMonth5)
            })
        getDocs(month6Query)
            .then((snapshot) => {
                let attendeesMonth6 = []
                snapshot.docs.forEach((doc) => {
                    attendeesMonth6.push({ ...doc.data(), id: doc.id })
                })
                setMonth6Array(attendeesMonth6)
            })
        getDocs(month7Query)
            .then((snapshot) => {
                let attendeesMonth7 = []
                snapshot.docs.forEach((doc) => {
                    attendeesMonth7.push({ ...doc.data(), id: doc.id })
                })
                setMonth7Array(attendeesMonth7)
            })
        getDocs(month8Query)
            .then((snapshot) => {
                let attendeesMonth8 = []
                snapshot.docs.forEach((doc) => {
                    attendeesMonth8.push({ ...doc.data(), id: doc.id })
                })
                setMonth8Array(attendeesMonth8)
            })
        getDocs(month9Query)
            .then((snapshot) => {
                let attendeesMonth9 = []
                snapshot.docs.forEach((doc) => {
                    attendeesMonth9.push({ ...doc.data(), id: doc.id })
                })
                setMonth9Array(attendeesMonth9)
            })
        getDocs(month10Query)
            .then((snapshot) => {
                let attendeesMonth10 = []
                snapshot.docs.forEach((doc) => {
                    attendeesMonth10.push({ ...doc.data(), id: doc.id })
                })
                setMonth10Array(attendeesMonth10)
            })
        getDocs(month11Query)
            .then((snapshot) => {
                let attendeesMonth11 = []
                snapshot.docs.forEach((doc) => {
                    attendeesMonth11.push({ ...doc.data(), id: doc.id })
                })
                setMonth11Array(attendeesMonth11)
            })
        getDocs(month12Query)
            .then((snapshot) => {
                let attendeesMonth12 = []
                snapshot.docs.forEach((doc) => {
                    attendeesMonth12.push({ ...doc.data(), id: doc.id })
                })
                setMonth12Array(attendeesMonth12)
            })
    }
    
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


    return(
        <div className="Attendance">
            <div className="dataSelection">
                <div className="monthSelection">
                    <label htmlFor="month">Select Month</label>
                    <select id="months" onChange={selectMonth}>
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
                    <select id="years" onChange={selectYear}>
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
                    -------------------------------------------<br />
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
                    ------------- <br />
                    Monthly Average: {(yearlyTotal)/monthsWithData()} <br />
                </p>
            </div>
        </div>
    )
}