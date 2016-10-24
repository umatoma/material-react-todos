const APP_KEY = 'todo';

export function storeStorage(store, setter) {
  const setItem = (key, value) => {
    localStorage.setItem(`${APP_KEY}:${key}`, value);
  };
  let prevState = {};
  let nextState = store.getState();
  store.subscribe(() => {
    [prevState, nextState] = [nextState, store.getState()];
    setter(prevState, nextState, setItem);
  });
}

export function loadStorage(store, keys, loader) {
  keys.forEach((key) => {
    const item = localStorage.getItem(`${APP_KEY}:${key}`);
    if (item !== undefined) {
      loader(key, item, store.dispatch);
    }
  });
}
