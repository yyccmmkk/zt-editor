import {dataMap,componentMap} from "./storage";

interface ComponentData{
    type:string
    x:number,
    y:number,
    [key:string]:any
}

interface register {
    [index: string]: any;

    type: string;
    data: ComponentData;
    metaData: {
        html: string;
        cssDepends: string[];
        jsDepends: string[];
        css: string;
        code: string;

    };
}


export class Utils{

    static register(opt: register) {
        console.log('register:', opt.type);
        componentMap.set(opt.type, opt.metaData);
        dataMap.set(opt.type,  opt.data);

    }
}

export default Utils;


