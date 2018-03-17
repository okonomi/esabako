import Actions from '../actions'

export default {
  savePost: (postId, markdown) => {
    return {
      type: Actions.SAVE_POST,
      postId,
      markdown
    }
  }
}
