import { createAction } from 'redux-actions'
import axios from 'axios'
import { notify } from 'reapop'

const LOAD_POST = 'esabako/post/LOAD_POST'
const SAVE_POST = 'esabako/post/SAVE_POST'

const initialState = {
  number: undefined,
  title: '',
  body: '',
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_POST:
      return {
        ...state,
        ...action.payload,
      }

    case SAVE_POST:
      return state
    default:
      return state
  }
}

const loadPost = createAction(LOAD_POST)

export const fetchPost = (teamName, postNumber) => {
  return (dispatch, getState) => {
    axios
      .get(`/teams/${teamName}/posts/${postNumber}.json`)
      .then(response => {
        dispatch(
          loadPost({
            number: response.data.number,
            title: response.data.name,
            body: response.data.body_md,
          })
        )
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export const createPost = (teamName, title, markdown) => {
  return (dispatch, getState) => {
    axios
      .post(`/teams/${teamName}/posts.json`, {
        post: {
          name: title,
          body_md: markdown,
        },
      })
      .then(response => {
        dispatch(
          notify({
            message: 'created',
            status: response.status,
          })
        )
        dispatch(
          loadPost({
            number: response.data.number,
            title: response.data.name,
            body: response.data.body_md,
          })
        )
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export const updatePost = (teamName, postNumber, title, markdown) => {
  return (dispatch, getState) => {
    axios
      .patch(`/teams/${teamName}/posts/${postNumber}.json`, {
        post: {
          name: title,
          body_md: markdown,
        },
      })
      .then(response => {
        dispatch(
          notify({
            message: 'updated',
            status: response.status,
          })
        )
      })
      .catch(error => {
        console.log(error)
      })
  }
}
