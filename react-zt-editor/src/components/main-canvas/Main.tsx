import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import List from '../../redux/container/ComponentList';

const styles = (theme: any) => ({
    root: {
        minWidth: 1000,
        height: '100%',
        color: 'inherit',
        backgroundColor: 'yellow',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'none',
        },
    },
    primary: {
        color: theme.palette.primary.main,
    },
});

class Main extends React.Component {

    render() {
        const classes = (this.props as any).classes;

        const {list,location}=this.props as any;
        return (
            <div className={classes.root}>
                 <List location={location} />
            </div>
        )
    }
}

export default withStyles(styles as any)(Main);
