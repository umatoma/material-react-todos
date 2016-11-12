import _ from 'lodash';
import Promise from '../lib/promise';

export const ACTIONS = {
  SET_LIST: 'SET_LIST',
  ADD_TODO: 'ADD_TODO',
  UPDATE_TODO: 'UPDATE_TODO',
  REMOVE_TODO: 'REMOVE_TODO'
};

export function setList({ status, error, id, list }) {
  return { type: ACTIONS.SET_LIST, status, error, id, list };
}

export function addTodo(todo) {
  return { type: ACTIONS.ADD_TODO, payload: { todo } };
}

export function updateTodo(todo) {
  return { type: ACTIONS.UPDATE_TODO, payload: { todo } };
}

export function removeTodo(id) {
  return { type: ACTIONS.REMOVE_TODO, payload: { id } };
}

export function apiGetList(id) {
  return (dispatch) => {
    const todos = _.times(15).map(i => ({
      id: `${id}-${i}`,
      text: `Todo List ${id}-${i}`,
      completed: (Math.random() >= 0.5)
    }));
    const list = { id, name: id.toUpperCase(), todos };

    dispatch(setList({ status: 'REQUEST', id }));
    return new Promise((resolve) => {
      const t = _.random(100, 1000);
      setTimeout(() => { resolve(); }, t);
    })
    .then(() => {
      if (['list_a', 'listb', 'list_c'].includes(id)) {
        return dispatch(setList({ status: 'SUCCESS', id, list }));
      }

      const error = new Error('Unauthorized');
      error.status = 401;
      return dispatch(setList({ status: 'FAILURE', id, error }));
    });
  };
}

export function apiPostTodo(text) {
  return (dispatch, getState) => {
    const { list } = getState();
    const id = list.todos.length;
    const todo = { id, text, completed: false };
    return new Promise((resolve) => {
      setTimeout(() => { resolve(); }, 500);
    })
    .then(() => {
      if (todo.text.trim().length === 0) {
        return Promise.reject(new Error('This field is required.'));
      }
      return dispatch(addTodo(todo));
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

export function apiDeleteTodo(id) {
  return dispatch => new Promise((resolve) => {
    setTimeout(() => {
      dispatch(removeTodo(id));
      resolve();
    }, 500);
  });
}
