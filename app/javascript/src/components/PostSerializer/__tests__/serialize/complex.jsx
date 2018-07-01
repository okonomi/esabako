/** @jsx h */
import Serializer from 'components/PostSerializer'
import Plain from 'slate-plain-serializer'
import { Value } from 'slate'
import h from 'slate-hyperscript'

describe('#serialize', () => {
  const serializer = new Serializer()

  test('heading', () => {
    expect(
      serializer.serialize(
        <value>
          <document>
            <block type="heading-one">あいうえお</block>
            <block type="paragraph">かきくけこ</block>
            <block type="bulleted-list">
              <block type="list-item">あいうえお</block>
              <block type="list-item">かきくけこ</block>
            </block>
            <block type="paragraph">さしすせそ</block>
          </document>
        </value>
      )
    ).toEqual(
      '# あいうえお\n\nかきくけこ\n\n- あいうえお\n- かきくけこ\n\nさしすせそ'
    )
  })
})
