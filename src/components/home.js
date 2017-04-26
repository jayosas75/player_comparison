import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';
import SelectTeam1 from '../components/select_team1';
import SelectTeam2 from '../components/select_team2';

class Home extends Component {
    render(){
        return (
            <div className='cardHolder'>
                <SelectTeam1 />
                <SelectTeam2 />
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        SelectedTeam1: state.playerData.SelectedTeam1,
        SelectedTeam2: state.playerData.SelectedTeam2,
        Player1: state.playerData.player1,
        Player2: state.playerData.player2,
    }
}

export default connect(mapStateToProps, actions)(Home);
