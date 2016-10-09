export const ACTIONS = {
  SET_USER: 'SET_USER'
};

export function setUser(user) {
  return { type: ACTIONS.SET_USER, payload: { user } };
}

export function apiGetUser() {
  return (dispatch) => {
    const user = {
      id: 'umatoma',
      lists: [
        { id: 'list_a', name: 'LIST_A' },
        { id: 'list_b', name: 'LIST_B' },
        { id: 'list_c', name: 'LIST_C' }
      ]
    };
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(setUser(user));
        resolve();
      }, 1500);
    });
  };
}
