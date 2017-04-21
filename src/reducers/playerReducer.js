import {FETCH_TEAM_PLAYERS1, SET_PLAYER1} from '../actions/types';


function playerData(state = {}, action){
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
        default:
            return state;
    }
}

export default playerData;