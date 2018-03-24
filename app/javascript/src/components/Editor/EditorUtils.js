import marked from 'marked'
import TurndownService from 'turndown'

marked.setOptions({
  breaks: true
})

const renderer = new marked.Renderer()
// renderer.paragraph = (text) => {
//   return `<p>${text}<br /></p>`
// }

const turndownService = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-'
})

export default class EditorUtils {
  static convertMarkdownToHtml(markdown) {
    return marked(markdown, { renderer })
  }

  static convertHtmlToMarkdown(html) {
    return turndownService.turndown(html)
  }
}
