import Actions from '../actions'

export default {
  loadPost: postId => ({
    type: Actions.LOAD_POST,
    postId,
  }),
  savePost: (postId, markdown) => {
    return {
      type: Actions.SAVE_POST,
      postId,
      markdown
    }
  }
}
