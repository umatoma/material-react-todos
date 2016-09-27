import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { Card, CardText } from 'material-ui/Card';

injectTapEventPlugin();

render(
  <MuiThemeProvider>
    <div>
      <AppBar title="Material React Todos" />
      <Card>
        <CardText>Hello World!!</CardText>
      </Card>
    </div>
  </MuiThemeProvider>,
  document.getElementById('root')
);
