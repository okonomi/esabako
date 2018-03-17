import { connect } from 'react-redux'
import Editor from '../components/EsaEditor'
import { fetchPost, sendPost } from './../actions/posts'
import EsaEditor from '../components/EsaEditor';

const mapStateToProps = state => {
  return state.posts
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadPost: postId => {
      dispatch(fetchPost(postId))
    },
    onSavePost: (postId, markdown) => {
      dispatch(sendPost(postId, markdown))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EsaEditor)
