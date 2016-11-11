import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as listActions from '../actions/list';
import * as formActions from '../actions/form';
import List from '../components/List';

const mapStateToProps = (state, ownProps) => ({
  list: state.list,
  addTodoForm: state.form.addTodoForm,
  listId: ownProps.params.listId
});
const mapDispatchToProps = dispatch => bindActionCreators({
  ...listActions,
  ...formActions
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(List);
