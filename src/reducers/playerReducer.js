import {FETCH_TEAM_PLAYERS1, SET_PLAYER1, SHOW_SNACKBAR, HIDE_SNACKBAR} from '../actions/types';


function playerData(state = {
    open: false
}, action){
    switch(action.type){
        case FETCH_TEAM_PLAYERS1:
            return {
                ...state,
                selectedTeam1: action.payload,
            };
        case SET_PLAYER1:
            return {
                ...state,
                player1: action.payload
            };
        case SHOW_SNACKBAR:
            return {
                ...state,
                open: true
            };
        case HIDE_SNACKBAR:
            return {
                ...state,
                open: false
            };
        default:
            return state;
    }
}

export default playerData;