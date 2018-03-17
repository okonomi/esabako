import Actions from './../actions'

const initialState = {
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case Actions.SAVE_POST:
      console.log('save')
      return state
    default:
      return state
  }
}
