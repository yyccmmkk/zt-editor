import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import RouteConfig from './RouteConfig';
import Nav from './nav';
import Config from './config';
import {Route} from "react-router-dom";


const styles = (theme: any) => ({
    root: {
        width: 300,
        height: '100%',
        color: 'inherit',
        backgroundColor: '#fff',

    },
    nav:{
        width:'100%',
        height:35
    },
    primary: {
        color: theme.palette.primary.main,
    },
});

class Right extends React.Component {
    constructor(props:any){
        super(props);

    }


    render() {
        const classes = (this.props as any).classes;


        return (
            <div className={classes.root}>

                <Nav />
                <RouteConfig />

            </div>
        )
    }
}

export default withStyles(styles as any)(Right);
