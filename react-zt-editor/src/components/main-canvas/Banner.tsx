import React from 'react';
import './banner.css'

const type='banner';

class Banner extends React.Component {
    constructor(props:any){
        super(props)
    }

    render() {
        const { src,x,y,width,height }=this.props as any;
        return (
            <div data-type={'banner'} className={'banner'}
                 style={{
                    left:x,
                    top:y,
                    width,
                    height
                }}
            ><h1>banner</h1>
                <img src={src} alt={''}/>
            </div>
        )
    }
}


export default Banner;
export {type,Banner}
