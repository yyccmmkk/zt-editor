import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from "react-redux";
import {Actions} from "../../redux/actions";

import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';

import DraftsIcon from '@material-ui/icons/Drafts';
import Texture from '@material-ui/icons/Texture';

const mapStateToProps=(state:any)=>{
    return {
        list:state.list
    }
};
const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {
        onClick:(type:string)=>{
            dispatch(Actions.increment());
            dispatch(Actions.addAction(type))
        }
    }

};


const styles = (theme: any) => ({
    root: {
        width: 140,
        minWidth:140,
        height:'100%',
        color: 'inherit',
        textDecoration:'none',
        backgroundColor: '#fff',
    },
    primary: {
        color: theme.palette.primary.main,
    },
});

class Left extends React.Component {
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

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles as any)(Left));
