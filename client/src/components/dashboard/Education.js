import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const Education = props => {
    const {  education } = props
    const educations = education.map((exp) => (
        <tr key={exp._id}>
            <td>{exp.school}</td>
            <td className='hide-sm'>{exp.degree}</td>
            <td className='hide-sm'>{exp.fieldofstudy}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {exp.to === null ? ('Now') : (<Moment format='YYYY/MM/DD'>{exp.to}</Moment>)}
            </td>
            <td className='btn btn-danger'>Delete</td>
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
    education: PropTypes.array.isRequired
}


export default (Education)