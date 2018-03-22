import Serializer from './../'
import Plain from 'slate-plain-serializer'
import { Value } from 'slate'

describe('#serialize', () => {
  const serializer = new Serializer()

  test('heading', () => {
    expect(serializer.serialize(Value.fromJSON({
      document: {
        nodes: [
          {
            object: 'block',
            type: 'heading-one',
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
          {
            object: 'block',
            type: 'paragraph',
            nodes: [
              {
                object: 'text',
                leaves: [
                  {
                    text: 'かきくけこ',
                  },
                ],
              },
            ],
          },
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
              {
                object: 'block',
                type: 'list-item',
                nodes: [
                  {
                    object: 'text',
                    leaves: [
                      {
                        text: 'かきくけこ',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            object: 'block',
            type: 'paragraph',
            nodes: [
              {
                object: 'text',
                leaves: [
                  {
                    text: 'さしすせそ',
                  },
                ],
              },
            ],
          },
        ],
      },
    }))).toEqual("# あいうえお\n\nかきくけこ\n\n- あいうえお\n- かきくけこ\n\nさしすせそ")
  })
})
