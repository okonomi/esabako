import React, { Component } from 'react'
import { Value } from 'slate'
import Title from './Editor/Title'
import SlateEditor from './Editor/SlateEditor'
import Serializer from './Editor/Serializer'

const serializer = new Serializer()

export default class Editor extends Component {
  state = {
    title: '',
    value: serializer.deserialize(''),
  }

  componentWillMount() {
    this.props.fetchPost(this.props.post.id)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.post.title,
      value: serializer.deserialize(nextProps.post.body),
    })
  }

  handleSaveClick = () => {
    const markdown = serializer.serialize(this.state.value)
    this.props.sendPost(this.props.post.id, this.state.title, markdown)
  }

  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value
    })
  }

  handleEditorChange = ({ value }) => {
    this.setState({ value })
  }

  render() {
    return (
      <div className="container-fluid">
        <button onClick={this.handleSaveClick}>SAVE</button>
        <Title
          title={this.state.title}
          onChange={this.handleTitleChange}
        />
        <div className="row">
          <div className="col">
            <SlateEditor
              value={this.state.value}
              onChange={this.handleEditorChange}
            />
          </div>
          <div className="col">
            <pre>{serializer.serialize(this.state.value)}</pre>
          </div>
        </div>
      </div>
    )
  }
}
