import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

const App = ({ children }) => (
  <MuiThemeProvider>
    <div>
      <AppBar title="Material React Todos" />
      <div>{children}</div>
    </div>
  </MuiThemeProvider>
);

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
