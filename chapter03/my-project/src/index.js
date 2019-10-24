import { helloWorld } from './helloworld'

import React from 'react'
import ReactDOM from 'react-dom'
document.write(helloWorld())

import './static/style.css'
import './static/index.css'

class Index extends React.Component {
  render() {
    return <div className="search-head">
      home
      <br />
    </div>
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
)