import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import CircularProgress from 'material-ui/CircularProgress';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import { pink500, blueGrey900 } from 'material-ui/styles/colors';
import * as userActions from '../actions/user';

const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = dispatch => bindActionCreators(userActions, dispatch);

class App extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    finishLoading: PropTypes.func.isRequired,
    apiGetUser: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
  };

  static styleFooter = {
    backgroundColor: blueGrey900,
    color: '#fff',
    textAlign: 'center',
    padding: '64px 0'
  };

  componentDidMount() {
    this.props
      .apiGetUser()
      .then(() => { this.props.finishLoading(); });
  }

  render() {
    const { children, isLoading } = this.props;

    if (isLoading) {
      return (
        <div style={{ width: '100vw', height: '100vh', textAlign: 'center' }}>
          <CircularProgress size={100} thickness={5} color={pink500} style={{ top: '50%', marginTop: '-50px' }} />
        </div>
      );
    }

    return (
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
          <footer style={App.styleFooter}>
            <span>Copyright (C) 2016 umatoma. All Rights Reserved.</span>
          </footer>
        </div>
        <Drawer open>
          <MenuItem primaryText="Top" leftIcon={<ChevronRight />} onTouchTap={() => { browserHistory.push('/'); }} />
          <MenuItem primaryText="About" leftIcon={<ChevronRight />} onTouchTap={() => { browserHistory.push('/about'); }} />
          <MenuItem primaryText="Help" leftIcon={<ChevronRight />} onTouchTap={() => { browserHistory.push('/help'); }} />
        </Drawer>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
