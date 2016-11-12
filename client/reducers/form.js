import { Record, Map } from 'immutable';
import { ACTIONS } from '../actions/form';

const FormState = new Record({
  addTodoForm: new Map({
    error: null,
    text: ''
  })
});

export default (state = new FormState(), action) => {
  switch (action.type) {
    case ACTIONS.INIT_ADD_TODO_FORM:
      return state.set('addTodoForm', new FormState().addTodoForm);
    case ACTIONS.UPDATE_ADD_TODO_FORM:
      return state.update('addTodoForm', addTodoForm => addTodoForm.merge(action.form));
    default:
      return state;
  }
};
