import React from 'react'
import Editor from 'draft-js-plugins-editor'
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin'
import { EditorState, convertToRaw } from 'draft-js'
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
    this.props.onLoadPost(this.props.postId)
  }

  componentWillReceiveProps(nextProps) {
    const state = EditorUtils.convertHtmlToState(
      EditorUtils.convertMarkdownToHtml(nextProps.post.body)
    )
    this.setState({
      editorState: EditorState.createWithContent(state)
    })
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

    this.props.onSavePost(this.props.post.id, markdown)
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
