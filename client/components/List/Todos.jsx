/* eslint-disable react/no-unused-prop-types */
import React, { PropTypes } from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ActionDone from 'material-ui/svg-icons/action/done';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { blue500, green500, grey400 } from 'material-ui/styles/colors';

function rightIconMenu(onTouchTapMenuItem, todo) {
  return (
    <IconMenu
      iconButtonElement={
        <IconButton>
          <MoreVertIcon color={grey400} />
        </IconButton>
      }
    >
      <MenuItem onTouchTap={onTouchTapMenuItem('COMPLETE', todo)}>
        Complete
      </MenuItem>
      <MenuItem onTouchTap={onTouchTapMenuItem('DELETE', todo)}>
        Delete
      </MenuItem>
    </IconMenu>
  );
}

class Todos extends React.Component {
  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    type: PropTypes.string.isRequired,
    onTouchTapMenuItem: PropTypes.func
  };

  shouldComponentUpdate(nextProps) {
    return this.props.todos.length !== nextProps.todos.length;
  }

  render() {
    const { todos, type } = this.props;

    if (type === 'DOING') {
      return (
        <Card>
          <CardTitle title="Doing" />
          <List>
            {todos.map(todo =>
              <ListItem
                key={todo.id}
                leftIcon={<ActionAssignment color={blue500} />}
                primaryText={todo.text}
                rightIconButton={rightIconMenu(this.props.onTouchTapMenuItem, todo)}
              />
            )}
          </List>
        </Card>
      );
    }

    if (type === 'COMPLETED') {
      return (
        <Card>
          <CardTitle title="Completed" />
          <List>
            {todos.map(todo =>
              <ListItem
                key={todo.id}
                leftIcon={<ActionDone color={green500} />}
                primaryText={todo.text}
              />
            )}
          </List>
        </Card>
      );
    }

    return null;
  }
}

export default Todos;
