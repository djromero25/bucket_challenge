import React, { Component } from 'react';
import * as _ from 'lodash';
import 'whatwg-fetch';
import ResultsTable from './ResultsTable'

//This should be broken down into smaller components
class BucketCountdown extends Component {

  constructor(props) {
    super(props);
    this.getSolution = _.throttle(this.getSolution.bind(this), 200);
    this.state = {
      output: {
        solution: []
      }
    };
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }

  getSolution(){
    //basically reimplemented form functionality for speed
    //TODO use forms with React
    var formData = {
      bucketOne: this.refs.bucketOne.value,
      bucketTwo: this.refs.bucketTwo.value,
      finalWater: this.refs.finalWater.value
    };
    this.setState({
      bucketOne: formData.bucketOne,
      bucketTwo: formData.bucketTwo,
      output: {
        solution: 'loading'
      }
    });
    fetch('/buckets', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(this.checkStatus)
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        console.log('resp data', data)
        this.setState({output: data});
      })
      .catch(error => {
        console.log('request failed', error)
      })
  }

  render() {
    let button;
    if(this.state.output.solution !== 'loading'){
      button = <button onClick={this.getSolution}>Submit</button>;
    }
    return (
      <div>
        <h1>Bucket Challenge</h1>
        <p>Choose the sizes of the two buckets and the amount of water you'd like to measure and press submit to check the fastest solution (or if a solution exists).</p>
        <p>All Numbers have a range limit of 1 to 1000000</p>
        Bucket 1:
        <input type="number" ref="bucketOne" min="1" max="1000000" defaultValue="1"/>
        Bucket 2:
        <input type="number" ref="bucketTwo" min="1" max="1000000" defaultValue="5"/>
        Final Amount:
        <input type="number" ref="finalWater" min="1" max="1000000" defaultValue="3" />
        {button}
        <ResultsTable data={this.state.output.solution} bucketOne={this.state.bucketOne} bucketTwo={this.state.bucketTwo}></ResultsTable>
      </div>
    );
  }
}

export default BucketCountdown;
