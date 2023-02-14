import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import Dashboard from '../dashboard/Dashboard'

const PrivateRoute = ({ auth: { isAuthenticated, loading }}) => {
    return (
       <>
       {!isAuthenticated && !loading ? <Navigate to ='/login'/> : <Dashboard/> }
       </>
    )
}

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)