import { combineReducers } from 'redux'
import { reducer as notificationsReducer } from 'reapop'
import team from './team'
import post from './post'

const reducer = combineReducers({
  team,
  post,
  notifications: notificationsReducer(),
})

export default reducer
