import { combineReducers } from 'redux'
import { reducer as notificationsReducer } from 'reapop'
import post from './post'

const reducer = combineReducers({
  post,
  notifications: notificationsReducer(),
})

export default reducer
