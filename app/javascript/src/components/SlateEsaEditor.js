import React from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import Html from 'slate-html-serializer'
import Title from './Editor/Title'
import EditorUtils from './EditorUtils'

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

/**
 * Tags to blocks.
 *
 * @type {Object}
 */

const BLOCK_TAGS = {
  p: 'paragraph',
  li: 'list-item',
  ul: 'bulleted-list',
  ol: 'numbered-list',
  blockquote: 'quote',
  pre: 'code',
  h1: 'heading-one',
  h2: 'heading-two',
  h3: 'heading-three',
  h4: 'heading-four',
  h5: 'heading-five',
  h6: 'heading-six',
}

/**
 * Tags to marks.
 *
 * @type {Object}
 */

const MARK_TAGS = {
  strong: 'bold',
  em: 'italic',
  u: 'underline',
  s: 'strikethrough',
  code: 'code',
}

/**
 * Serializer rules.
 *
 * @type {Array}
 */

const RULES = [
  {
    deserialize(el, next) {
      const block = BLOCK_TAGS[el.tagName.toLowerCase()]
      if (!block) return
      return {
        object: 'block',
        type: block,
        nodes: next(el.childNodes),
      }
    },
  },
  {
    deserialize(el, next) {
      const mark = MARK_TAGS[el.tagName.toLowerCase()]
      if (!mark) return
      return {
        object: 'mark',
        type: mark,
        nodes: next(el.childNodes),
      }
    },
  },
  {
    // Special case for code blocks, which need to grab the nested childNodes.
    deserialize(el, next) {
      if (el.tagName.toLowerCase() != 'pre') return
      const code = el.childNodes[0]
      const childNodes =
        code && code.tagName.toLowerCase() == 'code'
          ? code.childNodes
          : el.childNodes

      return {
        object: 'block',
        type: 'code',
        nodes: next(childNodes),
      }
    },
  },
  {
    // Special case for images, to grab their src.
    deserialize(el, next) {
      if (el.tagName.toLowerCase() != 'img') return
      return {
        object: 'block',
        type: 'image',
        isVoid: true,
        nodes: next(el.childNodes),
        data: {
          src: el.getAttribute('src'),
        },
      }
    },
  },
  {
    // Special case for links, to grab their href.
    deserialize(el, next) {
      if (el.tagName.toLowerCase() != 'a') return
      return {
        object: 'inline',
        type: 'link',
        nodes: next(el.childNodes),
        data: {
          href: el.getAttribute('href'),
        },
      }
    },
  },
]

const serializer = new Html({ rules: RULES })

/**
 * The auto-markdown example.
 *
 * @type {Component}
 */

class SlateEsaEditor extends React.Component {
  /**
   * Deserialize the raw initial value.
   *
   * @type {Object}
   */

  state = {
    title: '',
    value: Value.fromJSON(initialValue),
  }

  componentWillMount() {
    this.props.fetchPost(this.props.post.id)
  }

  componentWillReceiveProps(nextProps) {
    const html = EditorUtils.convertMarkdownToHtml(nextProps.post.body)
    this.setState({
      title: nextProps.post.title,
      value: serializer.deserialize(html),
    })
  }

  /**
   * Get the block type for a series of auto-markdown shortcut `chars`.
   *
   * @param {String} chars
   * @return {String} block
   */

  getType = chars => {
    switch (chars) {
      case '*':
      case '-':
      case '+':
        return 'list-item'
      case '>':
        return 'block-quote'
      case '#':
        return 'heading-one'
      case '##':
        return 'heading-two'
      case '###':
        return 'heading-three'
      case '####':
        return 'heading-four'
      case '#####':
        return 'heading-five'
      case '######':
        return 'heading-six'
      default:
        return null
    }
  }

  componentDidMount() {

  }

  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value
    })
  }

  /**
   *
   * Render the example.
   *
   * @return {Component} component
   */

  render() {
    return (
      <div>
        <Title
          title={this.state.title}
          onChange={this.handleTitleChange}
        />
        <div className="markdown-body">
          <Editor
            placeholder="Write some markdown..."
            value={this.state.value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            renderNode={this.renderNode}
          />
          <pre>{JSON.stringify(this.state.value, null, '  ')}</pre>
        </div>
      </div>
    )
  }

  /**
   * Render a Slate node.
   *
   * @param {Object} props
   * @return {Element}
   */

  renderNode = props => {
    const { attributes, children, node } = props
    switch (node.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>
      case 'heading-three':
        return <h3 {...attributes}>{children}</h3>
      case 'heading-four':
        return <h4 {...attributes}>{children}</h4>
      case 'heading-five':
        return <h5 {...attributes}>{children}</h5>
      case 'heading-six':
        return <h6 {...attributes}>{children}</h6>
      case 'list-item':
        return <li {...attributes}>{children}</li>
    }
  }

  /**
   * On change.
   *
   * @param {Change} change
   */

  onChange = ({ value }) => {
    this.setState({ value })
  }

  /**
   * On key down, check for our specific key shortcuts.
   *
   * @param {Event} event
   * @param {Change} change
   */

  onKeyDown = (event, change) => {
    switch (event.key) {
      case ' ':
        return this.onSpace(event, change)
      case 'Backspace':
        return this.onBackspace(event, change)
      case 'Enter':
        return this.onEnter(event, change)
    }
  }

  /**
   * On space, if it was after an auto-markdown shortcut, convert the current
   * node into the shortcut's corresponding type.
   *
   * @param {Event} event
   * @param {Change} change
   */

  onSpace = (event, change) => {
    const { value } = change
    if (value.isExpanded) return

    const { startBlock, startOffset } = value
    const chars = startBlock.text.slice(0, startOffset).replace(/\s*/g, '')
    const type = this.getType(chars)

    if (!type) return
    if (type == 'list-item' && startBlock.type == 'list-item') return
    event.preventDefault()

    change.setBlock(type)

    if (type == 'list-item') {
      change.wrapBlock('bulleted-list')
    }

    change.extendToStartOf(startBlock).delete()
    return true
  }

  /**
   * On backspace, if at the start of a non-paragraph, convert it back into a
   * paragraph node.
   *
   * @param {Event} event
   * @param {Change} change
   */

  onBackspace = (event, change) => {
    const { value } = change
    if (value.isExpanded) return
    if (value.startOffset != 0) return

    const { startBlock } = value
    if (startBlock.type == 'paragraph') return

    event.preventDefault()
    change.setBlock('paragraph')

    if (startBlock.type == 'list-item') {
      change.unwrapBlock('bulleted-list')
    }

    return true
  }

  /**
   * On return, if at the end of a node type that should not be extended,
   * create a new paragraph below it.
   *
   * @param {Event} event
   * @param {Change} change
   */

  onEnter = (event, change) => {
    const { value } = change
    if (value.isExpanded) return

    const { startBlock, startOffset, endOffset } = value
    if (startOffset == 0 && startBlock.text.length == 0)
      return this.onBackspace(event, change)
    if (endOffset != startBlock.text.length) return

    if (
      startBlock.type != 'heading-one' &&
      startBlock.type != 'heading-two' &&
      startBlock.type != 'heading-three' &&
      startBlock.type != 'heading-four' &&
      startBlock.type != 'heading-five' &&
      startBlock.type != 'heading-six' &&
      startBlock.type != 'block-quote'
    ) {
      return
    }

    event.preventDefault()
    change.splitBlock().setBlock('paragraph')
    return true
  }
}

/**
 * Export.
 */

export default SlateEsaEditor
