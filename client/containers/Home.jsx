import React from 'react';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import { cyan500, blue500, green500 } from 'material-ui/styles/colors';
import Pie from '../components/chartjs/Pie';

const cardStyle = {
  textAlign: 'center',
  padding: '32px',
  marginBottom: '8px',
  backgroundColor: cyan500
};

const cardTitleStyle = {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '32px',
  paddingBottom: 0
};

const cardTextStyle = {
  color: '#fff',
  fontSize: '20px'
};

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      labels: ['Doing', 'Completed'],
      datasets: [
        {
          data: [
            Math.floor(Math.random() * 50),
            Math.floor(Math.random() * 50)
          ],
          backgroundColor: [blue500, green500]
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <Card style={cardStyle}>
          <CardTitle style={cardTitleStyle}>Welcome To Material React Todos</CardTitle>
          <CardText style={cardTextStyle}>Sample React Todo application.</CardText>
        </Card>
        <Card style={{ padding: '32px' }}>
          <Pie
            labels={this.state.labels}
            datasets={this.state.datasets}
          />
        </Card>
      </div>
    );
  }
}

export default Home;
