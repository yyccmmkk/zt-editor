import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Banner,type as bannerType} from '../../redux/container/Banner';

class List extends React.Component  {
    constructor(props: any) {
        super(props)
    }

    render() {

        const {list}=this.props as any;
        return (

            <div>
                {
                    list.map((v:any,i:number)=>{
                        debugger;
                        switch(v.type){
                            case bannerType:return <Link key={i} to={{pathname:`/${bannerType}/${i}`}}> <Banner key={i}/> </Link>;
                            default:return ''
                        }

                    })
                }
            </div>
        )
    }
}

export default List;
