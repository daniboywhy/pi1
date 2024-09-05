import React from 'react'
import './AccountSettings.css'

const AccountSettings = () => {
  return (
    <div className='accountsettings'>
      <h1 className='mainhead1'>Personal Information</h1>

      <div className="form">
        <div className="form-group">
          <label htmlFor="nome">Nome<span>*</span></label>
          <input type="text" name='nome' id='nome' />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail<span>*</span></label>
          <input type="email" name='email' id='email' />
        </div>
        <div className="form-group">
          <label htmlFor="cpf">CPF<span>*</span></label>
          <input type="text" name='cpf' id='cpf' />
        </div>
        <button className="mainbutton1">Save Changes</button>
      </div>
    </div>
  )
}

export default AccountSettings