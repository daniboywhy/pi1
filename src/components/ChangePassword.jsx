import React from "react";

const ChangePassword = () => {
  return (
    <div className="accountsettings">
      <h1 className="mainhead1">Mude sua senha</h1>

      <div className="form">
        <div className="form-group">
          <label htmlFor="oldpassword">
            Senha antiga<span>*</span>
          </label>
          <input type="password" name="oldpassword" id="oldpassword" />
        </div>
        <div className="form-group">
          <label htmlFor="newpassword">
            Nova senha<span>*</span>
          </label>
          <input type="password" name="newpassword" id="newpassword" />
        </div>
        <div className="form-group">
          <label htmlFor="newpasswordconfirm">
            Confirme sua nova senha<span>*</span>
          </label>
          <input
            type="password"
            name="newpasswordconfirm"
            id="newpasswordconfirm"
          />
        </div>
        <button className="mainbutton1">Salvar mudanças</button>
      </div>
    </div>
  );
};

export default ChangePassword;
