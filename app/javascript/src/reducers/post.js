import axios from 'axios'

const initialState = {
  postId: undefined,
  post: {
    id: undefined,
    title: '',
    body: '',
  }
}

export default function post(state = initialState, action) {
  switch(action.type) {
    case 'LOAD_POST':
      return {
        ...state,
        post: action.post
      }

    case 'SAVE_POST':
      return state
    default:
      return state
  }
}
