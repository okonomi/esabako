import { connect } from 'react-redux'
import Editor from '../components/EsaEditor'
import { fetchPost, savePost } from './../action_creators'
import EsaEditor from '../components/EsaEditor';

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadPost: postId => {
      dispatch(fetchPost(postId))
    },
    onSavePost: (postId, markdown) => {
      dispatch(savePost(postId, markdown))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EsaEditor)
