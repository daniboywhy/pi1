import React from "react";

const ChangePassword = () => {
  return (
    <div className="accountsettings">
      <h1 className="mainhead1">Change your password</h1>

      <div className="form">
        <div className="form-group">
          <label htmlFor="oldpassword">
            Old Password<span>*</span>
          </label>
          <input type="password" name="oldpassword" id="oldpassword" />
        </div>
        <div className="form-group">
          <label htmlFor="newpassword">
            New Password<span>*</span>
          </label>
          <input type="password" name="newpassword" id="newpassword" />
        </div>
        <div className="form-group">
          <label htmlFor="newpasswordconfirm">
            Confirm New Password<span>*</span>
          </label>
          <input
            type="password"
            name="newpasswordconfirm"
            id="newpasswordconfirm"
          />
        </div>
        <button className="mainbutton1">Save Changes</button>
      </div>
    </div>
  );
};

export default ChangePassword;
