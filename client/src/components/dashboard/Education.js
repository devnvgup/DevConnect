import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { deleteEducation } from '../../actions/profile'
const Education = props => {
    const {  education, deleteEducation } = props
    const handleDelete = id => {
        deleteEducation(id)
    }
    const educations = education?.map((exp) => (
        <tr key={exp._id}>
            <td>{exp.school}</td>
            <td className='hide-sm'>{exp.degree}</td>
            <td className='hide-sm'>{exp.fieldofstudy}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {exp.to === null ? ('Now') : (<Moment format='YYYY/MM/DD'>{exp.to}</Moment>)}
            </td>
            <td className='btn btn-danger' onClick={()=>handleDelete(exp._id)}>Delete</td>
        </tr>
    ))
    return (
        <div>
            <h2 className='my-2'>Education Credentials</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>School</th>
                        <th className='hide-sm'>Degree</th>
                        <th className='hide-sm'>Fieldofstudy</th>
                        <th className='hide-sm'>Years</th>
                    </tr>
                </thead>
                <tbody>{educations}</tbody>
            </table>
        </div>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation:PropTypes.func.isRequired
}


export default connect(null,{deleteEducation})(Education)