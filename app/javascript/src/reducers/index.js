import Actions from './../actions'
import axios from 'axios'

const initialState = {
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case Actions.SAVE_POST:
      axios.patch(`/posts/${action.postId}.json`, {
        post: {
          body_md: action.markdown
        }
      })
        .then((response) => {
          console.log('saved')
        })
        .catch((error) => {
          console.log(error)
        })

      return state
    default:
      return state
  }
}
