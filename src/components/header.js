import React, { Component } from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {lightBlue900} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import Dialog from 'material-ui/Dialog';

const toolbarStyle = {
    toolbar: {
        backgroundColor: lightBlue900,
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

const customContentStyle = {
    width: '50%',
    maxWidth: 'none',
};

class Header extends Component {

    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render(){
        const actions = [
            <FlatButton
                label="Okay"
                primary={true}
                onTouchTap={this.handleClose}
            />
        ];
        return (
            <div>
                <div key='signin3' className='headerToolbarWide'>
                    <Toolbar style={toolbarStyle.toolbar} >
                        <ToolbarGroup firstChild={true}>
                           <ToolbarTitle style={toolbarStyle.titleWide} text="Compare NFL Players" />
                        </ToolbarGroup>
                        <ToolbarGroup>
                            <ToolbarSeparator/>
                            <FlatButton label="How to Use" secondary={true}
                                        style={toolbarStyle.signinButton}
                                        onTouchTap={this.handleOpen} />
                            <Dialog
                                title="How To Use"
                                actions={actions}
                                modal={true}
                                open={this.state.open}
                                autoScrollBodyContent={true}
                                contentStyle={customContentStyle}
                                className="howToDialog"
                            >
                                <p>1. Pick a team and position of desired player. Click "Find Player"</p>
                                <p>2. Choose Player and hit "Pick Player" button and their <i>2016</i> on-field stats will display.</p>
                                <p>3. If you want to select a new player hit the "Choose Another Player" button.</p>
                                <p><strong>**Fantasy Football Scores are based on these details**</strong></p>
                                <ol>
                                    <li>Passing Yards: 1 point per 25 yards</li>
                                    <li>Passing Touchdowns: 4 points</li>
                                    <li>Passing Interceptions: -2 points</li>
                                    <li>Rushing Yards: 1 point per 10 yards</li>
                                    <li>Rushing Touchdowns: 6 points</li>
                                    <li>Receptions: 1 points (only if using PPR scoring)</li>
                                    <li>Receiving Yards: 1 point per 10 yards</li>
                                    <li>Receiving Touchdowns: 6 points</li>
                                    <li>2-Point Conversions: 2 points</li>
                                    <li>Fumbles Lost: -2 points</li>
                                </ol>
                                <p><i><strong>All data from this app has been pulled from the fantasydata.com API</strong></i></p>
                            </Dialog>
                        </ToolbarGroup>
                    </Toolbar>
                </div>
                <div key='signin1' className='headerToolbarShort'>
                    <Toolbar style={toolbarStyle.toolbar}>
                        <ToolbarGroup firstChild={true}>
                               <ToolbarTitle style={toolbarStyle.titleShort} text="Compare Players"/>
                        </ToolbarGroup>
                        <ToolbarGroup>
                            <IconMenu
                                iconButtonElement={<IconButton><Menu /></IconButton>}
                                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                            >
                                <MenuItem primaryText="How To Use"
                                          onTouchTap={this.handleOpen}/>
                            </IconMenu>
                        </ToolbarGroup>
                    </Toolbar>
                </div>
            </div>
        )
    }
}

export default Header;