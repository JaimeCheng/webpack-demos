import { helloWorld } from './helloworld'

import React from 'react'
import ReactDOM from 'react-dom'
import '../../common'
document.write(helloWorld())

import '../static/style.css'
import '../static/index.css'

class Index extends React.Component {
  render() {
    // a = 1 // 演示source-map
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