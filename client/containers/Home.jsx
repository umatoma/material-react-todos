import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, CardText } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
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
    apiGetTodos: PropTypes.func.isRequired,
    apiPostTodo: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.handleSubmitTodoForm = this.handleSubmitTodoForm.bind(this);
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
      <div>
        <Card style={{ padding: '16px', marginBottom: '8px' }}>
          <form onSubmit={this.handleSubmitTodoForm}>
            <TextField
              floatingLabelText="Todo"
              fullWidth
              onChange={(e) => { this.setState({ formTodo: e.target.value }); }}
              value={this.state.formTodo}
            />
          </form>
        </Card>
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
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
