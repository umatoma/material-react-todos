import { ACTIONS } from '../actions/user';

const initialState = {
  isFetching: true,
  id: '',
  lists: [],
  random: Math.random()
};

const setUser = (state, action) => {
  switch (action.status) {
    case 'REQUEST':
      return Object.assign({}, state, initialState);
    case 'SUCCESS':
      console.log('update');
      return Object.assign({}, state, action.user, { isFetching: false, random: Math.random() });
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
