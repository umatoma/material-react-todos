import { Record, List } from 'immutable';
import { ACTIONS } from '../actions/list';

const ListSate = new Record({
  isFetching: true,
  error: null,
  id: '',
  name: '',
  todos: new List()
});

window.hoge = new ListSate();

const setList = (state, action) => {
  switch (action.status) {
    case 'REQUEST':
      return new ListSate({ id: action.id });
    case 'SUCCESS':
      if (state.id !== action.id) return state;
      return state.set('isFetching', false)
        .set('error', null)
        .set('name', action.list.name)
        .set('todos', new List(action.list.todos));
    case 'FAILURE':
      if (state.id !== action.id) return state;
      return new ListSate().set('isFetching', false)
        .set('error', action.error);
    default:
      return state;
  }
};

export default (state = new ListSate(), action) => {
  switch (action.type) {
    case ACTIONS.SET_LIST:
      return setList(state, action);
    case ACTIONS.ADD_TODO:
      if (state.id !== action.listId) return state;
      return state.update('todos', todos => todos.push(action.todo));
    case ACTIONS.UPDATE_TODO: {
      if (state.id !== action.listId) return state;
      const idx = state.todos.findIndex(v => v.id === action.todo.id);
      return state.update('todos', todos => todos.update(idx, () => action.todo));
    }
    case ACTIONS.REMOVE_TODO: {
      if (state.id !== action.listId) return state;
      const idx = state.todos.findIndex(v => v.id === action.id);
      return state.update('todos', todos => todos.delete(idx));
    }
    default:
      return state;
  }
};
