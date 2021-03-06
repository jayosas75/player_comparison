import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {lightBlue900} from 'material-ui/styles/colors';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import * as actions from '../actions';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';

//globals to keep track of teams and players selected
let chosenTeam = null;
let chosenPosition = null;
let player2info = null;

//drop down items for material-ui dropdown
let teams = [];
const NFLteams = ['Bears','Bengals','Bills','Broncos','Browns','Buccaneers','Colts','Cardinals','Chargers','Chiefs',
    'Cowboys','Dolphins','Eagles','Falcons','Giants','Jaguars','Jets', 'Lions','Packers','Panthers','Patriots','Redskins',
    'Raiders','Rams','Ravens','Saints','Seahawks','Steelers','Texans','Titans','Vikings','49ers'];
for (let i = 0; i < 31; i++ ) {
    teams.push(<MenuItem value={NFLteams[i]} key={i} primaryText={`${NFLteams[i]}`} onTouchTap={showTeamClicked.bind(this)} />);
}

function showTeamClicked(event) {
    chosenTeam = event.target.innerText;
}

let positions = [];
const NFLPositions = ['Quarterback', 'Running back', 'Wide receiver', 'Tight end', 'Kicker'];
for (let i = 0; i < 5; i++ ) {
    positions.push(<MenuItem value={NFLPositions[i]} key={i} primaryText={`${NFLPositions[i]}`} onTouchTap={showPositionClicked.bind(this)} />);
}
function showPositionClicked(event) {
    chosenPosition = event.target.innerText;
}

//styles and display settings for material-ui paper, buttons, and dropdown menu
const showSelection = {
    backgroundColor: 'white',
    float: 'right',
    color: lightBlue900,
    height: 600,
    minWidth: 300,
    maxWidth: 525,
    margin: 'auto',
    textAlign: 'center',
    display: 'inline-block',
    fontFamily: 'Roboto, sans-serif',
    borderRadius: '15%',
};

const hideSelection = {
    backgroundColor: 'white',
    float: 'right',
    color: lightBlue900,
    height: 600,
    minWidth: 375,
    maxWidth: 525,
    margin: 'auto',
    textAlign: 'center',
    display: 'none',
    fontFamily: 'Roboto, sans-serif',
    borderRadius: '15%',
};

