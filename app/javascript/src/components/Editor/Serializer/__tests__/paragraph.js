import Serializer from './../'
import Plain from 'slate-plain-serializer'
import { Value } from 'slate'

describe('#serialize', () => {
  const serializer = new Serializer()

  test('paragraph', () => {
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
  })

  test('paragraph in linebreaks', () => {
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

  test('some paragraphs with linebreaks', () => {
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
          {
            object: 'block',
            type: 'paragraph',
            nodes: [
              {
                object: 'text',
                leaves: [
                  {
                    text: 'アイウエオ\nカキクケコ',
                  },
                ],
              },
            ],
          },
        ],
      },
    }))).toEqual("あいうえお\nかきくけこ\n\nアイウエオ\nカキクケコ")
  })
})
