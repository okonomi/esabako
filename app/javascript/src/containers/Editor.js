import { connect } from 'react-redux'
import Editor from '../components/EsaEditor'
import ActionCreator from './../action_creators'
import EsaEditor from '../components/EsaEditor';

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadPost: postId => {
      dispatch(ActionCreator.loadPost(postId))
    },
    onSavePost: (postId, markdown) => {
      dispatch(ActionCreator.savePost(postId, markdown))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EsaEditor)
