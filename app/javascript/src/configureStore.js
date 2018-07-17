import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { reducer as notificationsReducer } from 'reapop'
import postReducer from './ducks/post'
import teamReducer from './ducks/team'

const configureStore = initialState =>
  createStore(
    combineReducers({
      post: postReducer,
      team: teamReducer,
      notifications: notificationsReducer(),
    }),
    initialState,
    applyMiddleware(thunk)
  )

 export default configureStore
