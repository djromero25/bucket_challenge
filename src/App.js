import React, { Component } from 'react';
import './App.css';
import * as _ from 'lodash';
import 'whatwg-fetch';
import BucketCountdown from './components/BucketCountdown';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BucketCountdown />
      </div>
    );
  }
}

export default App;
