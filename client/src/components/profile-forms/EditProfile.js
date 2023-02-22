import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createProfile, getCurrentProfile } from '../../actions/profile'
import { Link, useNavigate } from 'react-router-dom'
import withRouter from '../../utils/withRouter'

const EditProfile = props => {
    const {
        createProfile, getCurrentProfile, profile: { profile, loading }
    } = props
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        company: '',
        website: '',
        location: '',
        bio: '',
        status: '',
        githubusername: '',
        skills: '',
        youtube: '',
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
    })

    const [displaySocialInputs, toggleSocialInputs] = useState(false)
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin,
    } = formData

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        getCurrentProfile()
        // setFormData({
        //     company: loading || !profile?.company ? '' : profile?.company,
        //     website: loading || !profile?.website ? '' : profile?.website,
        //     location: loading || !profile?.location ? '' : profile?.location,
        //     bio: loading || !profile?.bio ? '' : profile?.bio,
        //     status: loading || !profile?.status ? '' : profile?.status,
        //     githubusername: loading || !profile?.githubusername ? '' : profile?.githubusername,
        //     skills: loading || !profile?.skills ? '' : profile?.skills?.join(','),
        //     youtube: loading || !profile?.social.youtube ? '' : profile?.social.youtube,
        //     facebook: loading || !profile?.social.facebook ? '' : profile?.social.facebook,
        //     twitter: loading || !profile?.social.twitter ? '' : profile?.social.twitter,
        //     instagram: loading || !profile?.social.instagram ? '' : profile?.social.instagram,
        //     linkedin: loading || !profile?.social.linkedin ? '' : profile?.social.linkedin,
        // })
       
        setFormData(() => {
            let obj = {}
            let socialUrl = ['youtube', 'facebook', 'twitter', 'instagram', 'linkedin']
            for (let i = 0; i < Object.keys(formData).length; i++) {
                let key = Object.keys(formData)[i]
                if (loading || (!profile?.[key] && !socialUrl.includes(key))
                ||(!profile?.social?.[key] && socialUrl.includes(key))) {
                    obj[key] = ''
                } else {
                    if (key === 'skills') {
                        obj[key] = profile[key].join(',')
                    } else if (socialUrl.includes(key)) {
                        obj[key] = profile.social[key]
                    } else {
                        obj[key] = profile[key]
                    }
                }
            }
            return obj
        })

        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading,profile])

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()
        createProfile(formData, navigate, true)
    }
    return (
        <div>
            <h1 className="large text-primary">
                Create Your Profile
            </h1>
            <p className="lead">
                <i className="fas fa-user" /> Let's get some information to make your
                profile stand out
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <select name="status" value={status} onChange={onChange}>
                        <option value={0}>* Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">Student or Learning</option>
                        <option value="Instructor">Instructor or Teacher</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="form-text">Give us an idea of where you are at in your career</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Company" name="company" onChange={onChange} value={company} />
                    <small className="form-text">Could be your own company or one you work for</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Website" name="website" onChange={onChange} value={website} />
                    <small className="form-text">Could be your own or a company website</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" onChange={onChange} value={location} />
                    <small className="form-text">City &amp; state suggested (eg. Boston, MA)</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Skills" name="skills" onChange={onChange} value={skills} />
                    <small className="form-text">Please use comma separated values (eg.
                        HTML,CSS,JavaScript,PHP)</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Github Username" name="githubusername" onChange={onChange} value={githubusername} />
                    <small className="form-text">If you want your latest repos and a Github link, include your
                        username</small>
                </div>
                <div className="form-group">
                    <textarea placeholder="A short bio of yourself" name="bio" defaultValue={""} onChange={onChange} value={bio} />
                    <small className="form-text">Tell us a little about yourself</small>
                </div>
                <div className="my-2">
                    <button onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
                        Add Social Network Links
                    </button>
                    <span>Optional</span>
                </div>
                {displaySocialInputs && <>
                    <div className="form-group social-input">
                        <i className="fab fa-twitter fa-2x" />
                        <input type="text" placeholder="Twitter URL" name="twitter" onChange={onChange} value={twitter} />
                    </div>
                    <div className="form-group social-input">
                        <i className="fab fa-facebook fa-2x" />
                        <input type="text" placeholder="Facebook URL" name="facebook" onChange={onChange} value={facebook} />
                    </div>
                    <div className="form-group social-input">
                        <i className="fab fa-youtube fa-2x" />
                        <input type="text" placeholder="YouTube URL" name="youtube" onChange={onChange} value={youtube} />
                    </div>
                    <div className="form-group social-input">
                        <i className="fab fa-linkedin fa-2x" />
                        <input type="text" placeholder="Linkedin URL" name="linkedin" onChange={onChange} value={linkedin} />
                    </div>
                    <div className="form-group social-input">
                        <i className="fab fa-instagram fa-2x" />
                        <input type="text" placeholder="Instagram URL" name="instagram" onChange={onChange} value={instagram} />
                    </div>
                </>}
                <input type="submit" className="btn btn-primary my-1" />
                <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
            </form>
        </div>
    )
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(
    mapStateToProps, { createProfile, getCurrentProfile }
)(EditProfile)