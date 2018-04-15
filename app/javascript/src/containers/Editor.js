import { connect } from 'react-redux'
import { fetchPost, updatePost } from './../actions/posts'
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
    updatePost: (postNumber, title, markdown) => {
      dispatch(updatePost(postNumber, title, markdown))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor)
