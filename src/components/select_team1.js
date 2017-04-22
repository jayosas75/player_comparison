import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {lightBlue900} from 'material-ui/styles/colors';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import * as actions from '../actions';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

//globals to keep track of teams and players selected
let chosenTeam = null;
let chosenPosition = null;
let submitButtonHit = false;
let player1Info = null;

//drop down items for material-ui dropdown
const teams = [];
const NFLteams = ['Bears','Bengals','Bills','Broncos','Browns','Buccaneers','Colts','Cardinals','Chargers','Chiefs',
    'Cowboys','Dolphins','Eagles','Falcons','Giants','Jaguars','Jets', 'Lions','Packers','Panthers','Patriots','Redskins',
    'Raiders','Rams','Ravens','Saints','Seahawks','Steelers','Texans','Titans','Vikings','49ers'];
for (let i = 0; i < 31; i++ ) {
    teams.push(<MenuItem value={NFLteams[i]} key={i} primaryText={`${NFLteams[i]}`} onTouchTap={showTeamClicked.bind(this)} />);
}

function showTeamClicked(event) {
    chosenTeam = event.target.innerText;
}

const positions = [];
const NFLPositions = ['Quarterback', 'Running back', 'Wide receiver', 'Tight end', 'Kicker'];
for (let i = 0; i < 5; i++ ) {
    positions.push(<MenuItem value={NFLPositions[i]} key={i} primaryText={`${NFLPositions[i]}`} onTouchTap={showPositionClicked.bind(this)} />);
}
function showPositionClicked(event) {
    chosenPosition = event.target.innerText;
}

//styles and display settings for material-ui paper, buttons, and dropdown menu
const showSelection = {
    backgroundColor: 'lightgrey',
    color: lightBlue900,
    height: 600,
    minWidth: 300,
    maxWidth: 525,
    margin: 'auto',
    textAlign: 'center',
    display: 'inline-block',
    fontFamily: 'Roboto, sans-serif',
};

const hideSelection = {
    backgroundColor: 'lightgrey',
    color: lightBlue900,
    height: 600,
    minWidth: 375,
    maxWidth: 525,
    margin: 'auto',
    textAlign: 'center',
    display: 'none',
    fontFamily: 'Roboto, sans-serif',
};

const text ={
    color: 'white',
    fontSize: '2em',
};

const playerHeaderText = {
    color: lightBlue900,
    fontSize: '3.0em',
    fontFamily: 'Fantasy, sans-serif',
    textDecoration: 'underline'
};

const dropDownStyle = {
    color: lightBlue900,
    customWidth: {
        width: 300,
        color: 'white',
    },
};

const buttonMargin = {
    display: 'block',
    margin: 'auto',
    maxWidth: 130
};

const selectedMenuItemStyle = {
    color: lightBlue900,
};

//constructor for Component 1 to select first player
class SelectTeam1 extends Component {
    constructor(props) {
        super(props);
        this.state = {valueTeam: 'Bears',
                      valuePosition: 'Quarterback'};
    }

    //functions to set value selected from drop down menus
    handleTeamChange = (event, index, valueTeam) => this.setState({valueTeam});
    handlePositionChange = (event, index, valuePosition) => this.setState({valuePosition});

    //function to change state so snackbar will close
    closeSnackBar = () => {
        this.props.hideSnackBar();
    };

    //functions to submit team to database and to find player selected by playerID
    submitTeam(){
        this.props.showSnackBar();
        setTimeout(() => {
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
        }, 1000);
    }

    submitPlayer(){
        this.props.showSnackBar();
        setTimeout(() => {
            for(let i = 0; i < this.props.selectedTeam1.length; i++){
                if(this.props.selectedTeam1[i].PlayerID == player1Info){
                    this.props.getPlayerData1(this.props.selectedTeam1[i]);
                }
            }
        }, 2000);

    }

    setPlayerToState(event){
        event.persist();
        player1Info = event.target.value;
    };

