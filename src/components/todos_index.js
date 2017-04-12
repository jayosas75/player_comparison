import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './style.css';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {teal600} from 'material-ui/styles/colors';

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

class Home extends Component {
    handleClick(){

    }
    render(){
        return (
            <div className={styles.cardHolder}>
                <Paper style={player1} zDepth={5}>
                    <h1 style={text}>Select</h1>
                    <h1 style={text}>Team of Player 1</h1>
                    <br/>
                    <FloatingActionButton style={style}>
                        <ContentAdd />
                    </FloatingActionButton>

                </Paper>
                <Paper style={player2} zDepth={5}>
                    <h1 style={text2}>Select</h1>
                    <h1 style={text2}>Team of Player 2</h1>
                    <br/>
                    <FloatingActionButton style={style} onTouchTap={this.handleClick.bind(this)}>
                        <ContentAdd />
                    </FloatingActionButton>
                </Paper>
            </div>
        )
    }
}

export default Home;
