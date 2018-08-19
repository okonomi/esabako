import React from 'react'
import PropTypes from 'prop-types'
import ContentEditable from 'react-contenteditable'

const PostEditorTitle = props => (
  <ContentEditable html={props.title} onChange={props.onChange} />
)

PostEditorTitle.propTypes = {
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default PostEditorTitle
