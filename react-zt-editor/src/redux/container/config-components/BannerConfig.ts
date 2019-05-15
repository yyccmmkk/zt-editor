import {connect} from "react-redux";
import Config from '../../../components/right-config/BannerConfig';
import {formValueSelector} from 'redux-form';  // ES6
import {withRouter} from 'react-router-dom'


import Actions from '../../actions';


const mapStateToProps = (state: any) => {

    console.log('BannerConfig.ts');
    const {index: {index}, path: {path}} = state.ui;

    let list = state.list.slice();
    let temp = list[index];
    if(temp===undefined){
        return {isEmpty:true};
    }
    list[index] = Object.assign({}, temp);
    //store.dispatch(Actions.updateComponentAction({index,data:temp}));//更新数据
    return {
        ...list[index],
        index,
        path,
        initialValues: {
            link: list[index].link,
        }

    }

};
const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {
        getData: () => {
            console.log('getData');
        },
        update: () => {
            debugger;
            dispatch(Actions.updateComponentAction({index: ownProps.index, data: ownProps}))
        }
    }
};

const container = withRouter(connect(mapStateToProps, mapDispatchToProps)(Config as any));
export default container;
export {container as BannerConfig}
