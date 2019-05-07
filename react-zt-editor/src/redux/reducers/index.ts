import {combineReducers} from "redux";
import {common,dataMap} from "../../common/storage";
import {ADD_COMPONENT,INDEX_SET, REMOVE_COMPONENT, REGISTER_COMPONENT} from '../actions/index';


interface Action {
    type: string,
    [key: string]: any
}

/**
 * 画布中组件数据结构
 */
interface ComponentData{
    type:string
    x:number,
    y:number,
    [key:string]:any
}

class Reducers {
    static increment(index:number):number{
        return index+1;
    }
    static decrement(index:number):number{
        return index-1;
    }

    static setIndex(index:number):number{
        return index;
    }

    static add<T>(list:T[],type:string):T[]{
        let temp=list.slice();
        debugger;
        temp.push(dataMap.get(type));
        return temp;
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

            default:
                return list
        }
    }

    static index(state:number=0,action:Action):number{
        switch(action.type){
            case INDEX_SET:return  Reducers.setIndex(action.index);
            default:
                return state
        }

    }
}

const main = combineReducers({
    list: Reducers.list,
    index:Reducers.index,
});

export default main
