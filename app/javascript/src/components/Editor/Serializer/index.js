import React from 'react'
import { Block } from 'slate'
import Html from 'slate-html-serializer'
import EditorUtils from './../../../utils/EditorUtils'

const BLOCK_TAGS = {
  p: 'paragraph',
  span: 'span',
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

const MARK_TAGS = {
  strong: 'bold',
  em: 'italic',
  u: 'underline',
  s: 'strikethrough',
  code: 'code',
}

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
    serialize(obj, children) {
      if (obj.object != 'block') return
      switch (obj.type) {
        case 'code':
          return (
            <pre>
              <code>{children}</code>
            </pre>
          )
        case 'paragraph':
          return <p>{children}</p>
        case 'quote':
          return <blockquote>{children}</blockquote>
        case 'heading-one':
          return <h1>{children}</h1>
      }
    },
  },
  {
    deserialize(el, next) {
      const type = MARK_TAGS[el.tagName.toLowerCase()]
      if (!type) return
      return {
        object: 'mark',
        type: type,
        nodes: next(el.childNodes),
      }
    },
    serialize(obj, children) {
      if (obj.object != 'mark') return
      switch (obj.type) {
        case 'bold':
          return <strong>{children}</strong>
        case 'italic':
          return <em>{children}</em>
        case 'underline':
          return <u>{children}</u>
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

export default class Serializer {
  serialize(value) {
    return this.serializeNode(0, value.document).replace(/\n+$/, '')
  }

  deserialize(markdown) {
    const html = EditorUtils.convertMarkdownToHtml(markdown)
    return serializer.deserialize(html)
  }

  serializeNode = (depth, node) => {
    if (node.object === 'document') {
      return node.nodes.map(node => this.serializeNode(depth, node)).join('\n')
    }

    if (node.object === 'block') {
      let text
      if (Block.isBlockList(node.nodes)) {
        if (node.type === 'bulleted-list') {
          depth++
        }
        text = node.nodes.map(node => this.serializeNode(depth, node)).join('\n')
      } else {
        text = node.text
      }

      switch (node.type) {
        case 'heading-one':
          return `# ${text}\n`
        case 'heading-two':
          return `## ${text}\n`
        case 'heading-three':
          return `### ${text}\n`
        case 'heading-four':
          return `#### ${text}\n`
        case 'heading-five':
          return `##### ${text}\n`
        case 'heading-six':
          return `###### ${text}\n`
        case 'paragraph':
          return `${text}\n`
        case 'bulleted-list':
          return `${text}\n`
        case 'list-item':
          return '  '.repeat(depth -1) + `- ${text}`
        default:
          return `${text}`
      }
    }
  }
}
