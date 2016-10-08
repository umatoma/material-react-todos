import _ from 'lodash';

export const ACTIONS = {
  SET_TODOS: 'SET_TODOS',
  ADD_TODO: 'ADD_TODO',
  UPDATE_TODO: 'UPDATE_TODO'
};

export function setTodos(todos) {
  return { type: ACTIONS.SET_TODOS, payload: { todos } };
}

export function addTodo(todo) {
  return { type: ACTIONS.ADD_TODO, payload: { todo } };
}

export function updateTodo(todo) {
  return { type: ACTIONS.UPDATE_TODO, payload: { todo } };
}

export function apiGetTodos() {
  return (dispatch) => {
    const todos = _.times(10).map(i => ({
      id: i,
      text: `Todo List ${i}`,
      completed: (Math.random() >= 0.5)
    }));
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(setTodos(todos));
        resolve();
      }, 3000);
    });
  };
}

export function apiPostTodo(text) {
  return (dispatch, getState) => {
    const { todos } = getState();
    const id = todos.todos.length;
    const todo = { id, text, completed: false };
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(addTodo(todo));
        resolve();
      }, 500);
    });
  };
}

export function apiPutTodo(todo) {
  return dispatch => new Promise((resolve) => {
    setTimeout(() => {
      dispatch(updateTodo(todo));
      resolve();
    }, 500);
  });
}
