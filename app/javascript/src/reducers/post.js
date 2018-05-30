const initialState = {
  number: undefined,
  title: '',
  body: '',
}

export default function post(state = initialState, action) {
  switch (action.type) {
    case 'LOAD_POST':
      return {
        ...state,
        ...action.post,
      }

    case 'SAVE_POST':
      return state
    default:
      return state
  }
}
