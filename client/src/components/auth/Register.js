import React, { useState } from "react";
import { Link, redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from 'prop-types';

const Register = (props) => {
  const { setAlert, register, isAuthenticated } = props
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
  const onSubmit = e => {
    e.preventDefault()
    if (password !== password2) {
      setAlert('Password do not match', 'danger');
    } else {
      register({ name, password, email })
    }
  }

  if (isAuthenticated) {
    return redirect("/dashboard");
  }
  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user" /> Create Your Account</p>
      <form className="form" action="create-profile.html" onSubmit={onSubmit}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" onChange={onChange} />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" onChange={onChange} />
          <small className="form-text">This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small>
        </div>
        <div className="form-group">
          <input type="password" placeholder="Password" name="password" minLength={6} onChange={onChange} />
        </div>
        <div className="form-group">
          <input type="password" placeholder="Confirm Password" name="password2" minLength={6} onChange={onChange} />
        </div>
        <input type="submit" className="btn btn-primary" defaultValue="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </>
  );
};



const mapStateToProps = state => ({
  alerts: state.alert,
  isAuthenticated: state.auth.isAuthenticated
})

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  alert: PropTypes.array.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, { setAlert, register })(Register);
