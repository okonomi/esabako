import EditorUtils from '../../src/utils/EditorUtils'

describe('#convertMarkdownToHtml', () => {
  test('nested list', () => {
    const input = `
- aaa
  - bbb
`.trim()
    const expected = `<ul>
<li>aaa<ul>
<li>bbb</li>
</ul>
</li>
</ul>
`

    expect(EditorUtils.convertMarkdownToHtml(input)).toEqual(expected)
  })
})
