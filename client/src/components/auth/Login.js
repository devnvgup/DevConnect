import React, { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { login } from "../../actions/auth"
const Login = ({ login, isAuthenticated }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const onSubmit = (e) => {
    console.log(123123)
    const { email, password } = formData
    e.preventDefault()
    login(email, password)
  }

  // Ridirect if logged in

  if (isAuthenticated) {
     return navigate("/dashboard");
  }

  const onChange = e => setFormData({
    ...formData,
    [e.target.name]: e.target.value
  })
  return <div>
    <h1 className="large text-primary">Sign In</h1>
    <p className="lead"><i className="fas fa-user" /> Sign into Your Account</p>
    <form className="form" action="dashboard.html" onSubmit={onSubmit}>
      <div className="form-group">
        <input type="email" placeholder="Email Address" name="email" onChange={onChange} />
      </div>
      <div className="form-group">
        <input type="password" placeholder="Password" name="password" onChange={onChange} />
      </div>
      <input type="submit" className="btn btn-primary" defaultValue="Login" />
    </form>
    <p className="my-1">
      Don't have an account? <Link to="/register">Sign Up</Link>
    </p>
  </div>;
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}
export default connect(mapStateToProps, { login })(Login);
