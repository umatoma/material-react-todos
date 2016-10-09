import _ from 'lodash';
import Promise from '../lib/promise';

export const ACTIONS = {
  SET_LIST: 'SET_LIST',
  ADD_TODO: 'ADD_TODO',
  UPDATE_TODO: 'UPDATE_TODO',
  REMOVE_TODO: 'REMOVE_TODO'
};

export function setList(list) {
  return { type: ACTIONS.SET_LIST, payload: { list } };
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
    return new Promise((resolve) => {
      setTimeout(() => { resolve(); }, 3000);
    })
    .then(() => { dispatch(setList(list)); });
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

export function apiDeleteTodo(id) {
  return dispatch => new Promise((resolve) => {
    setTimeout(() => {
      dispatch(removeTodo(id));
      resolve();
    }, 500);
  });
}
