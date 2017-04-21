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
import Snackbar from 'material-ui/Snackbar';

let chosenTeam = null;
let chosenPosition = null;
let submitButtonHit = false;
let playerClicked = false;
let player1picked = null;

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


const showSelection = {
    backgroundColor: 'rgba(50, 50, 50, 0.99)',
    color: teal600,
    height: 600,
    width: 525,
    margin: 'auto',
    textAlign: 'center',
    display: 'inline-block',
    fontFamily: 'Roboto, sans-serif',
};

const hideSelection = {
    display: 'none',
    backgroundColor: 'rgba(50, 50, 50, 0.99)',
    color: teal600,
    height: 600,
    width: 525,
    margin: 'auto',
    textAlign: 'center',
    fontFamily: 'Roboto, sans-serif',
};

const showResults = {
    backgroundColor: 'rgba(50, 50, 50, 0.99)',
    color: teal600,
    height: 600,
    width: 525,
    margin: 'auto',
    textAlign: 'center',
    display: 'inline-block',
    fontFamily: 'Roboto, sans-serif',
};

const hideResults = {
    backgroundColor: 'rgba(50, 50, 50, 0.99)',
    color: teal600,
    height: 600,
    width: 525,
    margin: 'auto',
    textAlign: 'center',
    display: 'none',
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
    fontSize: '2em',
};
const text2 ={
    color: 'black',
    fontSize: '2em',
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
                      valuePosition: 'Quarterback',
                      open: false};
    }

    handleTeamChange = (event, index, valueTeam) => this.setState({valueTeam});
    handlePositionChange = (event, index, valuePosition) => this.setState({valuePosition});

    checkProps(){
        console.log(this.props);
    }

    displaySnackBar(){
        this.setState ({
            open: true
        });
    }

    closeSnackBar = () => {
        this.setState({
            open: false,
        });
    };

    submitTeam(){
        this.displaySnackBar();
        if(chosenTeam == null){
            chosenTeam = 'Bears';
        }
        if(chosenPosition == null){
            chosenPosition = 'Quarterback';
        }
        let values = {
            team: chosenTeam,
            position: chosenPosition
        };
        this.props.fetch_team_players1(values);
        submitButtonHit = true;
    }

    submitPlayer(event){
        console.log('pick player button hit');
        this.props.getPlayerData(player1picked);
    }

    setPlayerToState(event){
        event.persist();
        player1picked = event.target.value;
    };

    renderPlayers(){
        if(submitButtonHit === true){
            return this.props.selectedTeam1.map(player => {
                return (
                    <div key={player.PlayerID}>
                        <input type="radio" className="inline-block center"
                               name='player'
                               value={player.PlayerID}
                               onClick={this.setPlayerToState.bind(this)}>
                        </input>
                        <label htmlFor='player'>{player.Name}</label>
                        <br/>
                    </div>
                )
            })
        }
    }

    renderSubmitPlayerButton(){
        if(submitButtonHit === true){
            return (
                <RaisedButton label="Pick Player"
                              style={buttonMargin}
                              onTouchTap={this.submitPlayer.bind(this)}/>
            )
        }
    }

    render(){
        return (
            <div className='cardHolder'>
                <Paper style={this.props.player1 ? hideSelection : showSelection}
                       zDepth={5}
                       className='cardHolder'
                       onClick={this.checkProps.bind(this)}>
                    <h1 style={text}>Select</h1>
                    <h1 style={text}>Team and Position</h1>
                    <h1 style={text}>of Player 1</h1>
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
                    <RaisedButton label="Find Player"
                                  style={buttonMargin}
                                  onTouchTap={this.submitTeam.bind(this)}/>
                    <br/>
                    {this.renderPlayers()}
                    {this.renderSubmitPlayerButton()}
                    <Snackbar
                        open={this.state.open}
                        message="Team and Position Submitted, Loading..."
                        autoHideDuration={5000}
                        onRequestClose={this.closeSnackBar}
                    />
                </Paper>
                <Paper style={this.props.player1 ? showResults : hideResults}
                       zDepth={5}
                       className='cardHolder'
                       onClick={this.checkProps.bind(this)}>
                    <h1 style={text}>Results Page</h1>
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
    }
}

export default connect(mapStateToProps, actions)(SelectTeam1);
