import React, { Component } from 'react';
import { Link } from 'react-router';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {lightBlue900} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';


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

class Header extends Component {

    render(){
        return (
            <div>
                <div key='signin3' className='headerToolbarWide'>
                    <Toolbar style={toolbarStyle.toolbar} >
                        <ToolbarGroup firstChild={true}>
                           <ToolbarTitle style={toolbarStyle.titleWide} text="Compare NFL Players" />
                        </ToolbarGroup>
                        <ToolbarGroup>
                            <ToolbarSeparator/>
                            <FlatButton label="How to Use" secondary={true} style={toolbarStyle.signinButton}/>
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
                                <MenuItem primaryText="How To Use"/>
                            </IconMenu>
                        </ToolbarGroup>
                    </Toolbar>
                </div>
            </div>
        )
    }
}

export default Header;