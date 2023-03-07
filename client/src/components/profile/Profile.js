import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layouts/Spinner'
import { getProfileById } from '../../actions/profile'
import { Link, useParams } from 'react-router-dom'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'

const Profile = ({ getProfileById, profile: { profile, loading }, auth }) => {
    let userId = useParams()
    useEffect(() => {
        const { id } = userId
        getProfileById(id)
    }, [getProfileById])
    return (
        <div>{profile === null || loading ? <Spinner /> : (
         <><>
                <Link to="/profiles" className='btn btn-light'>
                    Back To Profiles
                </Link>
                {auth.isAuthenticated && !auth.loading && auth.user._id === profile.user._id && (<Link to="/edit-profile" className='btn btn-dark'>
                    Edit Profile
                </Link>)}</><>
                    <div className='profile-grid my-1'>
                        <ProfileTop profile={profile} />
                        <ProfileAbout profile={profile}/>
                    </div>
                </></>
        )}
        </div>
    )
}

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getProfileById: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,
})

export default connect(mapStateToProps, { getProfileById })(Profile)