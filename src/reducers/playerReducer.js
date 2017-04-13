import {FETCH_TEAM_PLAYERS1} from '../actions/types';


function playerData(state = {}, action){
    switch(action.type){
        case FETCH_TEAM_PLAYERS1:
            return {
                ...state,
                selectedTeam1: action.payload,
                buttonHidden: true,
            };
        default:
            return state;
    }
}

export default playerData;