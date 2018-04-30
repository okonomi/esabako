import { connect } from 'react-redux'
import { fetchPost, createPost, updatePost } from './../actions/posts'
import Editor from '../components/Editor';

const mapStateToProps = state => {
  return {
    team: state.team,
    post: state.post,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPost: (teamName, postNumber) => {
      dispatch(fetchPost(teamName, postNumber))
    },
    createPost: (teamName, title, markdown) => {
      dispatch(createPost(teamName, title, markdown))
    },
    updatePost: (teamName, postNumber, title, markdown) => {
      dispatch(updatePost(teamName, postNumber, title, markdown))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor)
