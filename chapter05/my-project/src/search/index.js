// document.write('我是search.js')

import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import common from '../../common';
import { a } from './tree-shaking';
import logo from '../static/logo.png';
import avatar from '../static/avatar.png';
import '../static/search.less';
import '../static/style.css';

class Search extends React.Component {
  constructor () {
    super(...arguments);
    this.state = {
      Text: null,
    };
  }

  loadComponent () {
    import('./text.js').then((Text) => {
      this.setState({
        Text: Text.default,
      });
    });
  }

  render () {
    const funcA = a();
    const { Text } = this.state;
    return (
      <div className="search-text">
        <span>{ common() }</span>
        { funcA }
        {' '}
Seacch Demo
        <br />
        { Text ? <Text /> : null }
        <img className="search-logo" src={logo} alt="logo" onClick={this.loadComponent.bind(this)} />
        <img className="search-head" src={avatar} alt="avatar" />
      </div>
    );
  }
}

ReactDOM.render(
  <Search />,
  document.getElementById('root'),
);
