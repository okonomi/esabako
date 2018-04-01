import marked from 'marked'
import TurndownService from 'turndown'

marked.setOptions({
  breaks: true
})

const renderer = new marked.Renderer()
renderer.listitem = text => {
  // テキスト部分を<span>で囲む
  text = text.replace(/^([^<]*)/, '<span>$1</span>')
  return `<li>${text}</li>\n`
}

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
