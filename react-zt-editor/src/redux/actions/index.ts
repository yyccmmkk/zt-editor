export const ADD_COMPONENT = 'ADD_COMPONENT';//添加组件
export const UPDATE_COMPONENT = 'UPDATE_COMPONENT';//添加组件
export const REMOVE_COMPONENT = 'REMOVE_COMPONENT';//删除组件
export const REGISTER_COMPONENT = 'REGISTER_COMPONENT';//注册组件
export const INDEX_INCREMENT = 'INDEX_INCREMENT';//当前索引自增
export const INDEX_DECREMENT = 'INDEX_DECREMENT';//当前索引自减
export const INDEX_SET = 'INDEX_SET';//设置当前索引
export const INDEX_SETPRE = 'INDEX_SETPRE';//设置上一个索引
export const ROUTE_PATH = 'ROUTE_PATH';//设置当前路由


/**
 * 控制注册数据类型
 */
interface RegisterData {
    [index: string]: any;

    type: string;
    data: any;
    metaData: {
        html: string;
        cssDepends: string[];
        jsDepends: string[];
        css: string;
        code: string;

    };
}


export default class Actions {

    static setPath(path: string) {
        return {
            type: ROUTE_PATH,
            path
        }
    }

    /**
     * index 自增
     */
    static increment() {
        return {
            type: INDEX_INCREMENT
        }
    }

    /**
     * 生成设置当前组件索引的action
     * @param index
     */
    static setIndex(index: number) {
        return {
            type: INDEX_SET,
            index
        }
    }

    static setPreIndex(index: number) {
        return {
            type: INDEX_SETPRE,
            index
        }
    }

    /**
     * 生成添加组件的action
     * @param type
     */
    static addAction(type: string) {
        return {
            type: ADD_COMPONENT,
            componentType: type
        }
    }

    static updateComponentAction(data: { index: number, data: any }) {
        return {
            type: UPDATE_COMPONENT,
            data
        }
    }

    /**
     * 生成注册组件的action todo
     * @param type
     * @param data
     */
    static registerAction(type: string, data: RegisterData) {
        return {
            type: REGISTER_COMPONENT,
            data
        }
    }

    /**
     * 生成删除组件的action
     * @param index
     */
    static removeAction(index: number) {
        return {
            type: REMOVE_COMPONENT,
            index
        }
    }
}

export {Actions}
