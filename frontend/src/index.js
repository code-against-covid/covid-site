import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Database from './database'
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Error from './error'

ReactDOM.render(
  <Router>
    <Switch>
    <Route exact path='/'>
    <App />
    </Route>
    <Route path='/help'>
      <Database/>
    </Route>
    <Route path='*'>
      <Error/>
    </Route>
    </Switch>
    </Router>,
  document.getElementById('root')
);

