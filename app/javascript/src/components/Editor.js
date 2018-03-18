import React, { Component } from 'react'
import { Value } from 'slate'
import Html from 'slate-html-serializer'
import Title from './Editor/Title'
import SlateEditor from './Editor/SlateEditor'
import Serializer from './Editor/Serializer'

const initialValue = {
  "document": {
    "nodes": []
  }
}

const serializer = new Serializer()

export default class Editor extends Component {
  state = {
    title: '',
    value: Value.fromJSON(initialValue),
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
      <div>
        <Title
          title={this.state.title}
          onChange={this.handleTitleChange}
        />
        <SlateEditor
          value={this.state.value}
          onChange={this.handleEditorChange}
        />
      </div>
    )
  }
}
