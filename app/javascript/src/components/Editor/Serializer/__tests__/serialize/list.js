/** @jsx h */
import Serializer from './../../'
import Plain from 'slate-plain-serializer'
import { Value } from 'slate'
import h from 'slate-hyperscript'

describe('#serialize', () => {
  const serializer = new Serializer()

  test('list', () => {
    expect(
      serializer.serialize(
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
    ).toEqual('- あいうえお')
  })

  test('list with some items', () => {
    expect(
      serializer.serialize(
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
    ).toEqual('- あいうえお\n- かきくけこ')
  })

  test('nested list', () => {
    const input = (
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
    const output = `
- あいうえお
  - かきくけこ
`.trim()
    expect(serializer.serialize(input)).toEqual(output)
  })
})
