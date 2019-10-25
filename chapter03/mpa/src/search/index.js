// document.write('我是search.js')
'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import '../../common'
import logo from '../static/logo.png'
import avatar from '../static/avatar.png'
import '../static/search.less'
import '../static/style.css'

class Search extends React.Component {
  render () {
    return <div className="search-text">
      Seacch Demo
      <br />
      <img className="search-logo" src={ logo } />
      <img className="search-head" src={ avatar } />
    </div>
  }
}

ReactDOM.render(
  <Search />,
  document.getElementById('root')
)