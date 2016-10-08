import { ACTIONS } from '../actions/todos';

const initialState = {
  todos: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_TODOS:
      return { ...state, todos: action.payload.todos };
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
