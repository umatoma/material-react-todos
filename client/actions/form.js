export const ACTIONS = {
  INIT_ADD_TODO_FORM: 'FORM/INIT_ADD_TODO_FORM',
  UPDATE_ADD_TODO_FORM: 'FORM/UPDATE_ADD_TODO_FORM'
};

export function initAddTodoForm() {
  return { type: ACTIONS.INIT_ADD_TODO_FORM };
}

export function updateAddTodoForm(form) {
  return { type: ACTIONS.UPDATE_ADD_TODO_FORM, form };
}
