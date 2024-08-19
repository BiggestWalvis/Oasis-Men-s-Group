import React from 'react'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import "../CSSelements/Navbar.css"

export default function Navbar(props) {
  const navigate = useNavigate()

  //list of navigation tabs
  const tabData = [
      {
        key: 0,
        label: "Check-In",
        onClick: "/",
      },
      {
        key: 1,
        label: "Leaders",
        onClick: "/login",
      },
    ]

  return (
      <nav className='nav--navbar'>
          <h2 className='nav--title'>OASIS MEN'S GROUP</h2>
          {/*render each of the tabs shown in the array tabData
          and update the state of each one when it is selected*/}
          {tabData.map((tab, index) => (
              <Button
                  key={tab.key}
                  label={tab.label}
                  onClick={() => navigate(tab.onClick)}
                  name="navbar"
              />
          ))}
      </nav>
  )
}