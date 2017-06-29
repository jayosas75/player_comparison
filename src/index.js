import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import App from './components/app';
import Home from './components/home';
import SelectTeam1 from './components/select_team1';
import SelectTeam2 from './components/select_team2';
import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../src/reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
    <Provider store={store}>
        <Router history ={browserHistory}>
            <Route path="player_comparison/dist/index" component={App}>
                <IndexRoute component={Home}/>
                <Route path="select_team1" component={SelectTeam1}/>
                <Route path="select_team2" component={SelectTeam2}/>
            </Route>
        </Router>
    </Provider>
    , document.getElementById('root')
);