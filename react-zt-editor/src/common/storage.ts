/**
 * Created by zhoulongfei on 2018/11/12.
 * E-mail:36995800@163.com
 * 公共模块、公共对象
 */


interface Common {
    [propName: string]: any;
    list:ComponentData[]
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

let destroyList = new Map();//手动销毁对象
let componentMap = new Map();//前台组件数据
let dataMap = new Map();//后台组件模板数据
const common:Common = {
    expando: 1,
    list:[],
    selectedList: [],
    indexCount: 1,
    des: '',
    keyWords: null,
    thirdPartCode1: '',
    thirdPartCode2: '',
    thirdPartCode3: '',
    thirdPartCode4: '',
    bgImg: [],
    bgImgName: '',
    title: '专题',
    path: '',
    id: '',
    mainWidth: 100,
    canvasHeight: 1000,
    cache: [],
    lzcache: {key: 'lz', value: {}},//页面留资数据
    communityCache: {key: 'community', value: {}},//社区缓存
    linkTopic: null,//pc相关联专题
    type: null,//component type,
    currentIndex: 0,
    isEmpty: false
};

export {
    common,
    destroyList,
    componentMap,
    dataMap,
}
