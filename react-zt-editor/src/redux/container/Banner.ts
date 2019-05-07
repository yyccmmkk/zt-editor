import {connect} from "react-redux";
import {Banner,type} from "../../components/main-canvas/Banner";


const mapStateToProps = (state: any) => {
    debugger;
    return Object.assign({},state.list[state.index])
};
const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {
        onClick: (e: Event) => {
            e.preventDefault()
        }
    }
};

const container = connect(mapStateToProps, mapDispatchToProps)(Banner);
export default container;
export {container as Banner,type}
