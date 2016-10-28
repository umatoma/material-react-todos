import _ from 'lodash';
import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import UsersTable from '../components/Users/UsersTable';

class Users extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      users: [
        { id: 'tom', name: 'Tom', selected: false },
        { id: 'bob', name: 'Bob', selected: false },
        { id: 'john', name: 'John', selected: false },
        { id: 'taro', name: 'Taro', selected: false },
        { id: 'jiro', name: 'Jiro', selected: false }
      ]
    };
  }

  render() {
    const { users } = this.state;
    return (
      <div>
        <RaisedButton
          label="Shuffle"
          primary
          onTouchTap={() => {
            this.setState({ users: _.shuffle(users) });
          }}
        />
        <UsersTable users={users} />
      </div>
    );
  }
}

export default Users;
