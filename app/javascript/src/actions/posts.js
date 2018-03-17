import axios from 'axios'

export const loadPost = post => ({
  type: 'LOAD_POST',
  post
})

export const fetchPost = postId => {
  console.log('logging')
  console.log(postId)

  return (dispatch, getState) => {
    axios.get(`/posts/${postId}.json`)
      .then(response => {
        dispatch(loadPost({
          title: response.data.name,
          body: response.data.body_md,
        }))
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export const savePost = (postId, markdown) => {
  return {
    type: 'SAVE_POST',
    postId,
    markdown
  }
}
