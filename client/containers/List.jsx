import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';
import { pink500 } from 'material-ui/styles/colors';
import { Row, Col } from '../components/grid';
import FormAddTodo from '../components/forms/AddTodo';
import * as listActions from '../actions/list';
import * as formActions from '../actions/form';
import Todos from '../components/List/Todos';
import Unauthorized from '../components/Unauthorized';

const mapStateToProps = (state, ownProps) => ({
  list: state.list,
  addTodoForm: state.form.addTodoForm,
  listId: ownProps.params.listId
});
const mapDispatchToProps = dispatch => bindActionCreators({
  ...listActions,
  ...formActions
}, dispatch);

class ListContainer extends React.Component {
  static propTypes = {
    list: PropTypes.shape({
      isFetching: PropTypes.bool.isRequired, // eslint-disable-line react/no-unused-prop-types
      error: PropTypes.any, // eslint-disable-line react/no-unused-prop-types
      todos: PropTypes.array.isRequired // eslint-disable-line react/no-unused-prop-types
    }).isRequired,
    listId: PropTypes.string.isRequired,
    apiGetList: PropTypes.func.isRequired,
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
    this.handleOnTouchTapMenuItem = this.handleOnTouchTapMenuItem.bind(this);
  }

  componentDidMount() {
    this.fetchList();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.listId !== this.props.listId) {
      this.fetchList();
    }
  }

  componentWillUnmount() {
    this.canceler.cancelAll();
  }

  onSubmitFormAddTodo({ text }) {
    this.props.apiPostTodo(text)
      .then(() => { this.props.initAddTodoForm(); })
      .catch((err) => { this.props.updateAddTodoForm({ error: err.message }); });
  }

  fetchList() {
    this.props.apiGetList(this.props.listId);
  }

  handleOnTouchTapMenuItem(type, todo) {
    return (e) => {
      e.preventDefault();
      switch (type) {
        case 'COMPLETE': {
          const updatedTodo = Object.assign({}, todo, { completed: true });
          this.canceler.add(this.props.apiPutTodo(updatedTodo));
          break;
        }
        case 'DELETE': {
          const id = todo.id;
          this.canceler.add(this.props.apiDeleteTodo(id));
          break;
        }
        default:
          break;
      }
    };
  }

  render() {
    const { list, addTodoForm, updateAddTodoForm } = this.props;
    const completedTodos = list.todos.filter(t => t.completed);
    const doingTodos = list.todos.filter(t => !t.completed);

    const isUnathorized = !list.isFetching && list.error && list.error.status === 401;

    if (isUnathorized) {
      return <Unauthorized />;
    }

    if (list.isFetching) {
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
            <CardTitle title={list.name} />
            <FormAddTodo
              style={{ padding: '0 16px 16px 16px' }}
              form={addTodoForm}
              onUpdate={updateAddTodoForm}
              onSubmit={this.onSubmitFormAddTodo}
            />
          </Card>
        </Col>
        <Col xs={6}>
          <Todos type="DOING" todos={doingTodos} onTouchTapMenuItem={this.handleOnTouchTapMenuItem} />
        </Col>
        <Col xs={6} style={{ paddingLeft: '0' }}>
          <Todos type="COMPLETED" todos={completedTodos} />
        </Col>
      </Row>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
