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
          number: response.data.number,
          title: response.data.name,
          body: response.data.body_md,
        }))
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export const createPost = (title, markdown) => {
  return (dispatch, getState) => {
    axios.post('/posts.json', {
      post: {
        name: title,
        body_md: markdown,
      }
    })
      .then((response) => {
        console.log('created')
        dispatch(loadPost({
          number: response.data.number,
          title: response.data.name,
          body: response.data.body_md,
        }))
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export const updatePost = (postNumber, title, markdown) => {
  return (dispatch, getState) => {
    axios.patch(`/posts/${postNumber}.json`, {
      post: {
        name: title,
        body_md: markdown,
      }
    })
      .then((response) => {
        console.log('updated')
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
