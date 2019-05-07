import {connect} from "react-redux";
import List from '../../components/main-canvas/List';
import Actions from '../actions';

const mapStateToProps=(state:any)=>{
    return {
        list:state.list
    }
};
const mapDispatchToProps=(dispatch:any,ownProps:any)=>{
    return {
        onClick:(e:Event)=>{
            e.preventDefault()
        }
    }
};

const container=connect(mapStateToProps,mapDispatchToProps)(List);
export default container;
