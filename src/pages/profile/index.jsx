import React from 'react'
import UserSidebar from '../../components/UserSidebar.jsx'
import { useParams } from 'react-router-dom'
import AccountSettings from '../../components/AccountSettings.jsx'
import ChangePassword from '../../components/ChangePassword.jsx'
import './style.css'
import Disciplinas from '../../components/Disciplinas.jsx'
import ListarTutor from '../../components/BuscarTutor.jsx'

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
            {activepage === 'changepassword' && <ChangePassword/>}
            {activepage === 'disciplinas' && <Disciplinas/>}
            {activepage === 'listartutor' && <ListarTutor/>}

        </div>
    </div>
    </div>
  )
}

export default UserProfile