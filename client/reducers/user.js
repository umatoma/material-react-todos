import { ACTIONS } from '../actions/user';

const initialState = {
  isFetching: true,
  id: '',
  lists: []
};

const setUser = (state, action) => {
  switch (action.status) {
    case 'REQUEST':
      return Object.assign({}, state, initialState);
    case 'SUCCESS':
      return Object.assign({}, state, action.user, { isFetching: false });
    case 'FAILURE':
      return Object.assign({}, state, { isFetching: false, error: action.error });
    default:
      return state;
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_USER:
      return setUser(state, action);
    default:
      return state;
  }
};
