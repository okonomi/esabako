import { connect } from 'react-redux'
import * as postActions from './../ducks/post'
import Editor from '../components/Editor'

const mapStateToProps = state => {
  return {
    team: state.team,
    post: state.post,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPost: (teamName, postNumber) => {
      dispatch(postActions.fetchPost(teamName, postNumber))
    },
    createPost: (teamName, title, markdown) => {
      dispatch(postActions.createPost(teamName, title, markdown))
    },
    updatePost: (teamName, postNumber, title, markdown) => {
      dispatch(postActions.updatePost(teamName, postNumber, title, markdown))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor)
