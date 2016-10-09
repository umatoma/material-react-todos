import React from 'react';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import { cyan500 } from 'material-ui/styles/colors';

const cardStyle = {
  textAlign: 'center',
  padding: '32px',
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

const Home = () => (
  <Card style={cardStyle}>
    <CardTitle style={cardTitleStyle}>Welcome To Material React Todos</CardTitle>
    <CardText style={cardTextStyle}>Sample React Todo application.</CardText>
  </Card>
);

export default Home;
