import {connect} from "react-redux";
import {Banner, type} from "../../components/main-canvas/Banner";
import {withRouter} from "react-router";


const mapStateToProps = (state: any) => {

    const {index:{index}} = state.ui;
    debugger;
    console.log('Banner.ts',state.list[index]);
    return Object.assign({}, state.list[index],);
};
const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {
       /* update: () => {
            debugger;
            dispatch(Actions.updateComponentAction({index: ownProps.index, data: {link: ownProps.link}}))

        }*/
    }
};

const container = withRouter(connect(mapStateToProps, mapDispatchToProps)(Banner));
export default container;
export {container as Banner, type}
