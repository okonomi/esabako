/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './../src/containers/App'
import configureStore from './../src/store/configureStore'

import 'github-markdown-css/github-markdown.css'
import 'bootstrap/dist/css/bootstrap.css'

document.addEventListener('turbolinks:load', () => {
  const elem = document.querySelector('[rel=esa-editor]')
  if (elem) {
    const postId = elem.getAttribute('post_id')

    const store = configureStore({ post: { id: postId } })

    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      elem
    )
  }
})
