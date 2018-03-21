import Serializer from './Serializer'
import Plain from 'slate-plain-serializer'
import { Value } from 'slate'

describe('#deserialize', () => {
  test('line breaks handling', () => {
    const value = Value.fromJSON({
      "object": "value",
      "document": {
        "object": "document",
        "data": {},
        "nodes": [
          {
            "object": "block",
            "type": "paragraph",
            "isVoid": false,
            "data": {},
            "nodes": [
              {
                "object": "text",
                "leaves": [
                  {
                    "object": "leaf",
                    "text": "あいうえお\nかきくけこ",
                    "marks": []
                  }
                ]
              }
            ]
          }
        ]
      }
    })

    const serializer = new Serializer()
    expect(serializer.serialize(value)).toEqual("あいうえお\nかきくけこ")
  })
})
