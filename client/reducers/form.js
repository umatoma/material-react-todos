import update from 'react-addons-update';
import { ACTIONS } from '../actions/form';

const initialState = {
  addTodoForm: {
    error: null,
    text: ''
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.INIT_ADD_TODO_FORM:
      return Object.assign({}, state, { addTodoForm: initialState.addTodoForm });
    case ACTIONS.UPDATE_ADD_TODO_FORM:
      return update(state, { addTodoForm: { $merge: action.form } });
    default:
      return state;
  }
};
