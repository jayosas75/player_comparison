import React, { Component } from 'react';
import { Link } from 'react-router';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {teal600} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Menu from 'material-ui/svg-icons/navigation/menu';
import * as actions from '../actions';
import styles from './style.css';

const toolbarStyle = {
    toolbar: {
        backgroundColor: teal600,
        boxShadow: '0px 1px 9px 0px rgba(0,0,0,0.75)',
        height: '60px'
    },
    homeButton: {
        color: 'black'
    },
    signinButton: {
        color: 'white'
    },
    titleWide : {
        marginLeft: 10,
        fontFamily: 'Fantasy',
        fontSize: '2.5em',
        color: 'white'
    },
    titleShort : {
        marginLeft: 10,
        fontFamily: 'Fantasy',
        fontSize: '2.5em',
        color: 'white'
    }
};

class Header extends Component {


   /* componentWillMount(){
        if(this.props.authenticated){
            return;
        } else if(this.props.active_client === undefined){
            this.props.handleProfileClick();
        }
    }*/

   //hi


    render(){
        return (
            <div>
                <div key='signin3' className={styles.headerToolbarWide}>
                    <Toolbar style={toolbarStyle.toolbar} >
                        <ToolbarGroup firstChild={true}>
                            <Link to="/" ><ToolbarTitle style={toolbarStyle.titleWide} text="NFL Player Comparison" /></Link>
                        </ToolbarGroup>
                        <ToolbarGroup>
                            <ToolbarSeparator/>
                            <FlatButton label="Find Player" default={true} style={toolbarStyle.signinButton}/>
                            <ToolbarSeparator/>
                            <FlatButton label="How to Use" secondary={true} style={toolbarStyle.signinButton}/>
                        </ToolbarGroup>
                    </Toolbar>
                </div>
                <div key='signin1' className={styles.headerToolbarShort}>
                    <Toolbar style={toolbarStyle.toolbar}>
                        <ToolbarGroup firstChild={true}>
                            <Link to="/"><ToolbarTitle style={toolbarStyle.titleShort} text="NFL Player Comparison"/></Link>
                        </ToolbarGroup>
                        <ToolbarGroup>
                            <IconMenu
                                iconButtonElement={<IconButton><Menu /></IconButton>}
                                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                            >
                                <MenuItem primaryText="Home"/>
                                <MenuItem primaryText="Find Player"/>
                                <MenuItem primaryText="How To Use"/>
                            </IconMenu>
                        </ToolbarGroup>
                    </Toolbar>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        /*authenticated: state.authReducer.authenticated,
        active_client: state.coupleData.active_client,
        active_planner: state.plannerData*/
    }
}


export default connect(mapStateToProps, actions)(Header);