import Serializer from './../'
import Plain from 'slate-plain-serializer'
import { Value } from 'slate'

describe('#serialize', () => {
  const serializer = new Serializer()

  test('list', () => {
    expect(serializer.serialize(Value.fromJSON({
      document: {
        nodes: [
          {
            object: 'block',
            type: 'bulleted-list',
            nodes: [
              {
                object: 'block',
                type: 'list-item',
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
        ],
      },
    }))).toEqual("- あいうえお")
  })
})
