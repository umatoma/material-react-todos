import { ACTIONS } from '../actions/todos';

const initialState = {
  todos: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_TODOS:
      return { ...state, todos: action.payload.todos };
    default:
      return state;
  }
};