const text ={
    color: 'black',
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

const otherButtonMargin = {
    display: 'block',
    margin: 'auto',
    maxWidth: 210
};

const selectedMenuItemStyle = {
    color: lightBlue900,
};

//constructor for Component 1 to select first player
class SelectTeam2 extends Component {
    constructor(props) {
        super(props);
        this.state = {valueTeam: 'Bears',
            valuePosition: 'Quarterback',
            alert: false};
    }

    //functions to set value selected from drop down menus
    handleTeamChange = (event, index, valueTeam) => this.setState({valueTeam});
    handlePositionChange = (event, index, valuePosition) => this.setState({valuePosition});

    //function to change state so snackbar will close
    closeSnackBar = () => this.props.hideSnackBar();

    //function to change state so Alert Dialog will display, using without redux to show understanding of ReactJS.
    handleOpenAlert = () => this.setState({alert: true});
    handleClose = () => this.setState({alert: false});

    //functions to submit team to database and to find player selected by playerID
    submitTeam(){
        //action to change state so snackbar will open
        this.props.showSnackBar();
        if(!chosenTeam) chosenTeam = 'Bears';
        if(chosenPosition == null) chosenPosition = 'Quarterback';
        let values = {
            team: chosenTeam,
            position: chosenPosition
        };
        this.props.fetch_team_players2(values);

    }

    submitPlayer(){
        let playersOfTeam = this.props.selectedTeam2;
        playersOfTeam.find((eachPlayer) => {
            if(eachPlayer.PlayerID == player2info){
                this.props.getPlayerData2(eachPlayer);
            }
        });
    }

    //clears current player from state so we can select a new one
    changePlayer = () => this.props.clearPlayer2();

    setPlayerToState(event){
        event.persist();
        player2info = event.target.value;
    };

    //function to populate player list of selected team and position as well as button to move onto result.
    renderPlayers(){
        if(this.props.selectedTeam2){
            return this.props.selectedTeam2.map(player => {
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
        if(this.props.selectedTeam2){
            return (
                <RaisedButton label="Pick Player"
                              style={buttonMargin}
                              primary={true}
                              onTouchTap={this.submitPlayer.bind(this)}/>
            )
        }
    };

    //handles displaying players name at the top of each main div
    renderPlayerName(){
        if(this.props.player2){
            return (
                <h1 style={playerHeaderText}>{this.props.player2.Name}</h1>
            )
        } else {
            return (
                <h1>No Name</h1>
            )
        }
    }

    //img to display underneath player name. will be implemented soon.
    renderPlayerImg(){
        setTimeout(() => {
            if(this.props.player2){
                return (
                    <img src="http://images.nike.com/is/image/DotCom/PDP_P/FT0225_201_A/v-flight-airlock-size-9-football.png?fmt=png-alpha" alt={'Football'} />
                )
            } else {
                return <p>Img Here</p>
            }
        }, 5000);
    }

    //player stats that will be displayed under players image
    renderPlayerStats(){
        if(this.props.player2){
            if(this.props.player2.Experience < 1){
                this.props.clearPlayer2();
                this.handleOpenAlert();
            } else {
                switch(this.props.player2.Position){
                    case "QB":
                        return (
                            <div>
                                <div className="halfPaper1">
                                    <p className="otherStatsLabel">Completion Percentage</p>
                                    <p>{this.props.player2.PlayerSeason.PassingCompletionPercentage + '%'}</p>
                                    <p className="otherStatsLabel">Passing Yards</p>
                                    <p>{this.props.player2.PlayerSeason.PassingYards}</p>
                                    <p className="otherStatsLabel">Passing Touchdowns</p>
                                    <p>{parseInt(this.props.player2.PlayerSeason.PassingTouchdowns)}</p>
                                    <p className="otherStatsLabel">Interceptions</p>
                                    <p>{parseInt(this.props.player2.PlayerSeason.PassingInterceptions)}</p>
                                </div>
                                <div className="halfPaper1">
                                    <p className="otherStatsLabel">Rushing Yards</p>
                                    <p>{this.props.player2.PlayerSeason.RushingYards}</p>
                                    <p className="otherStatsLabel">Rushing Touchdowns</p>
                                    <p>{parseInt(this.props.player2.PlayerSeason.RushingTouchdowns)}</p>
                                    <p className="otherStatsLabel">Fantasy Points</p>
                                    <p>{this.props.player2.PlayerSeason.FantasyPointsPPR}</p>
                                    <p className="otherStatsLabel">Fumbles Lost</p>
                                    <p>{parseInt(this.props.player2.PlayerSeason.FumblesLost)}</p>
                                </div>
                                <RaisedButton label="Choose Another Player"
                                              style={otherButtonMargin}
                                              primary={true}
                                              onTouchTap={this.changePlayer.bind(this)}/>
                            </div>
                        );
                    case "RB":
                        return (
                            <div>
                                <div className="halfPaper1">
                                    <p className="otherStatsLabel">Rushing Attempts</p>
                                    <p>{parseInt(this.props.player2.PlayerSeason.RushingAttempts)}</p>
                                    <p className="otherStatsLabel">Rushing Yards</p>
                                    <p>{this.props.player2.PlayerSeason.RushingYards}</p>
                                    <p className="otherStatsLabel">Rushing Touchdowns</p>
                                    <p>{parseInt(this.props.player2.PlayerSeason.RushingTouchdowns)}</p>
                                    <p className="otherStatsLabel">Receptions</p>
                                    <p>{parseInt(this.props.player2.PlayerSeason.Receptions)}</p>
                                </div>
                                <div className="halfPaper1">
                                    <p className="otherStatsLabel">Receiving Yards</p>
                                    <p>{this.props.player2.PlayerSeason.ReceivingYards}</p>
                                    <p className="otherStatsLabel">Receiving Touchdowns</p>
                                    <p>{parseInt(this.props.player2.PlayerSeason.ReceivingTouchdowns)}</p>
                                    <p className="otherStatsLabel">Fantasy Points</p>
                                    <p>{this.props.player2.PlayerSeason.FantasyPointsPPR}</p>
                                    <p className="otherStatsLabel">Fumbles Lost</p>
                                    <p>{parseInt(this.props.player2.PlayerSeason.FumblesLost)}</p>
                                </div>
                                <RaisedButton label="Choose Another Player"
                                              style={otherButtonMargin}
                                              primary={true}
                                              onTouchTap={this.changePlayer.bind(this)}/>
                            </div>
                        );
                    case "WR":
                        return (
                            <div>
                                <div className="halfPaper1">
                                    <p className="otherStatsLabel">Targets</p>
                                    <p>{parseInt(this.props.player2.PlayerSeason.ReceivingTargets)}</p>
                                    <p className="otherStatsLabel">Receiving Yards</p>
                                    <p>{this.props.player2.PlayerSeason.ReceivingYards}</p>
                                    <p className="otherStatsLabel">Receiving Touchdowns</p>
                                    <p>{parseInt(this.props.player2.PlayerSeason.ReceivingTouchdowns)}</p>
                                    <p className="otherStatsLabel">Yards Per Reception</p>
                                    <p>{this.props.player2.PlayerSeason.ReceivingYardsPerReception}</p>
                                </div>
                                <div className="halfPaper1">
                                    <p className="otherStatsLabel">Receptions</p>
                                    <p>{parseInt(this.props.player2.PlayerSeason.Receptions)}</p>
                                    <p className="otherStatsLabel">Rushing Yards</p>
                                    <p>{this.props.player2.PlayerSeason.RushingYards}</p>
                                    <p className="otherStatsLabel">Fantasy Points</p>
                                    <p>{this.props.player2.PlayerSeason.FantasyPointsPPR}</p>
                                    <p className="otherStatsLabel">Fumbles Lost</p>
                                    <p>{parseInt(this.props.player2.PlayerSeason.FumblesLost)}</p>
                                </div>
                                <RaisedButton label="Choose Another Player"
                                              style={otherButtonMargin}
                                              primary={true}
                                              onTouchTap={this.changePlayer.bind(this)}/>
                            </div>
                        );
                    case "TE":
                        return (
                            <div>
                                <div className="halfPaper1">
                                    <p className="otherStatsLabel">Targets</p>
                                    <p>{parseInt(this.props.player2.PlayerSeason.ReceivingTargets)}</p>
                                    <p className="otherStatsLabel">Receiving Yards</p>
                                    <p>{this.props.player2.PlayerSeason.ReceivingYards}</p>
                                    <p className="otherStatsLabel">Receiving Touchdowns</p>
                                    <p>{parseInt(this.props.player2.PlayerSeason.ReceivingTouchdowns)}</p>
                                    <p className="otherStatsLabel">Yards Per Reception</p>
                                    <p>{this.props.player2.PlayerSeason.ReceivingYardsPerReception}</p>
                                </div>
                                <div className="halfPaper1">
                                    <p className="otherStatsLabel">Receptions</p>
                                    <p>{parseInt(this.props.player2.PlayerSeason.Receptions)}</p>
                                    <p className="otherStatsLabel">Offensive Snaps Played</p>
                                    <p>{parseInt(this.props.player2.PlayerSeason.OffensiveSnapsPlayed)}</p>
                                    <p className="otherStatsLabel">Fantasy Points</p>
                                    <p>{this.props.player2.PlayerSeason.FantasyPointsPPR}</p>
                                    <p className="otherStatsLabel">Fumbles Lost</p>
                                    <p>{parseInt(this.props.player2.PlayerSeason.FumblesLost)}</p>
                                </div>
                                <RaisedButton label="Choose Another Player"
                                              style={otherButtonMargin}
                                              primary={true}
                                              onTouchTap={this.changePlayer.bind(this)}/>
                            </div>
                        );
                    case "K":
                        return (
                            <div>
                                <p className="otherStatsLabel">Field Goal Percentage</p>
                                <p>{this.props.player2.PlayerSeason.FieldGoalPercentage + '%'}</p>
                                <p className="otherStatsLabel">40+ Yard Field Goals</p>
                                <p>{parseInt(this.props.player2.PlayerSeason.FieldGoalsMade40to49)}</p>
                                <p className="otherStatsLabel">50+ Yard Field Goals</p>
                                <p>{parseInt(this.props.player2.PlayerSeason.FieldGoalsMade50plus)}</p>
                                <p className="otherStatsLabel">Extra Points Made</p>
                                <p>{parseInt(this.props.player2.PlayerSeason.ExtraPointsMade)}</p>
                                <p className="otherStatsLabel">Fantasy Points</p>
                                <p>{parseInt(this.props.player2.PlayerSeason.FantasyPointsPPR)}</p>
                                <RaisedButton label="Choose Another Player"
                                              style={otherButtonMargin}
                                              primary={true}
                                              onTouchTap={this.changePlayer.bind(this)}/>
                            </div>
                        )
                }
            }
        }
    }

    //all that will be rendered onto component
    render(){
        //declared variable here to be able to use this.handleclose in its proper scope
        const actionsAlert = [
            <FlatButton
                label="Okay"
                primary={true}
                onTouchTap={this.handleClose}
            />,
        ];
        return (
            <div className='cardHolder'>
                <Paper style={this.props.player2 ? hideSelection : showSelection}
                       zDepth={5}
                       className='cardHolder'>
                    <h1 style={text}>Select</h1>
                    <h1 style={text}>Team and Position</h1>
                    <h1 style={text}>of Player 2</h1>
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
                        autoHideDuration={20000}
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
                <Paper style={this.props.player2 ? showSelection : hideSelection}
                       zDepth={5}
                       className='cardHolder'>
                    {this.renderPlayerName()}
                    <br/>
                    {this.renderPlayerImg()}
                    <br/>
                    {this.renderPlayerStats()}
                </Paper>
                <Dialog
                    actions={actionsAlert}
                    modal={false}
                    open={this.state.alert}
                    onRequestClose={this.handleClose}
                >
                    Pick a player that accumulated stats within the 2016 season.
                </Dialog>
            </div>
        )
    }
}

//connect current state of app to props for exported functions
function mapStateToProps(state){
    return {
        selectedTeam1: state.playerData.selectedTeam1,
        selectedTeam2: state.playerData.selectedTeam2,
        player1: state.playerData.player1,
        player2: state.playerData.player2,
        open: state.playerData.open,
    }
}

export default connect(mapStateToProps, actions)(SelectTeam2);