import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import List from '../../redux/container/Left';

const styles = (theme: any) => ({
    root: {
        width: 140,
        minWidth:140,
        height:'100%',
        color: 'inherit',
        textDecoration:'none',
        backgroundColor: 'red',

    },
    primary: {
        color: theme.palette.primary.main,
    },
});

class Left extends React.Component {

    render() {
        const classes = (this.props as any).classes;
        return (
            <div className={classes.root}>
                <List/>
            </div>
        )
    }
}

export default withStyles(styles as any)(Left);
