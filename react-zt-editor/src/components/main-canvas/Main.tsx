import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import List from './List';
import {ReferenceLine} from "../../common/reference-line";
import {Resize} from "../../common/resize";
import {Actions} from "../../redux/actions";
import store from "../../redux/store";



const styles = (theme: any) => ({
    root: {
        minWidth: 1000,
        position:'relative',
        height: '100%',
        color: 'inherit',
        backgroundColor: 'yellow',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'none',
        },
    },
    primary: {
        color: theme.palette.primary.main,
    },
});

class Main extends React.Component {

    componentDidMount(): void {
        const resize = new Resize({
            range: '[data-query="canvasBox"]',
            skip: 'select',
            move(ele:any, w:any, h:any, fontSize:any, ratioW:any, ratioH:any) {

            },
            end(ele:any, width:number, height:number, fontSize:any, ratioW:number, ratioH:number, x:number, y:number) {
                // console.log('ele:W:H',ele,w,h);
                let data:any ={};
                let temps=store.getState();
                const index=ele.dataset.index;
                const {list}=temps;
                if (ele.dataset && ele.dataset.type === 'tab') {
                    data=Object.assign({},list[index]);
                    const heightArray = [];
                    const widthArray = [];
                    for (let v of data.list) {
                        v.height = v.height * ratioH;
                        v.width = v.width * ratioW;
                        heightArray.push(v.height);
                        widthArray.push(v.width);
                    }
                    data.tabMaxHeight = Math.max(...heightArray);
                    data.tabMaxWidth = Math.max(...widthArray);
                }
                const temp = {width, height, fontSize, ratioW, ratioH, x, y};
                if (typeof temp.fontSize !== 'number') {
                    delete temp.fontSize;
                }
                store.dispatch(Actions.updateComponentAction({
                    index,
                    data:Object.assign(data, temp)
                }));

            }
        }).init();
        new ReferenceLine({
            container:'[data-query="canvasBox"]',
            item: '[data-type]',
            range: '[data-query="canvasBox"]',
            drag: true,
            zIndex: 1, // 参考线层级
            lineColor: 'red',
            lineWidth: 1,
            offset: 40, // 参考线头尾的延伸距离

            move(event:any, ele:HTMLElement, l:number, t:number) {
                //const data = _this.utils.getCurrentComponentData();
                //Object.assign(data, {x: l, y: t});
            },
            end(ele:any,x:number,y:number){
                store.dispatch(Actions.updateComponentAction({
                    // @ts-ignore
                    index:+(ele!.dataset!.index),
                    data:{
                        x,
                        y
                    }
                }))
            },
            createCanvas(ele:HTMLCanvasElement) {
                const range:HTMLElement|null = document.querySelector('[data-query="canvasBox"]');
                ele.width = range!.clientWidth;
                ele.height = range!.clientHeight;
                range!.appendChild(ele);
            }
        }).init();

    }

    render() {
        const classes = (this.props as any).classes;

        const {list,location}=this.props as any;
        return (
            <div className={classes.root} data-query="canvasBox">
                 <List location={location} />
            </div>
        )
    }
}

export default withStyles(styles as any)(Main);
