import _ from 'lodash';

export const ACTIONS = {
  SET_TODOS: 'SET_TODOS'
};

export function setTodos(todos) {
  return { type: ACTIONS.SET_TODOS, payload: { todos } };
}

export function apiGetTodos() {
  return (dispatch) => {
    const todos = _.times(10).map(i => ({ id: i, text: `Todo List ${i}` }));
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(setTodos(todos));
        resolve();
      }, 3000);
    });
  };
}
