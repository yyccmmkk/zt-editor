import {connect} from "react-redux";
import Config from '../../../components/right-config/BannerConfig';
import Actions from '../../actions';

const mapStateToProps = (state: any) => {
    debugger;
    return Object.assign({},state.list[state.index]);
};
const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {
        getData: () => {
            console.log('getData');
        }
    }
};

const container = connect(mapStateToProps, mapDispatchToProps)(Config);
export default container;
export {container as BannerConfig}
