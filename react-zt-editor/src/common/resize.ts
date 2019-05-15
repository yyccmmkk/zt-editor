/**
 * Created by zhoulongfei on 2018/9/28.
 * E-mail:36995800@163.com
 * 组件缩放功能模块
 */
import {fromEvent, Unsubscribable} from 'rxjs';
import {map, filter, auditTime} from 'rxjs/operators';
import * as _ from 'lodash';


let win: Window = window;
let doc: Document = document;

interface setting {
    [propName: string]: any;

    move(ele: any, w: number, h: number, size: number, ratioW: number, ratioH: number): any

}

interface resize {
    [index: string]: any;
}

// 默认配置项
const defaultSetting: setting = {
    cache: {},
    item: '[data-type]',
    isFontResize: true,
    skipFontSize: 'skipfontsize',//跳转字体大小自适应
    maxWidth: 1000,
    minWidth: 0,
    maxHeight: 100000,
    minHeight: 0,
    skip: 'skip',//dataset值 跳过元素
    range: '[data-query="range"]',
    move: (ele: Element, w: number, h: number) => {
        //console.log('ele:W:H',ele,w,h)
    },
    end: (ele: Element, ratioW: number, ratioH: number) => {
        //
    }
};
export default class Resize implements resize {
    private defaults: setting = defaultSetting;
    private options: setting;

    [index: string]: any;

    constructor(opt: setting) {
        this.options = _.defaultsDeep(opt, this.defaults, {})
    }

    /**
     * 初始化
     */
    init() {
        this.initStyle();
        this.bindEvent();
        return this;
    }

    /**
     * 事件监听
     */
    bindEvent() {
        let options = this.options;
        let cache = options.cache;
        let rangeEle: Element = doc.querySelector(options.range) || doc.documentElement;
        let range: ClientRect = rangeEle.getBoundingClientRect();
        //console.log(range);
        cache.range = range;
        fromEvent(window, 'resize').subscribe(() => {
            range = rangeEle.getBoundingClientRect();
        });
        fromEvent(window, 'scroll').subscribe(() => {
            range = rangeEle.getBoundingClientRect();
        });

        //拖放事件处里
        let subscriptionMove: Unsubscribable | null;

        fromEvent([cache.ltNode, cache.rbNode, cache.lbNode, cache.rtNode, cache.lcNode, cache.rcNode, cache.ctNode, cache.cbNode], 'mousedown').subscribe((event: any) => {

            let x = event.clientX;
            let y = event.clientY;
            let resizeType: string = event.target.dataset.query;
            this.refresh(cache.currentItem);
            range = rangeEle.getBoundingClientRect();
            subscriptionMove = fromEvent(doc, 'mousemove').pipe(
                auditTime(20),
                map((evt: any) => {
                    let l = evt.clientX;
                    let t = evt.clientY;
                    l = l < range.left ? range.left : l;
                    t = t < range.top ? range.top : t;
                    t = t > range.bottom ? range.bottom : t;

                    l = l > range.right ? range.right : l;

                    return {x: l - x, y: t - y, shiftKey: evt.shiftKey}
                })
            ).subscribe((distance: any) => {
                //console.log(distance.x, distance.y);

                cache.shiftKey = distance.shiftKey;
                ///distance.y=cache.currentItemTop-distance.y+cache.currentItemHeight >range.height?-(range.height-cache.currentItemHeight -cache.currentItemTop):distance.y;
                this[resizeType](distance.x, distance.y, distance.shiftKey);
            });
            event.preventDefault();
            event.stopPropagation();
        });
        fromEvent(doc, 'mouseup').subscribe((evt: Event) => {
            if (subscriptionMove) {
                subscriptionMove.unsubscribe();
                subscriptionMove = null;
                this.refresh(cache.currentItem);
                cache.currentItem.dataset.ratio = cache.datasetSize;
                options.end.apply(this, [cache.currentItem, cache.width, cache.height, cache.size, cache.ratioW, cache.ratioH, cache.left, cache.top])
            }
        });

        fromEvent(doc, 'click').pipe(
            // throttleTime(300),
            filter((evt: any) => {

                let ele = evt.target;
                while (ele !== null) {
                    if (ele.dataset && ele.dataset.type) {
                        return true
                    }
                    ele = ele.parentNode;
                }

                return false
            }),
            map((event: Event) => {
                let ele = event.target;
                while (ele !== null) {
                    if ((ele as HTMLElement).dataset.type) {
                        return ele
                    }
                    ele = (ele as Node).parentNode;
                }
                return
            })
        ).subscribe((ele: any) => {
            if (ele && !ele.dataset[options.skip]) {
                cache.ele.parentNode && cache.ele.parentNode.removeAttribute('data-resize');
                ele.appendChild(cache.ele);
                ele.setAttribute('data-resize', 'true');
                cache.currentItem = ele;
                this.refresh(ele)
            }

        });

    }

