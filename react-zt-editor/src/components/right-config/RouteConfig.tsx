import React from 'react';
import routes from '../../common/router-config';
import {Route} from "react-router-dom";


class RouteConfig extends React.Component {
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <div>
                {
                    routes.map((v:any,i:number)=>{
                        return  <Route key={i} path={v.path} component={v.component}/>
                    })
                }
            </div>

        )
    }
}

export default RouteConfig;
