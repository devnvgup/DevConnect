import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addEducation } from '../../actions/profile'
import { useNavigate } from 'react-router-dom'
const AddEducation = props => {
    const { addEducation } = props
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    })
    const [toDataDisabled, toggleDisabled] = useState(false)

    const {
        school, degree, fieldofstudy, from, to, current, description
    } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    const onSubmit = e => {
        e.preventDefault()
        addEducation(formData, navigate)
    }
    return (
        <div>
            <h1 className="large text-primary">
                Add Your Education
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch" /> Add any school or bootcamp that you have attended
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="text" placeholder="* School or Bootcamp" name="school" value={school} onChange={onChange} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Degree or Certificate" name="degree" value={degree} onChange={onChange} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Fieldsofstudy" name="fieldofstudy" value={fieldofstudy} onChange={onChange} />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={onChange} />
                </div>
                <div className="form-group">
                    <p><input type="checkbox" name="current" defaultValue value={current} checked={current} onChange={
                        () => {
                            setFormData({ ...formData, current: !current })
                            toggleDisabled(!toDataDisabled)
                        }
                    } /> Current Job</p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" value={to} onChange={onChange} disabled={toDataDisabled ? 'disabled' : ''} />
                </div>
                <div className="form-group">
                    <textarea name="description" cols={30} rows={5} placeholder="Job Description" defaultValue={""} value={description} onChange={onChange} />
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
            </form>
        </div>
    )
}

AddEducation.propTypes = {
    addExperience: PropTypes.func.isRequired
}

export default connect(null, { addEducation })(AddEducation)