import React from 'react';
import {type as bannerType} from '../../components/main-canvas/Banner';
import Banner from './Banner';
import {connect} from "react-redux";
import {Actions} from "../../redux/actions";
import {withRouter} from "react-router";


const mapStateToProps = (state: any) => {
    return {
        list: state.list.slice()
    }
};
const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {
        setIndex: (index: number, path?: string) => {
            dispatch(Actions.setPreIndex(index));
            dispatch(Actions.setIndex(index));
            dispatch(Actions.setPath(path || '/'));
        },
        del: (index: number) => {
            dispatch(Actions.removeAction(index));

        }

    }
};


class List extends React.Component {
    constructor(props: any) {
        super(props)
    }

    render() {
        const {list, setIndex, history, updateItem, del} = this.props as any;

        return (

            <div>
                {
                    list.map((v: any, i: number) => {

                        switch (v.type) {
                            case bannerType:
                                return <Banner history={history} {...v} del={del} updateItem={() => {
                                    updateItem(i)
                                }} setIndex={setIndex} index={i} path={`/${bannerType}/${i}`} key={i}/>;
                            default:
                                return ''
                        }

                    })
                }
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List));
