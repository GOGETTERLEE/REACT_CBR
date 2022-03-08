import React from 'react'
import './LaunchStyle.css'
import LaunchNav from '../components/launch/LaunchNav'
import Stake from '../components/launch/Stake'
import Bond from '../components/launch/Bond'
import Borrow from '../components/launch/Borrow'
import Deposit from '../components/launch/Deposit'
import { Routes, Route } from 'react-router-dom'

const Launch = () => {
  return (
    <div className="appmain">
      <LaunchNav/>
      <Routes>
          <Route path='Stake' element={<Stake/>} />
          <Route path='Bond' element={<Bond/>} />
          <Route path='Borrow' element={<Borrow/>} />
          <Route path='Deposit' element={<Deposit/>} />
      </Routes>
    </div>
  )
}
export default Launch