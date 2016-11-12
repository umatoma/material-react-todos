import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as listActions from '../actions/list';
import * as formActions from '../actions/form';
import List from '../components/List';
import { completedTodosSelector, doingTodosSelector } from '../selectors/list';

const mapStateToProps = (state, ownProps) => ({
  listId: ownProps.params.listId,
  isUnathorized: !state.list.isFetching && state.list.error && state.list.error.status === 401,
  isFetching: state.list.isFetching,
  error: state.list.error,
  name: state.list.name,
  completedTodos: completedTodosSelector(state),
  doingTodos: doingTodosSelector(state),
  addTodoForm: state.form.addTodoForm
});
const mapDispatchToProps = dispatch => bindActionCreators({
  ...listActions,
  ...formActions
}, dispatch);

class ListContainer extends React.Component {
  static propTypes = {
    listId: PropTypes.string.isRequired,
    apiGetList: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.fetchList(this.props.listId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.listId !== this.props.listId) {
      this.fetchList(nextProps.params.listId);
    }
  }

  fetchList(listId) {
    this.props.apiGetList(listId);
  }

  render() {
    return <List {...this.props} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
