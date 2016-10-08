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
      lists: ['list_a', 'list_b', 'list_c']
    };
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(setUser(user));
        resolve();
      }, 1500);
    });
  };
}
