/** @jsx h */
import Serializer from './../../'
import Plain from 'slate-plain-serializer'
import { Value } from 'slate'
import h from 'slate-hyperscript'

describe('#deserialize', () => {
  const serializer = new Serializer()

  test('list', () => {
    expect(serializer.deserialize("- あいうえお")).toEqual(
      <value>
        <document>
          <block type="bulleted-list">
            <block type="list-item">
              あいうえお
            </block>
          </block>
        </document>
      </value>
    )
  })
})
