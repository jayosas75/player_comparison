import React, { Component } from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import {cyan500} from 'material-ui/styles/colors';
import {browserHistory} from 'react-router';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import * as actions from '../actions';
import RaisedButton from 'material-ui/RaisedButton';

let chosenTeam = null;
let chosenPosition = null;

function showTeamClicked(event) {
    console.log('this is team that was clicked: ', event.target.innerText);
    chosenTeam = event.target.innerText;
}
function showPositionClicked(event) {
    console.log('this is position that was clicked: ', event.target.innerText);
    chosenPosition = event.target.innerText;
}

const teams = [];

const NFLteams = ['Bears','Bengals','Bills','Broncos','Browns','Buccaneers','Colts','Cardinals','Chargers','Chiefs',
    'Cowboys','Dolphins','Eagles','Falcons','Giants','Jaguars','Lions','Packers','Panthers','Patriots','Redskins',
    'Raiders','Rams','Ravens','Saints','Seahawks','Steelers','Texans','Titans','Vikings','49ers'];

for (let i = 0; i < 31; i++ ) {
    teams.push(<MenuItem value={NFLteams[i]} key={i} primaryText={`${NFLteams[i]}`} onTouchTap={showTeamClicked.bind(this)} />);
}

const positions = [];

const NFLPositions = ['Quarterback', 'Running back', 'Wide receiver', 'Tight end', 'Kicker'];

for (let i = 0; i < 5; i++ ) {
    positions.push(<MenuItem value={NFLPositions[i]} key={i} primaryText={`${NFLPositions[i]}`} onTouchTap={showPositionClicked.bind(this)} />);
}

const player2 = {
    backgroundColor: 'white',
    height: 600,
    width: 525,
    float: 'right',
    margin: 'auto',
    textAlign: 'center',
    fontFamily: 'Roboto, sans-serif',
    display: 'inline-block',
};

const text ={
    color: 'black',
    fontSize: '3.0em',
};

const style = {
    marginRight: 20,
    disabledColor: 'white'
};

const dropDownStyle = {
    color: cyan500,
    customWidth: {
        width: 300,
        color: 'white',
    },
};

const buttonMargin = {
    margin: 12,
};



class SelectTeam1 extends Component {

    constructor(props) {
        super(props);
        this.state = {valueTeam: 'Bears',
            valuePosition: 'Quarterback'};
    }

    handleClickPlayer1(){

    }

    handleClickPlayer2(){

    }

    handleChange1 = (event, index, valueTeam) => this.setState({valueTeam});
    handleChange2 = (event, index, valuePosition) => this.setState({valuePosition});

    checkProps(){
        console.log(this.props);
    }

    submitTeam(){
        let values = {
            team: chosenTeam,
            position: chosenPosition
        };
        /*this.props.fetch_team_players2(values);*/
    }

    render(){
        return (
            <div className='cardHolder'>
                <Paper style={player2} zDepth={5}>
                    <h1 style={text}>Select</h1>
                    <h1 style={text}>Team and Position</h1>
                    <h1 style={text}>of Player 2</h1>
                    <br/>
                    <DropDownMenu style={dropDownStyle.customWidth}
                                  maxHeight={300}
                                  value={this.state.valueTeam}
                                  onChange={this.handleChange1}
                                  autoWidth={false}
                                  labelStyle={{ color: cyan500 }}
                                  className="toggleButton1"
                    >
                        {teams}
                    </DropDownMenu>
                    <br/>
                    <DropDownMenu style={dropDownStyle.customWidth}
                                  maxHeight={300}
                                  value={this.state.valuePosition}
                                  onChange={this.handleChange2}
                                  autoWidth={false}
                                  labelStyle={{ color: cyan500 }}
                    >
                        {positions}
                    </DropDownMenu>
                    <br/>
                    <RaisedButton label="Go" style={buttonMargin} onTouchTap={this.submitTeam.bind(this)}/>
                </Paper>
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

export default connect(mapStateToProps, actions)(SelectTeam1);
