import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Header from './header';
import Home from './home';
injectTapEventPlugin();

const App = (props) => (
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
            <Header />
            <Home />
        </div>
    </MuiThemeProvider>
);

export default App;