import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, CardText } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import { blue500 } from 'material-ui/styles/colors';
import * as actions from '../actions/todos';

const mapStateToProps = state => ({ todos: state.todos });
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

class Home extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    finishLoading: PropTypes.func.isRequired,
    todos: PropTypes.shape({
      todos: React.PropTypes.array.isRequired
    }).isRequired,
    apiGetTodos: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props
      .apiGetTodos()
      .then(() => { this.props.finishLoading(); });
  }

  render() {
    const { todos } = this.props;
    if (this.props.isLoading) {
      return (
        <Card>
          <CardText>Now Loading</CardText>
        </Card>
      );
    }

    return (
      <Card>
        <List>
          {todos.todos.map(todo =>
            <ListItem
              key={todo.id}
              leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
              primaryText={todo.text}
            />
          )}
        </List>
      </Card>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