    /**
     * 刷新操作
     * @param ele 当前控件
     */
    refresh(ele: any) {
        let cache = this.options.cache;
        let rect = ele.getBoundingClientRect();
        cache.topOffset = ele.offsetHeight - ele.clientHeight;
        cache.currentItemWidth = rect.width;
        cache.currentItemHeight = rect.height;
        cache.currentItemLeft = parseInt(ele.style.left) || 0;
        cache.currentItemTop = parseInt(ele.style.top) || 0;
        cache.currentItemBottom = rect.bottom;
        cache.left = cache.currentItemLeft;
        cache.top = cache.currentItemTop;
        //console.log(rect, ele.style.left, ele.style.top);
    }

    /**
     * UI初始化
     */
    initStyle() {
        let options = this.options;
        let cache = options.cache;

        let styleStr = `        
            [data-query="resize"]{
                position:absolute;
                border:1px dashed #000;
                left:-1px;
                top:-1px;
                right:-1px;
                bottom:-1px;
                z-index:999
            }
            [data-query="resize"] > div{
                width:8px;
                height:8px;
                position:absolute;
                border:1px solid #000;
                background:#fff;
            }
            [data-query="resize"] > [data-query="lt"]{
                left:-5px;
                top:-5px;
                cursor:nwse-resize;
            }
            [data-query="resize"] > [data-query="lc"]{
                left:-5px;
                top:50%;
                margin-top:-5px;
                cursor:ew-resize;
            }
            [data-query="resize"] > [data-query="lb"]{
                left:-5px;
                bottom:-5px;
                cursor:nesw-resize;
            }
            [data-query="resize"] > [data-query="rt"]{
                right:-5px;
                top:-5px;
                cursor:nesw-resize;
            }
            [data-query="resize"] > [data-query="rc"]{
                right:-5px;
                top:50%;
                margin-top:-5px;
                cursor:ew-resize;
            }
            [data-query="resize"] > [data-query="rb"]{
                right:-5px;
                bottom:-5px;
                cursor:nwse-resize;
            }
            [data-query="resize"] > [data-query="ct"]{
                left:50%;
                margin-left:-5px;
                top:-5px;
                cursor:ns-resize;
            }
            [data-query="resize"] > [data-query="cb"]{
                left:50%;
                margin-left:-5px;
                bottom:-5px;
                cursor:ns-resize;
            }
        
        `;
        let styleNode: HTMLElement = doc.createElement('style');
        styleNode.innerText = styleStr;
        let textNode: Text = doc.createTextNode(styleStr);
        styleNode.appendChild(textNode);
        let bodyNode: HTMLBodyElement | null = doc.querySelector('body');
        let headNode: HTMLHeadElement | null = doc.querySelector('head');
        headNode && headNode.appendChild(styleNode);
        let eleNode = doc.createElement('div');
        eleNode.setAttribute('data-query', 'resize');
        //eleNode.innerHTML=eleStr;
        cache[`ltNode`] = this.createNode('lt', eleNode);
        cache[`lcNode`] = this.createNode('lc', eleNode);
        cache[`lbNode`] = this.createNode('lb', eleNode);
        cache[`rtNode`] = this.createNode('rt', eleNode);
        cache[`rcNode`] = this.createNode('rc', eleNode);
        cache[`rbNode`] = this.createNode('rb', eleNode);
        cache[`ctNode`] = this.createNode('ct', eleNode);
        cache[`cbNode`] = this.createNode('cb', eleNode);
        cache.ele = eleNode;
    }

