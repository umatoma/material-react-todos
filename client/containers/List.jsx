import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as listActions from '../actions/list';
import * as formActions from '../actions/form';
import List from '../components/List';
import { completedTodosSelector, doingTodosSelector } from '../selectors/list';

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.list.isFetching,
  error: state.list.error,
  name: state.list.name,
  completedTodos: completedTodosSelector(state),
  doingTodos: doingTodosSelector(state),
  addTodoForm: state.form.addTodoForm,
  listId: ownProps.params.listId
});
const mapDispatchToProps = dispatch => bindActionCreators({
  ...listActions,
  ...formActions
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(List);
