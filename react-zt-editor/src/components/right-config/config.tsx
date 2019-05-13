import React from 'react';
import {withStyles} from '@material-ui/core/styles';

const styles = (theme: any) => ({
    root: {
        width: '100%',
        height:'200',
        color: 'inherit',
        textDecoration: 'inherit',

    },
    primary: {
        color: theme.palette.primary.main,
    },
});

class config extends React.Component {

    render() {
        const classes = (this.props as any).classes;
        return (
            <div className={classes.root}>
                config
            </div>
        )
    }
}

export default withStyles(styles as any)(config);
