import React, { Component } from 'react';
import './ResultsTable.css';


//This should be broken down into smaller components
class ResultsTable extends Component {

  render() {
    console.log('data',this.props.data)
    var rows = typeof this.props.data === 'string' ? this.props.data : this.props.data.map(row =>{
      return (
        <tr>
          <td>{row[0]}</td>
          <td>{row[1]}</td>
        </tr>
      );
    });

    return (
      <table className="results-table">
        <thead></thead>
        <tbody className="table">
          <tr>
            <th>{this.props.bucketOne}</th>
            <th>{this.props.bucketTwo}</th>
          </tr>
          {rows}
        </tbody>
      </table>
    );
  }
}

export default ResultsTable;