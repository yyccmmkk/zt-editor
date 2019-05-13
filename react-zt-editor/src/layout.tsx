import React from 'react';
import './Layout.css';
import { withStyles } from '@material-ui/core/styles';
import Top from './components/top/Top';
import Left from './components/left/Left';
import Main from './components/main-canvas/Main';
import Right from './components/right-config/Right'

const styles = (theme:any) => ({
    root: {
        width:'100%',
        color: 'inherit',
        textDecoration: 'inherit',
        '&:hover': {
            textDecoration: 'none',
        },
    },
    primary: {
        color: theme.palette.primary.main,
    },
});


class GuttersGrid extends React.Component {

    render() {
        const classes = (this.props as any).classes;
        debugger;
        return (
            <div className={classes.root}>
                <Top />
                <div className={'main'}>
                    <Left/>
                    <Main/>
                    <Right/>
                </div>
            </div>
        );
    }
}

export default withStyles(styles as any)(GuttersGrid);
