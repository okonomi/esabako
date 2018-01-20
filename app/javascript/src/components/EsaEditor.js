import React from 'react'
import Editor from 'draft-js-plugins-editor'
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin'
import { stateFromMarkdown } from 'draft-js-import-markdown'
import { EditorState } from 'draft-js'
import axios from 'axios'

const plugins = [
  createMarkdownShortcutsPlugin()
]

export default class EsaEditor extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      editorState: EditorState.createEmpty()
    }
  }

  componentWillMount() {
    axios.get(`/posts/${this.props.postId}.json`)
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
