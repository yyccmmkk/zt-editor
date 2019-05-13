import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {BottomNavigation, BottomNavigationAction,Divider } from "@material-ui/core";
import Texture from '@material-ui/icons/Texture';
import Tune from '@material-ui/icons/Tune';
import { createBrowserHistory } from 'history';
import { store} from "../../redux/store";
import {withRouter} from "react-router";



const mapStateToProps=(state:any)=>{
    return {
        k:1
    }
};


const styles = (theme: any) => ({
    root: {
        width: '100%',
        height: '35',
        textDecoration: 'inherit',

    },

});

class nav extends React.Component {
    props:any;
    constructor(props:any){
        super(props);
        this.handleChange.bind(this);
        this.state={
            value:1
        }
    }
    handleChange = (event:any, value:number) => {
        debugger;

        const {history}=this.props;
        const {ui:{path:{path}}}=store.getState();
        if(value===1){
            history.push('/config');
        }else {
            history.push(path);
        }
        this.setState({ value });
    };
    render() {
        const classes = (this.props as any).classes;
        const {value} =this.state as any;
        return (
            <div>
                <BottomNavigation
                    value={value}
                    onChange={this.handleChange}
                    showLabels
                    className={classes.nav}
                >
                    <BottomNavigationAction label="组件设置" icon={<Texture />} />
                    <BottomNavigationAction label="专题设置" icon={<Tune />} />
                </BottomNavigation>
                <Divider />
            </div>


        )
    }
}
let Nav=withStyles(styles as any)(nav);


export default  withRouter(Nav as any);
