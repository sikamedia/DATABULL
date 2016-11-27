import React, {Component} from 'react';
const d3 = require('d3');

class Histogram extends Component {

  constructor(props) {
    super(props);
    this.updateD3 = this.updateD3.bind(this);
  }

  componentWillMount() {
    this.histogram = d3.histogram();
    this.widthScale = d3.scale.linear();
    this.yScale = d3.scale.linear();
    this.updateD3(this.props);
  }

  updateD3(props) {
    this.histogram.bins(props.bins).value(this.props.value);

    let bars = this.histogram(props.data),
      counts = bars.map((d) => {return d.y;});

    this.setState({bars});

    this.widthScale
      .domain([d3.min(counts)], d3.max(counts))
      .range([9, props.width-props.axisMargin]);

    this.yScale
      .domain([0, d3.max(bars.map((d) => {return d.x + d.dx;}))])
      .range([0, props.height-props.topMargin-props.bottomMargin]);
  }

  makeBar = (bar) => {
    let percent = bar.y / this.props.data.length * 100;

    let props = {
      percent,
      x: this.props.axisMargin,
      y: this.yScale(bar.x),
      width: this.widthScale(bar.y),
      height: this.yScale(bar.dx),
      key: 'histogram-bar-' + bar.x + '-' + bar.y
    }

    return (<HistogramBar {...props} />);
  }

  render() {
    let translate = 'translate(0, ' + this.pros.topMargin + ')';

    return (
      <g className="histogram" transform={translate}>
        <g className="bars">
          {this.state.bars.map(this.makeBar)}
        </g>
      </g>
    );
  }

}

export default Histogram;
