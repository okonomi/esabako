import { connect } from 'react-redux'
import App from '../components/App'
import ActionCreator from './../action_creators'

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    onSavePost: (postId, markdown) => {
      dispatch(ActionCreator.savePost(postId, markdown))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
