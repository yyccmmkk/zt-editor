import React from 'react';
import './banner.css'


const type='banner';

class Banner extends React.Component {
    props:any;
    constructor(props:any){
        super(props);
        this.handleClick=this.handleClick.bind(this);
        this.del=this.del.bind(this);

    }
    del(e:any):void{
        e.stopPropagation();
        const {index,del,history} =this.props;
        history.push('/');
        del(index);

    }
    handleClick(e:any):void{
        console.log('click');
        const {setIndex,path,history,index}=this.props;
        setIndex(index,path);
        history.push(path);
        e.preventDefault();
    }

    render() {
        const { src,x,y,width,height,index}=this.props;

        return (
            <div data-type={'banner'} data-index={index} onClick={this.handleClick}  className={'banner'}
                 style={{
                    left:x,
                    top:y,
                    width,
                    height,
                }}
            >
                <img src={src} alt={src}/>
                <div className="del" onClick={this.del}>删除</div>
            </div>
        )
    }
}


export default Banner;
export {type,Banner}
