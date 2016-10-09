import React from 'react';
import { render } from 'react-dom';
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
import App from './containers/App';
import Home from './containers/Home';
import About from './containers/About';
import NotFound from './containers/NotFound';
import progressBar from './containers/ProgressBar';

injectTapEventPlugin();

const reducers = combineReducers({
  user: userReducer,
  list: listReducer,
  routing: routerReducer
});
const loggerMiddleware = createLogger();
const store = createStore(reducers, applyMiddleware(thunk, loggerMiddleware));
const history = syncHistoryWithStore(browserHistory, store);

render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={progressBar(App, { showProgress: false })}>
          <IndexRoute component={progressBar(Home)} />
          <Route path="about" component={About} />
          <Route path="*" component={NotFound} />
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
