import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';
import { pink500 } from 'material-ui/styles/colors';
import { Row, Col } from '../components/grid';
import FormAddTodo from '../components/forms/AddTodo';
import Todos from '../components/List/Todos';
import Unauthorized from '../components/Unauthorized';

export class ListComponent extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.instanceOf(Error),
    name: PropTypes.string.isRequired,
    completedTodos: ImmutablePropTypes.list.isRequired,
    doingTodos: ImmutablePropTypes.list.isRequired,
    apiPostTodo: PropTypes.func.isRequired,
    apiPutTodo: PropTypes.func.isRequired,
    apiDeleteTodo: PropTypes.func.isRequired,
    addTodoForm: PropTypes.shape().isRequired,
    initAddTodoForm: PropTypes.func.isRequired,
    updateAddTodoForm: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.onSubmitFormAddTodo = this.onSubmitFormAddTodo.bind(this);
    this.handleOnTouchTapCompleteMenu = this.handleOnTouchTapCompleteMenu.bind(this);
    this.handleOnTouchTapDeleteMenu = this.handleOnTouchTapDeleteMenu.bind(this);
  }

  onSubmitFormAddTodo({ text }) {
    this.props.apiPostTodo(text)
      .then(() => { this.props.initAddTodoForm(); })
      .catch((err) => { this.props.updateAddTodoForm({ error: err.message }); });
  }

  handleOnTouchTapCompleteMenu(todo) {
    const updatedTodo = Object.assign({}, todo, { completed: true });
    this.props.apiPutTodo(updatedTodo);
  }

  handleOnTouchTapDeleteMenu(todo) {
    const id = todo.id;
    this.props.apiDeleteTodo(id);
  }

  render() {
    const {
      isFetching, error, name, completedTodos, doingTodos, addTodoForm, updateAddTodoForm
    } = this.props;
    const isUnathorized = !isFetching && error && error.status === 401;

    if (isUnathorized) {
      return <Unauthorized />;
    }

    if (isFetching) {
      return (
        <div>
          <LinearProgress mode="indeterminate" color={pink500} />
          <Card>
            <CardText>Now Loading</CardText>
          </Card>
        </div>
      );
    }

    return (
      <Row>
        <Col xs={12}>
          <Card>
            <CardTitle title={name} />
            <FormAddTodo
              style={{ padding: '0 16px 16px 16px' }}
              form={addTodoForm}
              onUpdate={updateAddTodoForm}
              onSubmit={this.onSubmitFormAddTodo}
            />
          </Card>
        </Col>
        <Col xs={6}>
          <Todos
            type="DOING"
            todos={doingTodos}
            onTouchTapCompleteMenu={this.handleOnTouchTapCompleteMenu}
            onTouchTapDeleteMenu={this.handleOnTouchTapDeleteMenu}
          />
        </Col>
        <Col xs={6} style={{ paddingLeft: '0' }}>
          <Todos type="COMPLETED" todos={completedTodos} />
        </Col>
      </Row>
    );
  }
}

export default ListComponent;
