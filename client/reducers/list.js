import { Record, List } from 'immutable';
import { ACTIONS } from '../actions/list';

const ListStore = new Record({
  isFetching: true,
  error: null,
  id: '',
  name: '',
  todos: new List()
});

const setList = (state, action) => {
  switch (action.status) {
    case 'REQUEST':
      return new ListStore({ id: action.id });
    case 'SUCCESS':
      if (state.id !== action.id) return state;
      return state.set('isFetching', false)
        .set('error', null)
        .set('name', action.list.name)
        .set('todos', new List(action.list.todos));
    case 'FAILURE':
      if (state.id !== action.id) return state;
      return new ListStore().set('isFetching', false)
        .set('error', action.error);
    default:
      return state;
  }
};

export default (state = new ListStore(), action) => {
  switch (action.type) {
    case ACTIONS.SET_LIST:
      return setList(state, action);
    case ACTIONS.ADD_TODO:
      return state.todos.push(action.payload.todo);
    case ACTIONS.UPDATE_TODO: {
      const { todo } = action.payload;
      const idx = state.todos.findIndex(v => v.id === todo.id);
      return state.update('todos', todos => todos.update(idx, () => todo));
    }
    case ACTIONS.REMOVE_TODO: {
      const { id } = action.payload;
      const idx = state.todos.findIndex(v => v.id === id);
      return state.update('todos', todos => todos.delete(idx));
    }
    default:
      return state;
  }
};
