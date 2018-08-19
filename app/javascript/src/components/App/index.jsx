import React from 'react'
import NotificationsSystem from 'reapop'
import theme from 'reapop-theme-bootstrap'
import PostEditor from 'containers/PostEditor'

const App = () => {
  return (
    <div>
      <NotificationsSystem theme={theme} />
      <PostEditor />
    </div>
  )
}

export default App
