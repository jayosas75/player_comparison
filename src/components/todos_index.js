import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './style.css';
import Paper from 'material-ui/Paper';

const player1 = {
    backgroundColor: 'rgba(236,240,241 ,0.5)',
    height: 600,
    width: 525,
    margin: 'auto',
    textAlign: 'center',
    display: 'inline-block',
};
const player2 = {
    backgroundColor: 'rgba(236,240,241 ,0.5)',
    height: 600,
    width: 525,
    float: 'right',
    margin: 'auto',
    textAlign: 'center',
    display: 'inline-block',
};

class Home extends Component {
    /*componentWillMount(){
        this.props.fetchPlayers();
    }*/

    render(){
        return (
            <div className={styles.cardHolder}>
                <Paper style={player1} zDepth={5}>

                </Paper>
                <Paper style={player2} zDepth={5}>

                </Paper>
            </div>
        )
    }
}

export default Home;
