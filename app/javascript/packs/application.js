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
import Editor from 'draft-js-plugins-editor'
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin'
import { stateFromMarkdown } from 'draft-js-import-markdown'
import { EditorState } from 'draft-js'
import axios from 'axios'

const plugins = [
  createMarkdownShortcutsPlugin()
]

class EsaEditor extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      editorState: EditorState.createEmpty()
    }
  }

  componentWillMount() {
    axios.get('/posts/340.json')
      .then((response) => {
        console.log(response);
        this.setState({
          editorState: EditorState.createWithContent(stateFromMarkdown(response.data.body_md))
          // editorState: EditorState.createEmpty()
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChange = editorState => {
    this.setState({
      editorState,
    })
  }

  render() {
    return <div>
      <Editor
        editorState={this.state.editorState}
        onChange={this.onChange}
        plugins={plugins}
      />
    </div>
  }
}

document.addEventListener('turbolinks:load', () => {
  const elem = document.querySelector('[rel=esa-editor]')
  if (elem) {
    ReactDOM.render(
      <EsaEditor />,
      elem
    )
  }
})
