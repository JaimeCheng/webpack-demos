import React from 'react';
import ReactDOM from 'react-dom';
import largeNumber from 'large-number';
import helloWorld from './helloworld';
import common from '../../common';
import bg from '../static/unsplash.jpg';

import '../static/style.css';
import '../static/index.css';

document.write(helloWorld());

class Index extends React.Component {
  render () {
    // a = 1 // 演示source-map
    const addRes = largeNumber('999', '543');
    return (
      <div className="search-head">
        <span>{common()}</span>
      home
        <br />
        <img src={bg} alt="bg" />
        <br />
        { addRes }
      </div>
    );
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root'),
);
