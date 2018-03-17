import axios from 'axios'

const loadPost = post => ({
  type: 'LOAD_POST',
  post
})

export const fetchPost = postId => {
  return (dispatch, getState) => {
    axios.get(`/posts/${postId}.json`)
      .then(response => {
        dispatch(loadPost({
          id: response.data.number,
          title: response.data.name,
          body: response.data.body_md,
        }))
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export const sendPost = (postId, title, markdown) => {
  return (dispatch, getState) => {
    axios.patch(`/posts/${postId}.json`, {
      post: {
        name: title,
        body_md: markdown,
      }
    })
      .then((response) => {
        console.log('saved')
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
