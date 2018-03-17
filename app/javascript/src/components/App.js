import React from 'react'
import EsaEditor from './EsaEditor'

const App = (props) => {
  return (
    <div>
      <EsaEditor postId={props.postId} onSave={props.onSavePost} />
    </div>
  )
}

export default App
