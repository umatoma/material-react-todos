import React from 'react';
import { render } from 'react-dom';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import injectTapEventPlugin from 'react-tap-event-plugin';
import todosReducer from './reducers/todos';
import App from './containers/App';
import Home from './containers/Home';
import progressBar from './containers/ProgressBar';

injectTapEventPlugin();

const reducers = combineReducers({
  todos: todosReducer,
  routing: routerReducer
});
const loggerMiddleware = createLogger();
const store = createStore(reducers, applyMiddleware(thunk, loggerMiddleware));
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={progressBar(Home)} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
