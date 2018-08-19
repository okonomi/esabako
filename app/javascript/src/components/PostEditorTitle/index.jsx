import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import ContentEditable from 'react-contenteditable'

const PostEditorTitle = props => {
  return (
    <Fragment>
      <ContentEditable
        tagName="h1"
        html={props.title}
        onChange={props.onChange}
      />
    </Fragment>
  )
}

PostEditorTitle.propTypes = {
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default PostEditorTitle
