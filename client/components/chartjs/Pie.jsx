import React from 'react';
import { findDOMNode } from 'react-dom';
import Chart from 'chart.js';

class Pie extends React.Component {
  static propTypes = {
    labels: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    datasets: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  };

  constructor() {
    super();
    this.canvas = null;
    this.chart = null;
    this.state = { chart: null };
  }

  componentDidMount() {
    const element = findDOMNode(this.canvas);
    const ctx = element.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.props.labels,
        datasets: this.props.datasets
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    this.chart.data.labels = [...nextProps.labels];
    this.chart.data.datasets = [...nextProps.datasets];
    this.chart.update();
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  render() {
    return (<canvas ref={(ref) => { this.canvas = ref; }} />);
  }
}

export default Pie;
