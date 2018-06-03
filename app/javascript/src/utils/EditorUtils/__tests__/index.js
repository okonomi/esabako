import EditorUtils from './../'

describe('#convertMarkdownToHtml', () => {
  test('nested list', () => {
    const input = `
- aaa
  - bbb
`.trim()
    const expected = `<ul>
<li><span>aaa</span><ul>
<li><span>bbb</span></li>
</ul>
</li>
</ul>
`

    expect(EditorUtils.convertMarkdownToHtml(input)).toEqual(expected)
  })
})
