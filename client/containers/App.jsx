import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import { blueGrey900 } from 'material-ui/styles/colors';

const styleFooter = {
  backgroundColor: blueGrey900,
  color: '#fff',
  textAlign: 'center',
  padding: '64px 0'
};

const App = ({ children }) => (
  <MuiThemeProvider>
    <div>
      <div style={{ marginLeft: '256px' }}>
        <div style={{ minHeight: '100vh' }}>
          <AppBar
            title="Material React Todos"
            iconElementRight={
              <IconMenu
                iconButtonElement={
                  <IconButton><MoreVertIcon /></IconButton>
                }
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              >
                <MenuItem primaryText="Top" onTouchTap={() => { browserHistory.push('/'); }} />
                <MenuItem primaryText="About" onTouchTap={() => { browserHistory.push('/about'); }} />
                <MenuItem primaryText="Help" onTouchTap={() => { browserHistory.push('/help'); }} />
              </IconMenu>
            }
          />
          <div style={{ padding: '8px' }}>{children}</div>
        </div>
        <footer style={styleFooter}>
          <span>Copyright (C) 2016 umatoma. All Rights Reserved.</span>
        </footer>
      </div>
      <Drawer open>
        <MenuItem primaryText="Top" leftIcon={<ChevronRight />} onTouchTap={() => { browserHistory.push('/'); }} />
        <MenuItem primaryText="About" leftIcon={<ChevronRight />} onTouchTap={() => { browserHistory.push('/about'); }} />
        <MenuItem primaryText="Help" leftIcon={<ChevronRight />} onTouchTap={() => { browserHistory.push('/help'); }} />
      </Drawer>
    </div>
  </MuiThemeProvider>
);

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
