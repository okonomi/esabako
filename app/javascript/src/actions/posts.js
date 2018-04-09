import axios from 'axios'

const loadPost = post => ({
  type: 'LOAD_POST',
  post
})

export const fetchPost = postNumber => {
  return (dispatch, getState) => {
    axios.get(`/posts/${postNumber}.json`)
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

export const sendPost = (postNumber, title, markdown) => {
  return (dispatch, getState) => {
    axios.patch(`/posts/${postNumber}.json`, {
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
