import React, { Fragment } from 'react'
import ContentEditable from 'react-contenteditable'

const Title = props => {
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

export default Title
