import React from 'react'
import Login from './Login/index'
import Register from './Register/index'
import {Routes,Route, Navigate} from 'react-router-dom'
export const BeforeLogin = () => {
  return (
    <div>
          <Routes>
            <Route path='/login'  element={<Login />} />
            <Route path='/register'  element={<Register />} />
            <Route path='*'  element={<Navigate to="/login" />} />
          </Routes>
        
    </div>
  )
}
