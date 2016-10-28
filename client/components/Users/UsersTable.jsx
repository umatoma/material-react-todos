import _ from 'lodash';
import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import TableRowCheck from './TableRowCheck';

class UsersTable extends React.Component {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.setUserSelected = this.setUserSelected.bind(this);
    this.selectAllUsers = this.selectAllUsers.bind(this);
    this.state = {
      isModalOpen: false,
      isAllSelected: false,
      users: props.users.map(
        user => Object.assign({}, user, { selected: false })
      )
    };
  }

  componentWillReceiveProps(nextProps) {
    const prevUserIds = _.mapValues(this.state.users, 'id');
    const nextUserIds = _.mapValues(nextProps.users, 'id');
    if (!_.isEqual(prevUserIds, nextUserIds)) {
      const users = nextProps.users.map(
        user => Object.assign({}, user, { selected: false })
      );
      this.setState({ isAllSelected: false, users });
    }
  }

  setUserSelected(userId) {
    return (event, checked) => {
      const users = this.state.users.map((user) => {
        if (user.id === userId) {
          return Object.assign({}, user, { selected: checked });
        }
        return user;
      });
      this.setState({ users });
    };
  }

  selectAllUsers(event, checked) {
    const users = this.state.users
      .map(user => Object.assign({}, user, { selected: checked }));
    this.setState({ isAllSelected: checked, users });
  }

  render() {
    const { isAllSelected, users, isModalOpen } = this.state;
    const selectedUsers = isModalOpen ? users.filter(u => u.selected) : [];
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={() => { this.setState({ isModalOpen: false }); }}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
      />
    ];
    return (
      <div>
        <RaisedButton
          label="Delete selected users"
          secondary
          onTouchTap={() => { this.setState({ isModalOpen: true }); }}
        />
        <table className="x-table-users">
          <thead>
            <TableRowCheck
              isHead
              checked={isAllSelected}
              onCheck={this.selectAllUsers}
            >
              <th>ID</th>
              <th>Name</th>
            </TableRowCheck>
          </thead>
          <tbody>
            {users.map(user =>
              <TableRowCheck
                key={user.id}
                checked={user.selected}
                onCheck={this.setUserSelected(user.id)}
              >
                <td>{user.id}</td>
                <td>{user.name}</td>
              </TableRowCheck>
            )}
          </tbody>
        </table>
        <Dialog
          modal
          title="Delete selected users"
          actions={actions}
          open={isModalOpen}
        >
          <List>
            {selectedUsers.map(user =>
              <ListItem key={user.id} primaryText={`${user.name} (${user.id})`} />
            )}
          </List>
        </Dialog>
      </div>
    );
  }
}

export default UsersTable;
