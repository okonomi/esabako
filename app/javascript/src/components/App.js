import React from 'react'
import NotificationsSystem from 'reapop'
import theme from 'reapop-theme-bootstrap'
import Editor from './../containers/Editor'

const App = props => {
  return (
    <div>
      <NotificationsSystem theme={theme} />
      <Editor />
    </div>
  )
}

export default App
