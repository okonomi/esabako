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
          </document>
        </value>
      )
    ).toEqual('# あいうえお')
  })
})
