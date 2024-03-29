import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { removeComment } from '../../actions/post'

const CommentItem = ({ comment: {
    _id, text, name, avatar, user, date
}, postId, auth, removeComment }) => {
    return (
        <div>
            <div className="comments">
                <div className="post bg-white p-1 my-1">
                    <div>
                        <Link to={`/profile/${user}`}>
                            <img className="round-img" src={avatar} alt="" />
                            <h4>John Doe</h4>
                        </Link>
                    </div>
                    <div>
                        <p className="my-1">
                            {text}
                        </p>
                        <p className="post-date">
                            Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
                        </p>
                        {!auth.loading && user === auth.user._id && (
                            <>
                                <button onClick={() => removeComment(postId, _id)} type='button' className='btn btn-danger'>Delete</button>
                                <i className='fas fas-times'></i>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

CommentItem.propTypes = {
    postId: PropTypes.number.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    removeComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,

})
export default connect(mapStateToProps, { removeComment })(CommentItem)