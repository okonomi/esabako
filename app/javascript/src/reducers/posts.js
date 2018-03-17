import axios from 'axios'

const initialState = {
  postId: undefined,
  post: {
    id: undefined,
    title: '',
    body: '',
  }
}

export default function posts(state = initialState, action) {
  switch(action.type) {
    case 'LOAD_POST':
      console.log('load')
      console.log(action)
      return {
        post: action.post
      }

    case 'SAVE_POST':
      return state
    default:
      return state
  }
}
