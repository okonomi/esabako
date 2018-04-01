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
    const output = (
      <value>
        <document>
          <block type="bulleted-list">
            <block type="list-item">
              <block type="span">あいうえお</block>
            </block>
          </block>
        </document>
      </value>
    )
    expect(serializer.deserialize(input).toJSON()).toEqual((output).toJSON())
  })

  test('list in some items', () => {
    const input = `
- あいうえお
- かきくけこ
`.trim()
    const output = (
      <value>
        <document>
          <block type="bulleted-list">
            <block type="list-item">
              <block type="span">あいうえお</block>
            </block>
            <block type="list-item">
              <block type="span">かきくけこ</block>
            </block>
          </block>
        </document>
      </value>
    )
    expect(serializer.deserialize(input).toJSON()).toEqual((output).toJSON())
  })

  test('nested list', () => {
    const input = `
- あいうえお
  - かきくけこ
`.trim()
    const output = (
      <value>
        <document>
          <block type="bulleted-list">
            <block type="list-item">
              <block type="span">あいうえお</block>
              <block type="bulleted-list">
                <block type="list-item">
                  <block type="span">かきくけこ</block>
                </block>
              </block>
            </block>
          </block>
        </document>
      </value>
    )
    expect(serializer.deserialize(input).toJSON()).toEqual((output).toJSON())
  })
})
