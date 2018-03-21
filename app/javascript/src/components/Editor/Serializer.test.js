import Serializer from './Serializer'
import Plain from 'slate-plain-serializer'
import { Value } from 'slate'

describe('#serialize', () => {
  test('line breaks handling', () => {
    const serializer = new Serializer()

    expect(serializer.serialize(Value.fromJSON({
      document: {
        nodes: [
          {
            object: 'block',
            type: 'paragraph',
            nodes: [
              {
                object: 'text',
                leaves: [
                  {
                    text: 'あいうえお',
                  },
                ],
              },
            ],
          },
        ],
      },
    }))).toEqual("あいうえお")

    expect(serializer.serialize(Value.fromJSON({
      document: {
        nodes: [
          {
            object: 'block',
            type: 'paragraph',
            nodes: [
              {
                object: 'text',
                leaves: [
                  {
                    text: 'あいうえお\nかきくけこ',
                  },
                ],
              },
            ],
          },
        ],
      },
    }))).toEqual("あいうえお\nかきくけこ")
  })
})
