import {connect} from "react-redux";
import List from '../../components/left/ComponentList';
import Actions from '../actions';


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

const Left = connect(mapStateToProps,mapDispatchToProps)(List);
export default Left
