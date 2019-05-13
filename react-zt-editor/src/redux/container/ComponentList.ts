import {connect} from "react-redux";
import List from '../../components/main-canvas/List';
import Actions from '../actions';
import { withRouter} from "react-router";
import { formValueSelector } from 'redux-form';  // ES6
import {store} from "../store";


const mapStateToProps=(state:any)=>{
    return {
        list:state.list.slice()
    }
};
const mapDispatchToProps=(dispatch:any,ownProps:any)=>{
    return {
        setIndex:(index:number,path?:string)=>{
            dispatch(Actions.setPreIndex(index));
            dispatch(Actions.setIndex(index));
            dispatch(Actions.setPath(path||'/'));
        },
        del:(index:number)=>{
            dispatch(Actions.removeAction(index));

        }




    }
};

const container=withRouter(connect(mapStateToProps,mapDispatchToProps)(List));
export default container;
