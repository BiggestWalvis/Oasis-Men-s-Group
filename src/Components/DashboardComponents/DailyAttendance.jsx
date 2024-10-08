import React, { useEffect } from 'react'
import { currentDate, checkInCollection } from '../../firebase.config';
import { query, getDocs, where, doc } from 'firebase/firestore';
import DatePicker from "react-datepicker";
import UserBox from './UserBox';
import { format } from 'date-fns';

import "react-datepicker/dist/react-datepicker.css";
import "../../CSSelements/DailyAttendance.css"

export default function DailyAttendance() {

    const [newDate, setNewDate] = React.useState(new Date())
    const [attendance, setAttendance] = React.useState([])




    attendance.sort(function (a,b) {
        if (a.lastName < b.lastName ){
            return -1
        }
        if (a.lastName > b.lastName){
            return 1
        }
        return 0
    })

    let formattedDate = format(newDate, "MM/dd/yyyy")

    async function handleChange(date) {
        const q = query(checkInCollection,
            where(`date`, `==`, `${date}`))
        await getDocs(q).then((snapshot) => {
            let attended = []
            snapshot.docs.forEach((doc) => {
                attended.push({...doc.data()})    
            })
            setAttendance(attended)
        })
    }

    useEffect(() => {
            handleChange(formattedDate)
    }, [newDate])   

    return(
        <div className='DailyAttendance--container'>
            <h3>Daily Attendance</h3>
            <div className='DatePicker--container'>
                <p>Select a Date</p>
                <DatePicker
                className='datepicker' 
                showIcon
                toggleCalendarOnIconClick
                onSelect={(date) => setNewDate(date)}
                selected={newDate}
                /> 
            </div>
            <h4>Total Attended: {attendance.length}</h4>
            <div className='Name--container'>
                {attendance.map((tab,index) => (
                    <UserBox 
                        key={index}
                        firstName={tab.firstName}
                        lastName={tab.lastName}
                        id={tab.id}
                        recorded={tab.recorded}
                    />
                ))}

            </div>
        </div>
    )
        
}