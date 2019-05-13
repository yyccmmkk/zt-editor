import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {type as bannerType} from '../../redux/container/Banner';
import Banner from './Banner';

class List extends React.Component  {
    constructor(props: any) {
        super(props)
    }
    render() {
        const {list,setIndex,history,updateItem,del}=this.props as any;

        return (

            <div>
                {
                    list.map((v:any,i:number)=>{

                        switch(v.type){
                            case bannerType:return <Banner history={history} {...v} del={del} updateItem={()=>{updateItem(i)} } setIndex={setIndex} index={i} path={`/${bannerType}/${i}`}  key={i}/>;
                            default:return ''
                        }

                    })
                }
            </div>
        )
    }
}

export default List;
