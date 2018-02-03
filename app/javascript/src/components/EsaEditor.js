import React from 'react'
import Editor from 'draft-js-plugins-editor'
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin'
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import axios from 'axios'
import marked from 'marked'

const plugins = [
  createMarkdownShortcutsPlugin()
]

marked.setOptions({
  breaks: true
})

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
        const markup = marked(response.data.body_md)
        const blocksFromHTML = convertFromHTML(markup);
        const content = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );
        this.setState({
          editorState: EditorState.createWithContent(content)
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
