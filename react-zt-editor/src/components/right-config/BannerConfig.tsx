import React from 'react';
import {withStyles} from '@material-ui/core/styles';

const styles = (theme: any) => ({
    root: {
        width: '100%',
        color: 'inherit',
        textDecoration: 'inherit',

    },
    primary: {
        color: theme.palette.primary.main,
    },
});

class BannerConfig extends React.Component {

    render() {
        debugger;
        const {classes,match} = this.props as any;
        const {id}=match.params;

        return (
            <div className={classes.root}>
                <h1>{id}</h1>
            </div>
        )
    }

}

export default withStyles(styles as any)(BannerConfig);
