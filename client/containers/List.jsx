import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ActionDone from 'material-ui/svg-icons/action/done';
import { blue500, green500, grey400 } from 'material-ui/styles/colors';
import { Row, Col } from '../components/grid';
import FormAddTodo from '../components/forms/AddTodo';
import * as listActions from '../actions/list';
import Canceler from '../lib/promise-canceler';

const mapStateToProps = (state, ownProps) => ({
  list: state.list,
  listId: ownProps.params.listId
});
const mapDispatchToProps = dispatch => bindActionCreators(listActions, dispatch);

class ListContainer extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    startLoading: PropTypes.func.isRequired,
    finishLoading: PropTypes.func.isRequired,
    list: PropTypes.shape({
      todos: React.PropTypes.array.isRequired // eslint-disable-line react/no-unused-prop-types
    }).isRequired,
    listId: PropTypes.string.isRequired,
    apiGetList: PropTypes.func.isRequired,
    apiPostTodo: PropTypes.func.isRequired,
    apiPutTodo: PropTypes.func.isRequired,
    apiDeleteTodo: PropTypes.func.isRequired,
    redirectToUnauthorized: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.onSubmitFormAddTodo = this.onSubmitFormAddTodo.bind(this);
    this.handleOnTouchTapMenuItem = this.handleOnTouchTapMenuItem.bind(this);
    this.canceler = new Canceler();
    this.state = {
      formTodo: ''
    };
  }

  componentDidMount() {
    this.fetchList();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.listId !== this.props.listId) {
      this.canceler.cancelAll();
      this.props.startLoading();
      this.fetchList();
    }
  }

  componentWillUnmount() {
    this.canceler.cancelAll();
  }

  onSubmitFormAddTodo({ text }) {
    const p = this.props.apiPostTodo(text);
    return this.canceler.add(p);
  }

  fetchList() {
    const p = this.props
      .apiGetList(this.props.listId)
      .then(() => {
        this.props.finishLoading();
      })
      .catch((err) => {
        if (err.status === 401) {
          this.props.redirectToUnauthorized();
        }
      });
    this.canceler.add(p);
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
    const { list } = this.props;
    const completedTodos = list.todos.filter(t => t.completed);
    const doingTodos = list.todos.filter(t => !t.completed);

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
          <Card>
            <CardTitle title={list.name} />
            <FormAddTodo style={{ padding: '0 16px 16px 16px' }} onSubmit={this.onSubmitFormAddTodo} />
          </Card>
        </Col>
        <Col xs={6}>
          <Card>
            <CardTitle title="Doing" />
            <List>
              {doingTodos.map(todo =>
                <ListItem
                  key={todo.id}
                  leftIcon={<ActionAssignment color={blue500} />}
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
                  leftIcon={<ActionDone color={green500} />}
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

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
