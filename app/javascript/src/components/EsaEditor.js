import React from 'react'
import Editor from 'draft-js-plugins-editor'
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin'
import { EditorState, convertToRaw } from 'draft-js'
import axios from 'axios'
import EditorUtils from './EditorUtils'

const plugins = [
  createMarkdownShortcutsPlugin()
]

export default class EsaEditor extends React.Component {
  state = {
    title: '',
    editorState: EditorState.createEmpty()
  }

  componentWillMount() {
    // axios.get(`/posts/${this.props.postId}.json`)
    //   .then((response) => {
    //     const state = EditorUtils.convertHtmlToState(
    //       EditorUtils.convertMarkdownToHtml(response.data.body_md)
    //     )
    //     this.setState({
    //       title: response.data.name,
    //       editorState: EditorState.createWithContent(state)
    //     })
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })

    this.props.onLoadPost(this.props.postId)
  }

  onTitleChange = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  onChange = editorState => {
    this.setState({
      editorState,
    })
  }

  handleSaveClick = () => {
    const markdown = EditorUtils.convertHtmlToMarkdown(
      EditorUtils.convertStateToHtml(this.state.editorState.getCurrentContent())
    )

    this.props.onSave(this.props.postId, markdown)
  }

  render() {
    const state = this.state.editorState.getCurrentContent()
    const raw = convertToRaw(state)
    const html = EditorUtils.convertStateToHtml(state)
    const markdown = EditorUtils.convertHtmlToMarkdown(html)

    return (
      <React.Fragment>
        <button onClick={this.handleSaveClick}>Save</button>
        <div>
          <input type="text" value={this.state.title} onChange={this.onTitleChange} />
        </div>
        <div className="markdown-body">
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
          />
        </div>
        <hr />
        <div>
          <pre>{markdown}</pre>
        </div>
        <hr />
        <div>
          <pre>{html}</pre>
        </div>
        <hr />
        <div>
          <pre>{JSON.stringify(raw, null, '  ')}</pre>
        </div>
      </React.Fragment>
    )
  }
}
