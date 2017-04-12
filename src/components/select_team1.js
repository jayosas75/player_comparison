import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './style.css';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {teal600} from 'material-ui/styles/colors';
import {browserHistory} from 'react-router';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import * as actions from '../actions';
import RaisedButton from 'material-ui/RaisedButton';

let chosenTeam = null;

function showTeamClicked(event) {
    console.log('this is team that was clicked: ', event.target.innerText);
    chosenTeam = event.target.innerText;
}

const teams = [];

const NFLteams = ['Bears','Bengals','Bills','Broncos','Browns','Buccaneers','Colts','Cardinals','Chargers','Chiefs',
    'Cowboys','Dolphins','Eagles','Falcons','Giants','Jaguars','Lions','Packers','Panthers','Patriots','Redskins',
    'Raiders','Rams','Ravens','Saints','Seahawks','Steelers','Texans','Titans','Vikings','49ers'];

for (let i = 0; i < 31; i++ ) {
    teams.push(<MenuItem value={NFLteams[i]} key={i} primaryText={`${NFLteams[i]}`} onTouchTap={showTeamClicked.bind(this)} />);
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
    fontSize: '4.0em',
};
const text2 ={
    color: 'black',
    fontSize: '4.0em',
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
        this.state = {valueTeam: 'Bears'};
    }

    handleClickPlayer2(){
        browserHistory.push('/select_team2')
    }

    handleChange1 = (event, index, valueTeam) => this.setState({valueTeam});

    checkProps(){
        console.log(this.props);
    }

    submitTeam(){
        let team = chosenTeam;
        this.props.fetch_team_players1(team);
    }

    render(){
        return (
            <div className={styles.cardHolder}>
                <Paper style={player1} zDepth={5}>
                    <h1 style={text}>Select</h1>
                    <h1 style={text}>Team and Position</h1>
                    <h1 style={text}>of Player 1</h1>
                    <br/>
                    <br/>
                    <DropDownMenu style={dropDownStyle.customWidth}
                                  maxHeight={300}
                                  value={this.state.valueTeam}
                                  onChange={this.handleChange1}
                                  autoWidth={false}
                                  labelStyle={{ color: teal600 }}
                    >
                        {teams}
                    </DropDownMenu>
                    <br/>
                    <RaisedButton label="Go" style={buttonMargin} onTouchTap={this.submitTeam.bind(this)}/>
                </Paper>
                <Paper onTouchTap={this.checkProps.bind(this)} style={player2} zDepth={5}>
                    <h1 style={text2}>Select</h1>
                    <h1 style={text2}>Team of Player 2</h1>
                    <br/>
                    <FloatingActionButton style={style} onTouchTap={this.handleClickPlayer2.bind(this)}>
                        <ContentAdd />
                    </FloatingActionButton>
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
