import React from 'react'
import Editor from 'draft-js-plugins-editor'
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin'
import { stateToMarkdown } from 'draft-js-export-markdown'
import { stateToHTML } from 'draft-js-export-html'
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import axios from 'axios'
import marked from 'marked'
import TurndownService from 'turndown'

const plugins = [
  createMarkdownShortcutsPlugin()
]

marked.setOptions({
  breaks: true
})

const renderer = new marked.Renderer()
renderer.paragraph = (text) => {
  console.log(text)
  return `<p>${text}<br /></p>`
}

const turndownService = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-'
})

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
        console.log(response.data.body_md)

        const markup = marked(response.data.body_md, { renderer })
        console.log(markup)
        const blocksFromHTML = convertFromHTML(markup);
        const content = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );
        this.setState({
          title: response.data.name,
          editorState: EditorState.createWithContent(content)
        })
      })
      .catch((error) => {
        console.log(error);
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
    const markdown = stateToMarkdown(this.state.editorState.getCurrentContent())

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
    const raw = convertToRaw(this.state.editorState.getCurrentContent())
    const html = stateToHTML(this.state.editorState.getCurrentContent())
    // const markdown = stateToMarkdown(this.state.editorState.getCurrentContent())
    const markdown = turndownService.turndown(html)

    return (
      <React.Fragment>
        <button onClick={this.onClickSave}>Save</button>
        <div>
          <input type="text" value={this.state.title} onChange={this.onTitleChange} />
        </div>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
        />
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
