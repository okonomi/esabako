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
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      editorState: EditorState.createEmpty()
    }
  }

  componentWillMount() {
    axios.get(`/posts/${this.props.postId}.json`)
      .then((response) => {
        const state = EditorUtils.convertHtmlToState(
          EditorUtils.convertMarkdownToHtml(response.data.body_md)
        )
        this.setState({
          title: response.data.name,
          editorState: EditorState.createWithContent(state)
        })
      })
      .catch((error) => {
        console.log(error)
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

  onClickSave = () => {
    const markdown = convertHtmlToMarkdown(
      stateToHTML(this.state.editorState.getCurrentContent())
    )

    axios.patch(`/posts/${this.props.postId}.json`, {
      post: {
        name: this.state.title,
        body_md: markdown
      }
    })
      .then((response) => {
        console.log('saved')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    const state = this.state.editorState.getCurrentContent()
    const raw = convertToRaw(state)
    const html = EditorUtils.convertStateToHtml(state)
    const markdown = EditorUtils.convertHtmlToMarkdown(html)

    return (
      <React.Fragment>
        <button onClick={this.onClickSave}>Save</button>
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
