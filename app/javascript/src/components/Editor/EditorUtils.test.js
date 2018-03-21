import EditorUtils from './EditorUtils'

describe('#convertHtmlToMarkdown', () => {
  test('<br /> convertion', () => {

    expect(EditorUtils.convertHtmlToMarkdown('<p>あいうえお<br />かきくけこ</p>')).toEqual("あいうえお\nかきくけこ")
  })
})
