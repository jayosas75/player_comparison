import axios from 'axios';
import { FETCH_TEAM_PLAYERS1, FETCH_TEAM_PLAYERS2, SET_PLAYER1, SET_PLAYER2,
         RESET_PLAYER1, RESET_PLAYER2, SHOW_SNACKBAR, HIDE_SNACKBAR, } from './types';

const BASE_URL = 'https://api.fantasydata.net/v3/nfl/stats/JSON/';
const API_KEY = {
    headers: {'Ocp-Apim-Subscription-Key': 'f3db805d5d56499eb11e3aa08864614f'}
};

export function showSnackBar(){
    return function(dispatch){
        dispatch({
            type: SHOW_SNACKBAR
        })
    }
}
export function hideSnackBar(){
    return function(dispatch){
        dispatch({
            type: HIDE_SNACKBAR
        })
    }
}

export function getPlayerData1(playerObj){
    return function(dispatch){
            dispatch({
                type: SET_PLAYER1,
                payload: playerObj
            });
    }
}

export function getPlayerData2(playerObj){
    return function(dispatch){
        dispatch({
            type: SET_PLAYER2,
            payload: playerObj
        });
    }
}

export function clearPlayer1(){
    return function(dispatch){
        dispatch({
            type: RESET_PLAYER1
        })
    }
}

export function clearPlayer2(){
    return function(dispatch){
        dispatch({
            type: RESET_PLAYER2
        })
    }
}

export function fetch_team_players1(values){
    let teamID = null;
    let position = null;
    switch(values.position){
        case 'Quarterback':
            position = 'QB';
            break;
        case 'Running back':
            position = 'RB';
            break;
        case 'Wide receiver':
            position = 'WR';
            break;
        case 'Tight end':
            position = 'TE';
            break;
        case 'Kicker':
            position = 'K';
            break;
    }
    switch(values.team){
        case 'Bears':
            teamID = 'CHI';
            break;
        case 'Bengals':
            teamID = 'CIN';
            break;
        case 'Bills':
            teamID = 'BUF';
            break;
        case 'Broncos':
            teamID = 'DEN';
            break;
        case 'Browns':
            teamID = 'CLE';
            break;
        case 'Buccaneers':
            teamID = 'TB';
            break;
        case 'Colts':
            teamID = 'IND';
            break;
        case 'Cardinals':
            teamID = 'ARI';
            break;
        case 'Chargers':
            teamID = 'SD';
            break;
        case 'Chiefs':
            teamID = 'KC';
            break;
        case 'Cowboys':
            teamID = 'DAL';
            break;
        case 'Dolphins':
            teamID = 'MIA';
            break;
        case 'Eagles':
            teamID = 'PHI';
            break;
        case 'Falcons':
            teamID = 'ATL';
            break;
        case 'Jaguars':
            teamID = 'JAC';
            break;
        case 'Jets':
            teamID = 'NYJ';
            break;
        case 'Giants':
            teamID = 'NYG';
            break;
        case 'Lions':
            teamID = 'DET';
            break;
        case 'Packers':
            teamID = 'GB';
            break;
        case 'Panthers':
            teamID = 'CAR';
            break;
        case 'Patriots':
            teamID = 'NE';
            break;
        case 'Redskins':
            teamID = 'WAS';
            break;
        case 'Raiders':
            teamID = 'OAK';
            break;
        case 'Rams':
            teamID = 'LA';
            break;
        case 'Ravens':
            teamID = 'BAL';
            break;
        case 'Saints':
            teamID = 'NO';
            break;
        case 'Seahawks':
            teamID = 'SEA';
            break;
        case 'Steelers':
            teamID = 'PIT';
            break;
        case 'Texans':
            teamID = 'HOU';
            break;
        case 'Titans':
            teamID = 'TEN';
            break;
        case 'Vikings':
            teamID = 'MIN';
            break;
        case '49ers':
            teamID = 'SF';
            break;
    }
        return function(dispatch){
            let smallerRoster = [];
            axios.get(`${BASE_URL}players/${teamID}`, API_KEY).then(resp => {
                for(let i =0; i < resp.data.length; i++){
                    if(resp.data[i].Position == position){
                        smallerRoster.push(resp.data[i]);
                    }
                }
                dispatch({
                    type: FETCH_TEAM_PLAYERS1,
                    payload: smallerRoster
                });
            }).catch((err) => {
                dispatch('error');
            })
        }
    }
export function fetch_team_players2(values){
    let teamID = null;
    let position = null;
    switch(values.position){
        case 'Quarterback':
            position = 'QB';
            break;
        case 'Running back':
            position = 'RB';
            break;
        case 'Wide receiver':
            position = 'WR';
            break;
        case 'Tight end':
            position = 'TE';
            break;
        case 'Kicker':
            position = 'K';
            break;
    }
    switch(values.team){
        case 'Bears':
            teamID = 'CHI';
            break;
        case 'Bengals':
            teamID = 'CIN';
            break;
        case 'Bills':
            teamID = 'BUF';
            break;
        case 'Broncos':
            teamID = 'DEN';
            break;
        case 'Browns':
            teamID = 'CLE';
            break;
        case 'Buccaneers':
            teamID = 'TB';
            break;
        case 'Colts':
            teamID = 'IND';
            break;
        case 'Cardinals':
            teamID = 'ARI';
            break;
        case 'Chargers':
            teamID = 'SD';
            break;
        case 'Chiefs':
            teamID = 'KC';
            break;
        case 'Cowboys':
            teamID = 'DAL';
            break;
        case 'Dolphins':
            teamID = 'MIA';
            break;
        case 'Eagles':
            teamID = 'PHI';
            break;
        case 'Falcons':
            teamID = 'ATL';
            break;
        case 'Jaguars':
            teamID = 'JAC';
            break;
        case 'Jets':
            teamID = 'NYJ';
            break;
        case 'Giants':
            teamID = 'NYG';
            break;
        case 'Lions':
            teamID = 'DET';
            break;
        case 'Packers':
            teamID = 'GB';
            break;
        case 'Panthers':
            teamID = 'CAR';
            break;
        case 'Patriots':
            teamID = 'NE';
            break;
        case 'Redskins':
            teamID = 'WAS';
            break;
        case 'Raiders':
            teamID = 'OAK';
            break;
        case 'Rams':
            teamID = 'LA';
            break;
        case 'Ravens':
            teamID = 'BAL';
            break;
        case 'Saints':
            teamID = 'NO';
            break;
        case 'Seahawks':
            teamID = 'SEA';
            break;
        case 'Steelers':
            teamID = 'PIT';
            break;
        case 'Texans':
            teamID = 'HOU';
            break;
        case 'Titans':
            teamID = 'TEN';
            break;
        case 'Vikings':
            teamID = 'MIN';
            break;
        case '49ers':
            teamID = 'SF';
            break;
    }
    return function(dispatch){
        let smallerRoster = [];
        axios.get(`${BASE_URL}players/${teamID}`, API_KEY).then(resp => {
            for(let i =0; i < resp.data.length; i++){
                if(resp.data[i].Position == position){
                    smallerRoster.push(resp.data[i]);
                }
            }
            dispatch({
                type: FETCH_TEAM_PLAYERS2,
                payload: smallerRoster
            });
        }).catch((err) => {
            dispatch('error');
        })
    }
}