    /**
     * 创建节点
     * @param selector
     * @param parentNode
     */
    createNode(selector: string, parentNode: Node): Node {
        let node = doc.createElement('div');
        node.setAttribute('data-query', selector);
        node.draggable = false;
        parentNode.appendChild(node);
        return node
    }

    /**
     * 左上控制位
     * @param x 偏移量
     * @param y 偏移量
     * @param shiftKey 有没有按shift 同比缩放
     */
    lt(x: number, y: number, shiftKey: boolean): void {
        let cache = this.options.cache;
        let ele = cache.currentItem;
        let t, l, w, h, ratio;
        if (shiftKey) {
            ratio = _.divide(cache.currentItemWidth, cache.currentItemHeight);
            y = _.divide(x, ratio)

        }
        t = cache.currentItemTop + y;
        l = cache.currentItemLeft + x;
        w = cache.currentItemWidth - x;
        h = cache.currentItemHeight - y;

        ele.style.left = l + 'px';
        ele.style.top = t + 'px';
        ele.style.width = w + 'px';
        ele.style.height = h + 'px';
        cache.left = l;
        cache.top = t;
        this.move(cache.currentItem, w, h, _.divide(w, cache.currentItemWidth), _.divide(h, cache.currentItemHeight));
    }

    /**
     * 左中控制位
     * @param x 偏移量
     * @param y 偏移量
     */
    lc(x: number, y: number): void {
        let cache = this.options.cache;
        let ele = cache.currentItem;
        let l, w;
        l = cache.currentItemLeft + x;
        w = cache.currentItemWidth - x;
        ele.style.left = l + 'px';
        ele.style.width = w + 'px';
        cache.left = l;
        this.move(cache.currentItem, w, cache.currentItemHeight, _.divide(w, cache.currentItemWidth), 1);
    }

    /**
     * 左下控制位
     * @param x 偏移量
     * @param y 偏移量
     * @param shiftKey 有没有按shift 同比缩放
     */
    lb(x: number, y: number, shiftKey: boolean): void {
        let cache = this.options.cache;
        let ele = cache.currentItem;
        let l, w, h, ratio;
        if (shiftKey) {
            ratio = _.divide(cache.currentItemWidth, cache.currentItemHeight);
            y = -_.divide(x, ratio)
        }
        l = cache.currentItemLeft + x;
        w = cache.currentItemWidth - x;
        h = cache.currentItemHeight + y;
        ele.style.left = l + 'px';
        ele.style.width = w + 'px';
        ele.style.height = h + 'px';
        cache.left = l;
        this.move(cache.currentItem, w, h, _.divide(w, cache.currentItemWidth), _.divide(h, cache.currentItemHeight));
    }

    /**
     * 右上
     * @param x 偏移量
     * @param y 偏移量
     * @param shiftKey 有没有按shift 同比缩放
     */
    rt(x: number, y: number, shiftKey: boolean): void {
        let cache = this.options.cache;
        let ele = cache.currentItem;
        let t, w, h, ratio;
        if (shiftKey) {
            ratio = _.divide(cache.currentItemWidth, cache.currentItemHeight);
            y = -_.divide(x, ratio)

        }
        t = cache.currentItemTop + y;
        w = cache.currentItemWidth + x;
        h = cache.currentItemHeight - y;
        ele.style.top = t + 'px';
        ele.style.width = w + 'px';
        ele.style.height = h + 'px';
        cache.top = t;
        this.move(cache.currentItem, w, h, _.divide(w, cache.currentItemWidth), _.divide(h, cache.currentItemHeight));
    }

