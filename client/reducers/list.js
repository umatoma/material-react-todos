import { ACTIONS } from '../actions/list';

const initialState = {
  isFetching: true,
  error: null,
  id: '',
  name: '',
  todos: []
};

const setList = (state, action) => {
  switch (action.status) {
    case 'REQUEST':
      return Object.assign({}, state, initialState);
    case 'SUCCESS':
      return Object.assign({}, state, action.list, { isFetching: false });
    case 'FAILURE':
      return Object.assign({}, state, { isFetching: false, error: action.error });
    default:
      return state;
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_LIST:
      return setList(state, action);
    case ACTIONS.ADD_TODO:
      return { ...state, todos: [action.payload.todo, ...state.todos] };
    case ACTIONS.UPDATE_TODO: {
      const { todo } = action.payload;
      const todos = state.todos.map(t => ((todo.id === t.id) ? todo : t));
      return { ...state, todos };
    }
    case ACTIONS.REMOVE_TODO: {
      const { id } = action.payload;
      const todos = state.todos.filter(t => (id !== t.id));
      return { ...state, todos };
    }
    default:
      return state;
  }
};
