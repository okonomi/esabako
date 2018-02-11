import { ContentState, convertFromHTML } from 'draft-js';
import marked from 'marked'
import TurndownService from 'turndown'
import { stateToHTML } from 'draft-js-export-html'

marked.setOptions({
  breaks: true
})

const renderer = new marked.Renderer()
renderer.paragraph = (text) => {
  return `<p>${text}<br /></p>`
}

const turndownService = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-'
})

export default class EditorUtils {
  static convertMarkdownToHtml(markdown) {
    return marked(markdown, { renderer })
  }

  static convertHtmlToState(html) {
    const blocksFromHTML = convertFromHTML(html);
    return ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    )
  }

  static convertStateToHtml(contentState) {
    return stateToHTML(contentState)
  }

  static convertHtmlToMarkdown(html) {
    return turndownService.turndown(html)
  }
}
