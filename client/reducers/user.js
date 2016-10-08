import { ACTIONS } from '../actions/user';

const initialState = {
  id: null,
  lists: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_USER:
      return Object.assign({}, state, action.payload.user);
    default:
      return state;
  }
};
