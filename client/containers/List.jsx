import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as listActions from '../actions/list';
import * as formActions from '../actions/form';
import List from '../components/List';
import { completedTodosSelector, doingTodosSelector } from '../selectors/list';

const mapStateToProps = (state, ownProps) => ({
  listId: ownProps.params.listId,
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
    this.fetchList();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.listId !== this.props.listId) {
      this.fetchList();
    }
  }

  fetchList() {
    this.props.apiGetList(this.props.listId);
  }

  render() {
    return <List {...this.props} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
