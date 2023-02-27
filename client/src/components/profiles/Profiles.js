import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layouts/Spinner'
import { getProfiles } from '../../actions/profile'
import ProfileItem from './ProfileItem'

const Profiles = props => {
    const { getProfiles, profile: { profiles, loading } } = props
    useEffect(() => {
        getProfiles()
    }, [getProfiles])
    return (
        <div>{loading ? <Spinner /> : (
            <>
                <h1 className='large text-primary'>Developers</h1>
                <p className='lead'>
                    <i className='fab fa-connectdevelop'></i>
                    Browse and connect with developers
                </p>
                <div className='profiles'>
                    {profiles.length > 0 ? profiles.map(profile => (
                        <ProfileItem key={profile._id} profile={profile} />
                    )) : <h4>No Profiles found ...</h4>}
                </div>
            </>
        )}</div>
    )
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profiles: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})
export default connect(mapStateToProps, { getProfiles })(Profiles)