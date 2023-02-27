import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { deleteExperience } from '../../actions/profile'
import {connect} from 'react-redux'
const Experience = props => {
    const {  experience, deleteExperience } = props
    console.log(113113, experience)
    const handleDelete = id => {
      deleteExperience(id)
    }
    const experiences = experience?.map((exp) => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className='hide-sm'>{exp.title}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {exp.to === null ? ('Now') : (<Moment format='YYYY/MM/DD'>{exp.to}</Moment>)}
            </td>
            <td className='btn btn-danger' onClick={()=>handleDelete(exp._id)}>Delete</td>
        </tr>
    ))
    return (
        <div>
            <h2 className='my-2'>Experience Credentials</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className='hide-sm'>Title</th>
                        <th className='hide-sm'>Years</th>
                    </tr>
                </thead>
                <tbody>{experiences}</tbody>
            </table>
        </div>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience:PropTypes.func.isRequired
}


export default connect(null,{deleteExperience}) (Experience)