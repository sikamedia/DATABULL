import React, {Component} from 'react';
import { render } from 'react-dom';
import _ from 'lodash';
const d3 = require('d3');

class H1BGraph extends Component {

  constructor(props) {
    super(props);
    this.state = {rawData:[]};
    this.loadRawData = this.loadRawData.bind(this);
  }

  componentWillMount() {
    this.loadRawData();
  }

  loadRawData() {
    let dateFormat = d3.timeFormat('%m/%d/%Y');
    d3.csv(this.props.url)
      .row((d) => {
        if (!d['base salary']) {
          return null;
        }
        return {employer: d.employer,
          submit_date: dateFormat.parse(d['submit date']),
          start_date: dateFormat.parse(d['start date']),
          case_status: d['case status'],
          job_title: d['job title'],
          base_salary: Number(d['base salary']),
          salary_to: d['salary to'] ? Number(d['salary to']) : null,
          city: d.city,
          state: d.state};
      })
      .get((error, rows) => {
        if (error) {
          console.error(error);
          console.error(error.stack);
        }else{
          this.setState({rawData: rows});
        }
      });
  }

  render() {
    if (!this.state.rawData.length) {
      return (
        <h2>Loading data about 81,000 H1B visas in the software industry.</h2>
      );
    }

    return (
      <div className="row">
        <div className="col-md-12">
          <svg width="700" height="500">

          </svg>
        </div>
      </div>
    );
  }

}

render(
  <H1BGraph url="data/h1bs.csv"/>,
  document.querySelectorAll('.h1bgraph')[0]
);