export const ADD_COMPONENT='ADD_COMPONENT';//添加组件
export const REMOVE_COMPONENT='REMOVE_COMPONENT';//删除组件
export const REGISTER_COMPONENT='REGISTER_COMPONENT';//注册组件
export const INDEX_INCREMENT='INDEX_INCREMENT';//当前索引自增
export const INDEX_DECREMENT='INDEX_DECREMENT';//当前索引自减
export const INDEX_SET='INDEX_SET';//设置当前索引


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



export default class Action{

    /**
     * 生成设置当前组件索引的action
     * @param index
     */
    static setIndex(index:number){
        return {
            type:INDEX_SET,
            index
        }
    }

    /**
     * 生成添加组件的action
     * @param type
     */
    static addAction(type:string){
        return {
            type:ADD_COMPONENT,
            componentType:type
        }
    }

    /**
     * 生成注册组件的action todo
     * @param type
     * @param data
     */
    static registerAction(type:string,data:RegisterData){
        return {
            type:REGISTER_COMPONENT,
            data
        }
    }

    /**
     * 生成删除组件的action
     * @param index
     */
    static removeAction(index:number){
        return {
            type:REMOVE_COMPONENT,
            index
        }
    }
}
