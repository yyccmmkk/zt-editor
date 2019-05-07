import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import RouteConfig from './RouteConfig';


const styles = (theme: any) => ({
    root: {
        width: 300,
        height: '100%',
        color: 'inherit',
        backgroundColor: 'purple',

    },
    primary: {
        color: theme.palette.primary.main,
    },
});

class Right extends React.Component {

    render() {
        const classes = (this.props as any).classes;
        return (
            <div className={classes.root}>
                <RouteConfig />

            </div>
        )
    }
}

export default withStyles(styles as any)(Right);