    //function to populate player list of selected team and position as well as button to move onto result.
    renderPlayers(){
        if(submitButtonHit === true){
            return this.props.selectedTeam1.map(player => {
                return (
                    <div key={player.PlayerID} className="inputPosition">
                        <input type="radio" className="inline-block center"
                               name='player'
                               id={player.Name}
                               value={player.PlayerID}
                               onClick={this.setPlayerToState.bind(this)}>
                        </input>
                        <label htmlFor={player.Name}>{player.Name}</label>
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
                                  primary={true}
                                  onTouchTap={this.submitPlayer.bind(this)}/>
                )
            }
    };

    renderPlayerName(){
        if(this.props.player1){
            return (
                <h1 style={playerHeaderText}>{this.props.player1.Name}</h1>
            )
        } else {
            return (
                <h1>No Name</h1>
            )
        }
    }

    renderPlayerImg(){
        setTimeout(() => {
            if(this.props.player1){
                console.log('grabbing img, ', this.props.player1.PhotoUrl);
                return (
                    <img src="http://images.nike.com/is/image/DotCom/PDP_P/FT0225_201_A/v-flight-airlock-size-9-football.png?fmt=png-alpha" alt={'Football'} />
                )
            } else {
                return <p>Img Here</p>
            }
        }, 5000);
    }

    renderPlayerStats(){
        if(this.props.player1){
            switch(this.props.player1.Position){
                case "QB":
                    return (
                       <div>
                           <div className="halfPaper1">
                               <p className="statsLabel">Completion Percentage</p>
                               <p>{this.props.player1.PlayerSeason.PassingCompletionPercentage + '%'}</p>
                               <p className="statsLabel">Passing Yards</p>
                               <p>{this.props.player1.PlayerSeason.PassingYards}</p>
                               <p className="statsLabel">Passing Touchdowns</p>
                               <p>{parseInt(this.props.player1.PlayerSeason.PassingTouchdowns)}</p>
                               <p className="statsLabel">Interceptions</p>
                               <p>{parseInt(this.props.player1.PlayerSeason.PassingInterceptions)}</p>
                           </div>
                           <div className="halfPaper1">
                               <p className="statsLabel">Rushing Yards</p>
                               <p>{this.props.player1.PlayerSeason.RushingYards}</p>
                               <p className="statsLabel">Rushing Touchdowns</p>
                               <p>{parseInt(this.props.player1.PlayerSeason.RushingTouchdowns)}</p>
                               <p className="statsLabel">Fantasy Points</p>
                               <p>{this.props.player1.PlayerSeason.FantasyPointsPPR}</p>
                               <p className="statsLabel">Fumbles Lost</p>
                               <p>{parseInt(this.props.player1.PlayerSeason.FumblesLost)}</p>
                           </div>
                       </div>
                    );
                case "RB":
                    return (
                        <div>
                            <div className="halfPaper1">
                                <p className="statsLabel">Rushing Attempts</p>
                                <p>{parseInt(this.props.player1.PlayerSeason.RushingAttempts)}</p>
                                <p className="statsLabel">Rushing Yards</p>
                                <p>{this.props.player1.PlayerSeason.RushingYards}</p>
                                <p className="statsLabel">Rushing Touchdowns</p>
                                <p>{parseInt(this.props.player1.PlayerSeason.RushingTouchdowns)}</p>
                                <p className="statsLabel">Receptions</p>
                                <p>{parseInt(this.props.player1.PlayerSeason.Receptions)}</p>
                            </div>
                            <div className="halfPaper1">
                                <p className="statsLabel">Receiving Yards</p>
                                <p>{this.props.player1.PlayerSeason.ReceivingYards}</p>
                                <p className="statsLabel">Receiving Touchdowns</p>
                                <p>{parseInt(this.props.player1.PlayerSeason.ReceivingTouchdowns)}</p>
                                <p className="statsLabel">Fantasy Points</p>
                                <p>{this.props.player1.PlayerSeason.FantasyPointsPPR}</p>
                                <p className="statsLabel">Fumbles Lost</p>
                                <p>{parseInt(this.props.player1.PlayerSeason.FumblesLost)}</p>
                            </div>
                        </div>
                    );
                case "WR":
                    return (
                        <div>
                            <div className="halfPaper1">
                                <p className="statsLabel">Targets</p>
                                <p>{parseInt(this.props.player1.PlayerSeason.ReceivingTargets)}</p>
                                <p className="statsLabel">Receiving Yards</p>
                                <p>{this.props.player1.PlayerSeason.ReceivingYards}</p>
                                <p className="statsLabel">Receiving Touchdowns</p>
                                <p>{parseInt(this.props.player1.PlayerSeason.ReceivingTouchdowns)}</p>
                                <p className="statsLabel">Yards Per Reception</p>
                                <p>{this.props.player1.PlayerSeason.ReceivingYardsPerReception}</p>
                            </div>
                            <div className="halfPaper1">
                                <p className="statsLabel">Receptions</p>
                                <p>{parseInt(this.props.player1.PlayerSeason.Receptions)}</p>
                                <p className="statsLabel">Offensive Snaps Played</p>
                                <p>{parseInt(this.props.player1.PlayerSeason.OffensiveSnapsPlayed)}</p>
                                <p className="statsLabel">Fantasy Points</p>
                                <p>{this.props.player1.PlayerSeason.FantasyPointsPPR}</p>
                                <p className="statsLabel">Fumbles Lost</p>
                                <p>{parseInt(this.props.player1.PlayerSeason.FumblesLost)}</p>
                            </div>
                        </div>
                    );
                case "TE":
                    return (
                        <div>
                            <div className="halfPaper1">
                                <p className="statsLabel">Targets</p>
                                <p>{parseInt(this.props.player1.PlayerSeason.ReceivingTargets)}</p>
                                <p className="statsLabel">Receiving Yards</p>
                                <p>{this.props.player1.PlayerSeason.ReceivingYards}</p>
                                <p className="statsLabel">Receiving Touchdowns</p>
                                <p>{parseInt(this.props.player1.PlayerSeason.ReceivingTouchdowns)}</p>
                                <p className="statsLabel">Yards Per Reception</p>
                                <p>{this.props.player1.PlayerSeason.ReceivingYardsPerReception}</p>
                            </div>
                            <div className="halfPaper1">
                                <p className="statsLabel">Receptions</p>
                                <p>{parseInt(this.props.player1.PlayerSeason.Receptions)}</p>
                                <p className="statsLabel">Offensive Snaps Played</p>
                                <p>{parseInt(this.props.player1.PlayerSeason.OffensiveSnapsPlayed)}</p>
                                <p className="statsLabel">Fantasy Points</p>
                                <p>{this.props.player1.PlayerSeason.FantasyPointsPPR}</p>
                                <p className="statsLabel">Fumbles Lost</p>
                                <p>{parseInt(this.props.player1.PlayerSeason.FumblesLost)}</p>
                            </div>
                        </div>
                    )
                case "K":
                    return (
                        <div>
                            <p className="statsLabel">Field Goal Percentage</p>
                            <p>{this.props.player1.PlayerSeason.FieldGoalPercentage + '%'}</p>
                            <p className="statsLabel">40+ Yard Field Goals</p>
                            <p>{parseInt(this.props.player1.PlayerSeason.FieldGoalsMade40to49)}</p>
                            <p className="statsLabel">50+ Yard Field Goals</p>
                            <p>{parseInt(this.props.player1.PlayerSeason.FieldGoalsMade50plus)}</p>
                            <p className="statsLabel">Extra Points Made</p>
                            <p>{parseInt(this.props.player1.PlayerSeason.ExtraPointsMade)}</p>
                            <p className="statsLabel">Fantasy Points</p>
                            <p>{parseInt(this.props.player1.PlayerSeason.FantasyPointsPPR)}</p>
                        </div>
                    )
            }
        }
    }

    render(){
        return (
            <div className='cardHolder'>
                <Paper style={this.props.player1 ? hideSelection : showSelection}
                       zDepth={5}
                       className='cardHolder'>
                    <h1 style={text}>Select</h1>
                    <h1 style={text}>Team and Position</h1>
                    <h1 style={text}>of Player 1</h1>
                    <DropDownMenu style={dropDownStyle.customWidth}
                                  maxHeight={300}
                                  value={this.state.valueTeam}
                                  onChange={this.handleTeamChange}
                                  autoWidth={false}
                                  labelStyle={{ color: lightBlue900 }}
                                  className="toggleButton1"
                                  selectedMenuItemStyle={selectedMenuItemStyle}
                                  animated={true}
                     >
                        {teams}
                </DropDownMenu>
                    <br/>
                    <DropDownMenu style={dropDownStyle.customWidth}
                                  maxHeight={300}
                                  value={this.state.valuePosition}
                                  onChange={this.handlePositionChange}
                                  autoWidth={false}
                                  labelStyle={{ color: lightBlue900 }}
                                  selectedMenuItemStyle={selectedMenuItemStyle}
                                  animated={true}
                    >
                        {positions}
                    </DropDownMenu>
                    <br/>
                    <Snackbar
                        open={this.props.open}
                        message="Specifications Submitted, Loading..."
                        autoHideDuration={5000}
                        onRequestClose={this.closeSnackBar}
                    />
                    <RaisedButton label="Find Player"
                                  style={buttonMargin}
                                  primary={true}
                                  onTouchTap={this.submitTeam.bind(this)}/>
                    <br/>
                    {this.renderPlayers()}
                    {this.renderSubmitPlayerButton()}

                </Paper>
                <Paper style={this.props.player1 ? showSelection : hideSelection}
                       zDepth={5}
                       className='cardHolder'>
                    {this.renderPlayerName()}
                    <br/>
                    {this.renderPlayerImg()}
                    <br/>
                    {this.renderPlayerStats()}
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
        open: state.playerData.open,
    }
}

export default connect(mapStateToProps, actions)(SelectTeam1);
