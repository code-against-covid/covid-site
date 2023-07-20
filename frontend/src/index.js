import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Database from './Pages/database'
import Team from './Pages/team'
import Donors from './Pages/Donors'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Error from './Pages/error'
import Tipjar from './Pages/tipjar'

ReactDOM.render(
  <Router>
    <main className="layout">
      <Switch>
        <Route exact path='/covid-site'>
          <App />
        </Route>
        <Route exact path='/covid-site/tipjar'>
          <Tipjar/>
        </Route>
        <Route path='/covid-site/help'>
          <Database />
        </Route>
        <Route path='/covid-site/team'>
          <Team />
        </Route>
        <Route path='/covid-site/donors'>
          <Donors />
        </Route>
        <Route path='*'>
          <Error />
        </Route>
      </Switch>
    </main>
  </Router>,
  document.getElementById('root')
);

