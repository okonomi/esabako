import React from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';
import {stateToMarkdown} from 'draft-js-export-markdown';

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty(), md: ''};
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
      <div>
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
