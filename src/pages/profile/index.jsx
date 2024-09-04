import React from 'react'
import UserSidebar from '../../components/UserSidebar.jsx'
import { useParams } from 'react-router-dom'
import AccountSettings from '../../components/AccountSettings.jsx'
import './style.css'

const UserProfile = () => {
    const {activepage} = useParams()
  return (
    <div className='userprofile'>
    <div className='userprofilein'>
        <div className='left'>
            <UserSidebar activepage={activepage}/>
        </div>
        <div className='right'>
            {activepage === 'accountsettings' && <AccountSettings/>}
        </div>
    </div>
    </div>
  )
}

export default UserProfile