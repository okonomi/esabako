/** @jsx h */
import Serializer from './../../'
import Plain from 'slate-plain-serializer'
import { Value } from 'slate'
import h from 'slate-hyperscript'

describe('#deserialize', () => {
  const serializer = new Serializer()

  test('list', () => {
    const input = `
- あいうえお
`.trim()
    expect(serializer.deserialize(input).toJSON()).toEqual((
      <value>
        <document>
          <block type="bulleted-list">
            <block type="list-item">
              あいうえお
            </block>
          </block>
        </document>
      </value>
    ).toJSON())
  })

  test('list in some items', () => {
    const input = `
- あいうえお
- かきくけこ
`.trim()

    expect(serializer.deserialize(input).toJSON()).toEqual((
      <value>
        <document>
          <block type="bulleted-list">
            <block type="list-item">
              あいうえお
            </block>
            <block type="list-item">
              かきくけこ
            </block>
          </block>
        </document>
      </value>
    ).toJSON())
  })

  test('nested list', () => {
    const input = `
- あいうえお
  - かきくけこ
`.trim()

    expect(serializer.deserialize(input).toJSON()).toEqual((
      <value>
        <document>
          <block type="bulleted-list">
            <block type="list-item">
              あいうえお
              <block type="bulleted-list">
                <block type="list-item">
                  かきくけこ
                </block>
              </block>
            </block>
          </block>
        </document>
      </value>
    ).toJSON())
  })
})
