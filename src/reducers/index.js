import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import PlayerData from '../reducers/playerReducer';

const rootReducer = combineReducers({
    playerData: PlayerData,
    routing: routerReducer});

export default rootReducer;