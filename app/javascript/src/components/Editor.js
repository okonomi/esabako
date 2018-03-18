import React, { Component } from 'react'
import { Value } from 'slate'
import Html from 'slate-html-serializer'
import Title from './Editor/Title'
import SlateEditor from './Editor/SlateEditor'
import Serializer from './Editor/Serializer'

const initialValue = {
  "document": {
    "nodes": [
      {
        "object": "block",
        "type": "paragraph",
        "nodes": [
          {
            "object": "text",
            "leaves": [
              {
                "text":
                  "The editor gives you full control over the logic you can add. For example, it's fairly common to want to add markdown-like shortcuts to editors. So that, when you start a line with \"> \" you get a blockquote that looks like this:"
              }
            ]
          }
        ]
      },
      {
        "object": "block",
        "type": "block-quote",
        "nodes": [
          {
            "object": "text",
            "leaves": [
              {
                "text": "A wise quote."
              }
            ]
          }
        ]
      },
      {
        "object": "block",
        "type": "paragraph",
        "nodes": [
          {
            "object": "text",
            "leaves": [
              {
                "text":
                  "Order when you start a line with \"## \" you get a level-two heading, like this:"
              }
            ]
          }
        ]
      },
      {
        "object": "block",
        "type": "heading-two",
        "nodes": [
          {
            "object": "text",
            "leaves": [
              {
                "text": "Try it out!"
              }
            ]
          }
        ]
      },
      {
        "object": "block",
        "type": "paragraph",
        "nodes": [
          {
            "object": "text",
            "leaves": [
              {
                "text":
                  "Try it out for yourself! Try starting a new line with \">\", \"-\", or \"#\"s."
              }
            ]
          }
        ]
      }
    ]
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
