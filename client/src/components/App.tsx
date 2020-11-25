import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import StreamList from './streams/StreamList';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import StreamShow from './streams/StreamShow';
import Header from './Header';
import createBrowserHistory from '../history';

export default function App() {
  return (
    <>
      <Router history={createBrowserHistory}>
        <div>
          <Header />
          <Switch>
            <Route path='/' exact component={StreamList} />
            <Route path='/streams/new' component={StreamCreate} />
            <Route path='/streams/edit/:id' component={StreamEdit} />
            <Route path='/streams/delete/:id' component={StreamDelete} />
            <Route path='/streams/:id' component={StreamShow} />
          </Switch>
        </div>
      </Router>
    </>
  );
}
