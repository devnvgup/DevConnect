import React from 'react'
import { connect } from 'react-redux'
import Proptypes from 'prop-types'
const Alert = ({ alerts }) => alerts && alerts.length > 0 && alerts.map(alerts => (
    <div key={alert.id} className={`alert alert-${alerts.alertType}`}>
        {alerts.msg}
    </div>
))


Alert.propTypes = {
    alert: Proptypes.array.isRequired
}
const mapStateToProps = (state) => {
    return {
        alerts: state.alert
    }
}

export default connect(mapStateToProps)(Alert)