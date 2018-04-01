/** @jsx h */
import { createHyperscript } from 'slate-hyperscript'

const h = createHyperscript({
  blocks: {
    heading: 'heading-one',
    paragraph: 'paragraph',
    span: 'span',
    ul_list: 'bulleted-list',
    ol_list: 'ordered-list',
    list_item: 'list-item'
  }
});

export default (
  <value>
    <document>
      <heading>Slate + List Edition</heading>
      <paragraph>
        This page is a basic example of Slate + slate-edit-list plugin.
        Press Enter in a list to create a new list item. Press Enter
        again to exit and Shift+Enter to create a paragraph in a list.
        The items at range are detected and highlighted, for
        demonstration purpose.
      </paragraph>
      <ul_list style={{ listStyleType: 'disc' }}>
        <list_item>
          <span>First item in the list</span>
        </list_item>
        <list_item>
          <paragraph>List item can contain blocks</paragraph>
          <heading>Here is a heading</heading>
          <paragraph>And another paragraph</paragraph>
        </list_item>
        <list_item>
          <span>
            Third item in the list, with a nested list
          </span>
          <ol_list style={{ listStyleType: 'decimal' }}>
            <list_item>
              <span>First item in the nested list</span>
            </list_item>
            <list_item>
              <span>
                Second item in the nested list
              </span>
            </list_item>
          </ol_list>
        </list_item>
      </ul_list>
      <paragraph>End paragraph</paragraph>
    </document>
  </value>
);
