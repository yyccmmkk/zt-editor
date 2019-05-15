import React from 'react';
import logo from './logo.svg';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {withTheme} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import {BrowserRouter as Router} from "react-router-dom";
import './App.css';
import 'typeface-roboto';
import Layout from './layout'
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'




const theme = createMuiTheme({
    typography: {
        useNextVariants: true,

    },
    palette: {
        primary: blue,
        secondary: red,

    },
    status: {
        danger: 'orange',
    },
} as { [keys: string]: any });

const App: React.FC = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <div className="App">
                <Router>
                    <Layout/>
                </Router>
            </div>
        </MuiThemeProvider>
    );
};

export default withTheme()(App);
