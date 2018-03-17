import React from 'react'
import Editor from './../containers/Editor'
import SlateEsaEditor from './../components/SlateEsaEditor'

const App = (props) => {
  return (
    <div>
      <SlateEsaEditor />
      <Editor />
    </div>
  )
}

export default App
