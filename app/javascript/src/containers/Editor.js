import { connect } from 'react-redux'
import { fetchPost, sendPost } from './../actions/posts'
import EsaEditor from '../components/EsaEditor';

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPost: postId => {
      dispatch(fetchPost(postId))
    },
    sendPost: (postId, markdown) => {
      dispatch(sendPost(postId, markdown))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EsaEditor)
