import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getCurrentProfile } from '../../actions/profile'
import Spinner from '../layouts/Spinner'
import { Link } from 'react-router-dom'
const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {
  useEffect(() => {
    getCurrentProfile()
  }, [])
  return (
    <div>
      {profile && !loading ?
        (
          <>
            <h1 className='large text-primary'>
              Dashboard
            </h1>
            <p className='lead'>
              <i className='fas fa-user'></i>
              Welcome {user && user.name}
            </p>
            {profile !== null
              ? (<>has</>)
              : <>You have not yet setup profile
                <Link to='create-profile' className='btn btn-primary my-1'>
                  Create Profile
                </Link>
              </>}
          </>
        )
        : <Spinner />
      }
    </div>
  )
}

Dashboard.propsType = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)