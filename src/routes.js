import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Home from './components/todos_index';
import TodoNew from './components/todo_new';
import TodoView from './components/todo_view';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="todo-new" component={TodoNew} />
        <Route path="todo/:id" component={TodoView} />
    </Route>
)