    /**
     * 右中控制位
     * @param x 偏移量
     * @param y 偏移量
     * @param shiftKey 有没有按shift 同比缩放
     */
    rc(x: number, y: number): void {
        let cache = this.options.cache;
        let ele = cache.currentItem;
        let w = cache.currentItemWidth + x;
        ele.style.width = w + 'px';
        this.move(cache.currentItem, w, cache.currentItemHeight, _.divide(w, cache.currentItemWidth), 1);
    }

    /**
     * 右下控制位
     * @param x 偏移量
     * @param y 偏移量
     * @param shiftKey 有没有按shift 同比缩放
     */
    rb(x: number, y: number, shiftKey: boolean): void {
        let cache = this.options.cache;
        let ele = cache.currentItem;
        let w, h, ratio;
        if (shiftKey) {
            ratio = _.divide(cache.currentItemWidth, cache.currentItemHeight);
            y = _.divide(x, ratio)

        }
        w = cache.currentItemWidth + x;
        h = cache.currentItemHeight + y;
        ele.style.width = w + 'px';
        ele.style.height = h + 'px';
        this.move(cache.currentItem, w, h, _.divide(w, cache.currentItemWidth), _.divide(h, cache.currentItemHeight));
    }

    /**
     * 上中控制位
     * @param x 偏移量
     * @param y 偏移量
     * @param shiftKey 有没有按shift 同比缩放
     */
    ct(x: number, y: number): void {
        let cache = this.options.cache;
        let ele = cache.currentItem;
        let h = cache.currentItemHeight - y;
        ele.style.top = cache.currentItemTop + y + 'px';
        ele.style.height = h + 'px';
        cache.top = cache.currentItemTop + y;
        this.move(cache.currentItem, cache.currentItemWidth, h, 1, _.divide(h, cache.currentItemHeight));
    }

    /**
     * 底中控制位
     * @param x 偏移量
     * @param y 偏移量
     * @param shiftKey 有没有按shift 同比缩放
     */
    cb(x: number, y: number): void {
        let cache = this.options.cache;
        let ele = cache.currentItem;
        let h = cache.currentItemHeight + y;
        ele.style.height = h + 'px';
        this.move(cache.currentItem, cache.currentItemWidth, h, 1, _.divide(h, cache.currentItemHeight));
    }

    /**
     * 移动回调
     * @param ele 当前控件
     * @param w 宽
     * @param h 高
     * @param ratioW 宽缩放比
     * @param ratioH 高缩放比
     */
    move(ele: any, w: number, h: number, ratioW: number, ratioH: number): void {
        let size=0;
        let options = this.options;
        let cache = options.cache;
        //console.log("ratio:", ratioW, ratioH);
        if (options.isFontResize && ele.dataset && ele.dataset.ratio && !ele.dataset[options.skipFontSize]) {
            size = (ratioH !== 1 && ratioW !== 1) ? _.multiply(+ele.dataset.ratio, Math.min(ratioH, ratioW)) : parseFloat(ele.style.fontSize);
            cache.datasetSize = size || 14;
            size = size < 7.63636364 ? 7.63636364 : size;
            ele.style.fontSize = size + 'px';
            cache.size = size
        }
        cache.ratioW = ratioW;
        cache.ratioH = ratioH;
        cache.width = w;
        cache.height = h;
        this.options.move.apply(this, [ele, w, h, size, ratioW, ratioH])
    }

    /**
     * 对外暴露隐藏控制UI
     */
    hidePanel(): void {
        let cache = this.options.cache;
        cache.ele = cache.ele.parentNode && cache.ele.parentNode.removeChild(cache.ele) || cache.ele;
    }
}
export {Resize}

