import React from 'react';
import ReactDOM from 'react-dom';
import helloWorld from './helloworld';
import common from '../../common';

import '../static/style.css';
import '../static/index.css';

document.write(helloWorld());

class Index extends React.Component {
  render () {
    // a = 1 // 演示source-map
    return (
      <div className="search-head">
        <span>{common()}</span>
      home
        <br />
      </div>
    );
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root'),
);
