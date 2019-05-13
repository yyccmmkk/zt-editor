
export interface UI_Store {

    [key:string]:any

}
/**
 * 画布中组件数据结构
 */
export interface ComponentData{
    type:string
    x:number,
    y:number,
    [key:string]:any
}

export interface Action {
    type: string,
    [key: string]: any
}
