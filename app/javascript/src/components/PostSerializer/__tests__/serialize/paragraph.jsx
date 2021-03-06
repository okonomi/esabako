/** @jsx h */
import Serializer from 'components/PostSerializer'
import h from 'slate-hyperscript'

describe('#serialize', () => {
  const serializer = new Serializer()

  test('paragraph', () => {
    expect(
      serializer.serialize(
        <value>
          <document>
            <block type="paragraph">あいうえお</block>
          </document>
        </value>
      )
    ).toEqual('あいうえお')
  })

  test('paragraph in linebreaks', () => {
    expect(
      serializer.serialize(
        <value>
          <document>
            <block type="paragraph">
              あいうえお
              {'\n'}
              かきくけこ
            </block>
          </document>
        </value>
      )
    ).toEqual('あいうえお\nかきくけこ')
  })

  test('some paragraphs with linebreaks', () => {
    expect(
      serializer.serialize(
        <value>
          <document>
            <block type="paragraph">
              あいうえお
              {'\n'}
              かきくけこ
            </block>
            <block type="paragraph">
              アイウエオ
              {'\n'}
              カキクケコ
            </block>
          </document>
        </value>
      )
    ).toEqual('あいうえお\nかきくけこ\n\nアイウエオ\nカキクケコ')
  })
})
