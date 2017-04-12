import { FETCH_TODOS, FETCH_TODO } from '../actions/index';

const INITIAL_STATE = {all: [], todo: null};

export default function(state = INITIAL_STATE, action){
    switch(action.type){
        case FETCH_TODOS:
            //can put all the code u want in here to update the state
            //can manipulate the state before sending it to DB
            return { ...state, all: action.payload.data };
        case FETCH_TODO:
            return { ...state, todo: action.payload.data};
        default:
            return state;
    }
}