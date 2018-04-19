import { connect } from 'react-redux'
import { fetchPost, createPost, updatePost } from './../actions/posts'
import Editor from '../components/Editor';

const mapStateToProps = state => {
  return {
    post: state.post
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPost: postNumber => {
      dispatch(fetchPost(postNumber))
    },
    createPost: (title, markdown) => {
      dispatch(createPost(title, markdown))
    },
    updatePost: (postNumber, title, markdown) => {
      dispatch(updatePost(postNumber, title, markdown))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor)
