import Serializer from './Serializer'
import Plain from 'slate-plain-serializer'
import { Value } from 'slate'

describe('#serialize', () => {
  test('line breaks handling', () => {
    const serializer = new Serializer()

    expect(serializer.serialize(Value.fromJSON({
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
                    "text": "あいうえお",
                    "marks": []
                  }
                ]
              }
            ]
          }
        ]
      }
    }))).toEqual("あいうえお")

    expect(serializer.serialize(Value.fromJSON({
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
    }))).toEqual("あいうえお\nかきくけこ")
  })
})
