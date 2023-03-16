import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPost } from '../../actions/post'
import { Link, useParams } from 'react-router-dom'
import Spinner from '../layouts/Spinner'
import PostItem from '../posts/PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const Post = ({ getPost, post: { post, loading } }) => {
    const param = useParams()
    useEffect(() => {
        getPost(param.id)
    }, [getPost])
    return (
        <div>{loading || post === null ? <Spinner /> :
            <>
                <Link className='btn' to='/posts'>
                    Back To Posts
                </Link>
                <PostItem post={post} showActions={false} />
                <CommentForm postId={post._id} />
                <div className='comments'>
                    {post.comments.map((comment) => (
                        <CommentItem key={comment._id} comment={comment} postId={post._id} />
                    ))}
                </div>
            </>
        }</div>
    )
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})
export default connect(mapStateToProps, { getPost })(Post)