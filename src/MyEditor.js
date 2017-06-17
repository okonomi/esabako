import React from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';
import {stateToMarkdown} from 'draft-js-export-markdown';
import {stateFromMarkdown} from 'draft-js-import-markdown';
import axios from 'axios';
import './MyEditor.css';
import 'draft-js/dist/Draft.css';
// import AddressBar from './AddressBar';

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      md: '',
      post: null,
    };
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }
  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }
  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }
  render() {
    return (
      <div className='MyEditor'>
        <button onMouseDown={this._onBoldClick.bind(this)}>Bold</button>
        <button onMouseDown={(e) => {
          this.onChange(
            RichUtils.toggleBlockType(this.state.editorState, 'unordered-list-item')
          );
          e.preventDefault();
        }}>List</button>
        <button onMouseDown={(e) => {
          this.setState({
            md: stateToMarkdown(this.state.editorState.getCurrentContent())
          });
          e.preventDefault();
        }}>Export</button>
        <button onMouseDown={(e) => {
          var instance = axios.create({
            baseURL: 'http://localhost:8080',
            // timeout: 3000,
            headers: {
              'Authorization': 'Bearer a768efa2acb0757e4621b2902bf4364afa959d77185b7d8fbb1e46a8b66c8ef8',
              'Target-URL': 'https://api.esa.io',
            },
          });
          instance.get('/v1/teams/okonomi/posts/344')
            .then((response) => {
              console.log(response);

              this.setState({post: response.data});

              this.onChange(
                EditorState.createWithContent(stateFromMarkdown(
                  this.state.post.body_md
                ))
              )
            })
            .catch((error) => {
              console.log(error);
            });
        }}>Load</button>
        <button onMouseDown={(e) => {
          var post = this.state.post;
          post.body_md = stateToMarkdown(this.state.editorState.getCurrentContent());

          this.setState({post: post});

          var instance = axios.create({
            baseURL: 'http://localhost:8080',
            timeout: 1000,
            headers: {
              'Authorization': 'Bearer a768efa2acb0757e4621b2902bf4364afa959d77185b7d8fbb1e46a8b66c8ef8',
              'Target-URL': 'https://api.esa.io',
            }
          });
          instance.patch('/v1/teams/okonomi/posts/344', {
            post: post
          })
            .then((response) => {
              console.log(response);

              // this.props.onLoad(response);
            })
            .catch((error) => {
              console.log(error);
            });

          e.preventDefault();
        }}>Save</button>
        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
          onTab={(e) => {
              this.onChange(
              RichUtils.onTab(
                e,
                this.state.editorState,
                3
              )
            );
          }}
        />
        <pre>
          {this.state.md}
        </pre>
      </div>
    );
  }
}

export default MyEditor;
