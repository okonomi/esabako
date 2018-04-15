import { connect } from 'react-redux'
import { fetchPost, sendPost } from './../actions/posts'
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
    sendPost: (postNumber, title, markdown) => {
      dispatch(sendPost(postNumber, title, markdown))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor)
