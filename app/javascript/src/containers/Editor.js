import { connect } from 'react-redux'
import { fetchPost, sendPost } from './../actions/posts'
import SlateEsaEditor from '../components/SlateEsaEditor';

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPost: postId => {
      dispatch(fetchPost(postId))
    },
    sendPost: (postId, title, markdown) => {
      dispatch(sendPost(postId, title, markdown))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SlateEsaEditor)
