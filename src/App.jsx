import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './Components/DashboardComponents/Dashboard'
import Reset from './Components/Reset'
import LeaderSignUp from './Components/LeaderRegister'
import LeaderLogin from './Components/LeaderLogIn'
import LeaderMainPage from './Components/LeaderMainPage'

import Navbar from './Components/Navbar'
import CheckIn from './Components/CheckIn'
import { onSnapshot } from 'firebase/firestore'
import { checkInCollection } from './firebase.config'


export default function App() {
  

  return (
    <div> 
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<CheckIn />} />
          <Route exact path="/login" element={<LeaderLogin />} />
          <Route exact path="/register" element={<LeaderSignUp />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<LeaderMainPage />} />
        </Routes>
      </Router>     
    </div>
  )
}

