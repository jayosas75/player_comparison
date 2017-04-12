import { combineReducers } from 'redux';
import TodoReducer from './reducer_todos';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    todos: TodoReducer,
    form: formReducer
});

export default rootReducer;