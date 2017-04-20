import React, { Component } from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import {teal600} from 'material-ui/styles/colors';
import {browserHistory} from 'react-router';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import * as actions from '../actions';
import RaisedButton from 'material-ui/RaisedButton';

let chosenTeam = null;
let chosenPosition = null;
let submitButtonHit = false;

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


const player1 = {
    backgroundColor: 'rgba(50, 50, 50, 0.99)',
    color: teal600,
    height: 600,
    width: 525,
    margin: 'auto',
    textAlign: 'center',
    display: 'inline-block',
    fontFamily: 'Roboto, sans-serif',
};
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
    color: teal600,
    fontSize: '3.0em',
};
const text2 ={
    color: 'black',
    fontSize: '3.0em',
};

const style = {
    marginRight: 20,
    disabledColor: 'white'
};

const dropDownStyle = {
    color: teal600,
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

    handleTeamChange = (event, index, valueTeam) => this.setState({valueTeam});
    handlePositionChange = (event, index, valuePosition) => this.setState({valuePosition});

    checkProps(){
        console.log(this.props);
    }

    submitTeam(){
        let values = {
            team: chosenTeam,
            position: chosenPosition
        };
        this.props.fetch_team_players1(values);
        submitButtonHit = true;
    }

    renderPlayers(){
        if(submitButtonHit === true){
            return this.props.selectedTeam1.map(player => {
                return (
                        <li className="inline-block" key={player.PlayerID}>
                            <strong>{player.Name}</strong>
                        </li>
                )
            })
        } else {
            return;
        }
    }

    render(){
        return (
            <div className='cardHolder'>
                <Paper style={player1}
                       zDepth={5}
                       className={this.props.selectedTeam1 !== 'undefined' ? 'show' : 'hidden'}
                       onClick={this.checkProps.bind(this)}>
                    <h1 style={text}>Select</h1>
                    <h1 style={text}>Team and Position</h1>
                    <h1 style={text}>of Player 1</h1>
                    <br/>
                    <DropDownMenu style={dropDownStyle.customWidth}
                                  maxHeight={300}
                                  value={this.state.valueTeam}
                                  onChange={this.handleTeamChange}
                                  autoWidth={false}
                                  labelStyle={{ color: teal600 }}
                                  className="toggleButton1"
                     >
                        {teams}
                </DropDownMenu>
                    <br/>
                    <DropDownMenu style={dropDownStyle.customWidth}
                                  maxHeight={300}
                                  value={this.state.valuePosition}
                                  onChange={this.handlePositionChange}
                                  autoWidth={false}
                                  labelStyle={{ color: teal600 }}
                    >
                        {positions}
                    </DropDownMenu>
                    <br/>
                    <RaisedButton label="Go"
                                  style={buttonMargin}
                                  className={this.props.buttonHidden ? 'buttonHidden' : ''}
                                  onTouchTap={this.submitTeam.bind(this)}/>
                    {this.renderPlayers()}
                    <span id='showSelect'>Select Player</span>
                </Paper>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        selectedTeam1: state.playerData.selectedTeam1,
        selectedTeam2: state.playerData.selectedTeam2,
        player1: state.playerData.player1,
        player2: state.playerData.player2,
        buttonHidden: state.playerData.buttonHidden,
    }
}

export default connect(mapStateToProps, actions)(SelectTeam1);
