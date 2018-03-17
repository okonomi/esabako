import axios from 'axios'

const initialState = {
  postId: undefined,
  post: {
    title: '',
    body: '',
  }
}

export default function reducer(state = initialState, action) {
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
