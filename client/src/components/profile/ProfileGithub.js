import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getGitHubRepos } from '../../actions/profile'
import Spinner from '../layouts/Spinner'
//TODO : rate limit
const ProfileGithub = ({ userName, getGitHubRepos, repos }) => {
    console.log(repos);
    useEffect(() => {
       getGitHubRepos(userName)
    }, [])
    return (
        <div></div>
    )
}

ProfileGithub.propTypes = {
    getGitHubRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,
    userName: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    repos: state.profile.repos
})
export default connect(mapStateToProps, { getGitHubRepos })(ProfileGithub)