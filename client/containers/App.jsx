import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import FileFolder from 'material-ui/svg-icons/file/folder';
import { blueGrey900, cyan500, white } from 'material-ui/styles/colors';
import * as userActions from '../actions/user';
import FullProgress from '../components/FullProgress';

const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = dispatch => bindActionCreators(userActions, dispatch);

class App extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    user: PropTypes.shape({
      isFetching: PropTypes.bool.isRequired, // eslint-disable-line react/no-unused-prop-types
      id: PropTypes.string.isRequired // eslint-disable-line react/no-unused-prop-types
    }).isRequired,
    apiGetUser: PropTypes.func.isRequired
  };

  static styleFooter = {
    backgroundColor: blueGrey900,
    color: '#fff',
    textAlign: 'center',
    padding: '64px 0'
  };

  static moveTo(path) {
    return () => { browserHistory.push(path); };
  }

  static iconElementLeft = (
    <IconMenu
      iconButtonElement={
        <IconButton>
          <NavigationMenu color={white} />
        </IconButton>
      }
    >
      <MenuItem primaryText="Top" onTouchTap={App.moveTo('/')} />
      <MenuItem primaryText="About" onTouchTap={App.moveTo('/about')} />
      <MenuItem primaryText="Help" onTouchTap={App.moveTo('/help')} />
    </IconMenu>
  );

  componentDidMount() {
    this.props
      .apiGetUser()
      .then(() => { console.log('finish apiGetUser'); })
      .catch((err) => { console.log(err.message); });
  }

  render() {
    const { children, user } = this.props;

    if (user.isFetching) {
      return <FullProgress />;
    }

    return (
      <div>
        <div style={{ marginLeft: '256px' }}>
          <div style={{ minHeight: '100vh' }}>
            <AppBar
              title="Material React Todos"
              iconElementLeft={App.iconElementLeft}
              iconElementRight={<FlatButton label={user.id} />}
            />
            <div style={{ padding: '8px' }}>{children}</div>
          </div>
          <footer style={App.styleFooter}>
            <span>Copyright (C) 2016 umatoma. All Rights Reserved.</span>
          </footer>
        </div>
        <Drawer open>
          {user.lists.map(list =>
            <MenuItem
              key={list.id}
              primaryText={list.name}
              leftIcon={<FileFolder color={cyan500} />}
              onTouchTap={App.moveTo(`/lists/${list.id}`)}
            />
          )}
        </Drawer>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
