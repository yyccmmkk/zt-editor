import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Texture from '@material-ui/icons/Texture';

const styles = (theme: any) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

class ComponentList extends React.Component {
    constructor(props: any) {
        super(props);
        this.addComponent = this.addComponent.bind(this);
    }

    addComponent(type: string) {
        debugger;
        console.log('add');
    }

    render() {
        const classes = (this.props as any).classes;
        const { onClick} =this.props as any;
        return (
            <div className={classes.root}>
                <List component="nav">
                    <ListItem button onClick={()=>onClick('banner')}>
                        <ListItemIcon>
                            <InboxIcon/>
                        </ListItemIcon>
                        <ListItemText primary="图片"/>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <DraftsIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Drafts"/>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <Texture/>
                        </ListItemIcon>
                        <ListItemText primary="Texture"/>
                    </ListItem>
                </List>
            </div>
        )
    }
}

export default withStyles(styles as any)(ComponentList);
