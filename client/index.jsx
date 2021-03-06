import React from 'react';
import { render } from 'react-dom';
import Immutable from 'immutable';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import userReducer from './reducers/user';
import listReducer from './reducers/list';
import formReducer from './reducers/form';
import App from './containers/App';
import Home from './containers/Home';
import List from './containers/List';
import About from './containers/About';
import NotFound from './containers/NotFound';
import Users from './containers//Users';
import { storeStorage, loadStorage } from './lib/store-storage';

injectTapEventPlugin();

const reducers = combineReducers({
  user: userReducer,
  list: listReducer,
  form: formReducer,
  routing: routerReducer
});
const loggerMiddleware = createLogger({
  stateTransformer: (state) => {
    const newState = {};
    for (const i of Object.keys(state)) {
      if (Immutable.Iterable.isIterable(state[i])) {
        newState[i] = state[i].toJS();
      } else {
        newState[i] = state[i];
      }
    }
    return newState;
  }
});
const middlewares = [thunk, loggerMiddleware];
const store = createStore(reducers, applyMiddleware(...middlewares));
const history = syncHistoryWithStore(browserHistory, store);

storeStorage(store, (prevState, nextState, setItem) => {
  if (prevState.user.random !== nextState.user.random) {
    setItem('user.random', nextState.user.random);
  }
});

loadStorage(store, ['user.random'], (key, item, dispatch) => {
  console.log(key, item);
});

render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="lists/:listId" component={List} />
          <Route path="about" component={About} />
          <Route path="users" component={Users} />
          <Route path="*" component={NotFound} />
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
