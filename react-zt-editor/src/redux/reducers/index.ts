import {combineReducers} from "redux";
import {common,dataMap} from "../../common/storage";
import {ComponentData,Action,UI_Store} from "../../common/interface";


import {
    ADD_COMPONENT,
    INDEX_SET,
    INDEX_SETPRE,
    ROUTE_PATH,
    REMOVE_COMPONENT,
    REGISTER_COMPONENT,
    INDEX_INCREMENT,
    UPDATE_COMPONENT
} from '../actions';

import { reducer as formReducer } from 'redux-form'






class Reducers {
    static setPreIndex(ui:any){
        return Object.assign({},ui,{preIndex:ui.index})

    }

    static increment(ui:any):number{
        return Object.assign({},ui,{index:ui.index+1});
    }
    static decrement(index:number):number{
        return index-1;
    }

    static setIndex(ui:any,index:number):number{
        return  Object.assign({},ui,{index:index});
    }

    static add<T>(list:T[],type:string):T[]{
        let temp=list.slice();
        debugger;
        temp.push(Object.assign({},dataMap.get(type)));
        return temp;
    }
    static remove(state:any,index:number){
        debugger;
        const list =state.slice();
        list.splice(index,1);
        return list;

    }
    static updateItem(state:any,{index,data}:any){
        debugger;
        const list =state.slice();
        Object.assign(list[index],data);
        return list
    }
    static  path(ui:any,path:string){
        return Object.assign({},ui,{path})
    }
    /**
     * 处理组件列表
     * @param list
     * @param action
     */
    static list(list: ComponentData[] = common.list, action: Action):ComponentData[] {
        switch (action.type) {
            case ADD_COMPONENT:
                return Reducers.add(list,action.componentType);
            case REMOVE_COMPONENT:
                return Reducers.remove(list,action.index);

            case UPDATE_COMPONENT:
                return Reducers.updateItem(list,action.data);

            default:
                return list
        }
    }



    static indexReducer(state:UI_Store={index:-1,preIndex:-1},action:Action):any{
        switch(action.type){
            case INDEX_SET:return  Reducers.setIndex(state,action.index);
            case INDEX_INCREMENT:
                return Reducers.increment(state);
            case INDEX_SETPRE:
                return Reducers.setPreIndex(state);

            default:
                return state
        }

    }

    static pathReducer(state:UI_Store={path:'/',prePath:undefined},action:Action):any{
        switch(action.type){
            case ROUTE_PATH:
                return Reducers.path(state,action.path);
            default:
                return state
        }

    }

    static configReducer(state:UI_Store={},action:Action):any{
        switch(action.type){

            case ROUTE_PATH:
                return Reducers.path(state,action.path);
            default:
                return state
        }

    }
}

const main = combineReducers({
    list: Reducers.list,
    ui:combineReducers({
        index:Reducers.indexReducer,
        path:Reducers.pathReducer,
        config:Reducers.configReducer
    }),
    form: formReducer
});

export default main
