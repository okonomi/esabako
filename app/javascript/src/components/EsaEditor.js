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

const turndownService = new TurndownService({
  headingStyle: 'atx'
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

  onClickSave = () => {
    const markdown = stateToMarkdown(this.state.editorState.getCurrentContent())

    axios.patch(`/posts/${this.props.postId}.json`, {
      post: {
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
    const markdown = stateToMarkdown(this.state.editorState.getCurrentContent())
    const html = stateToHTML(this.state.editorState.getCurrentContent())

    return (
      <React.Fragment>
        <button onClick={this.onClickSave}>Save</button>
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
