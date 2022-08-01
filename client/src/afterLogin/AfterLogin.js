import React from 'react'
import {HashRouter,Routes,Route,Navigate} from 'react-router-dom'
import { Home } from './Home'
import { Profile } from './Profile'
import {store} from '../store/appStore'
export const AfterLogin = () => {
  const fnLogout=()=>{
    sessionStorage.clear();
    store.dispatch({
      type:'LOGOUT'
    })
  }
  return (
    <div>
          <div className='menu'>
              <a href="#/home">Home</a>
              <a href="#/profile">Profile</a>
              <a onClick={fnLogout} href="#/login">Logout</a>
          </div>
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='*' element={<Navigate to='/home' />} />
          </Routes>
      
    </div>
  )
}
