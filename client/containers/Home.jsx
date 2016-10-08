import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ActionDone from 'material-ui/svg-icons/action/done';
import { blue500, green500, grey400 } from 'material-ui/styles/colors';
import Row from '../components/grid/Row';
import Col from '../components/grid/Col';
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
    apiGetTodos: PropTypes.func.isRequired,
    apiPostTodo: PropTypes.func.isRequired,
    apiPutTodo: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.handleSubmitTodoForm = this.handleSubmitTodoForm.bind(this);
    this.handleOnTouchTapMenuItem = this.handleOnTouchTapMenuItem.bind(this);
    this.state = {
      formTodo: ''
    };
  }

  componentDidMount() {
    this.props
      .apiGetTodos()
      .then(() => { this.props.finishLoading(); });
  }

  handleSubmitTodoForm(e) {
    e.preventDefault();
    this.props
      .apiPostTodo(this.state.formTodo)
      .then(() => { this.setState({ formTodo: '' }); });
  }

  handleOnTouchTapMenuItem(type, todo) {
    return (e) => {
      e.preventDefault();
      switch (type) {
        case 'COMPLETE': {
          const updatedTodo = Object.assign({}, todo, { completed: true });
          this.props.apiPutTodo(updatedTodo);
          break;
        }
        case 'DELETE':
          console.log('DELETE', todo)
          break;
        default:
          break;
      }
    };
  }

  rightIconMenu(todo) {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton>
            <MoreVertIcon color={grey400} />
          </IconButton>
        }
      >
        <MenuItem onTouchTap={this.handleOnTouchTapMenuItem('COMPLETE', todo)}>
          Complete
        </MenuItem>
        <MenuItem onTouchTap={this.handleOnTouchTapMenuItem('DELETE', todo)}>
          Delete
        </MenuItem>
      </IconMenu>
    );
  }

  render() {
    const { todos } = this.props;
    const completedTodos = todos.todos.filter(t => t.completed);
    const doingTodos = todos.todos.filter(t => !t.completed);

    if (this.props.isLoading) {
      return (
        <Card>
          <CardText>Now Loading</CardText>
        </Card>
      );
    }

    return (
      <Row>
        <Col xs={12}>
          <Card style={{ padding: '16px' }}>
            <form onSubmit={this.handleSubmitTodoForm}>
              <TextField
                floatingLabelText="Todo"
                fullWidth
                onChange={(e) => { this.setState({ formTodo: e.target.value }); }}
                value={this.state.formTodo}
              />
            </form>
          </Card>
        </Col>
        <Col xs={6}>
          <Card>
            <CardTitle title="Doing" />
            <List>
              {doingTodos.map(todo =>
                <ListItem
                  key={todo.id}
                  leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
                  primaryText={todo.text}
                  rightIconButton={this.rightIconMenu(todo)}
                />
              )}
            </List>
          </Card>
        </Col>
        <Col xs={6} style={{ paddingLeft: '0' }}>
          <Card>
            <CardTitle title="Completed" />
            <List>
              {completedTodos.map(todo =>
                <ListItem
                  key={todo.id}
                  leftAvatar={<Avatar icon={<ActionDone />} backgroundColor={green500} />}
                  primaryText={todo.text}
                />
              )}
            </List>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
