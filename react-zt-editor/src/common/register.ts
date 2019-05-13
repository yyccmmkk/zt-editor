import { Utils} from "./utils";
/**
 * 注册编辑器组件前后台数据
 */
Utils.register({
    type: 'banner',
    data: {
        type: 'banner',
        src: '',
        link: '',
        width: 500,
        height: 300,
        x: 0,
        y: 0,
        fileName: 'banner.jpg',
    },
    metaData: {
        html: '<div class="banner" style="position:absolute;z-index:{{zIndex}};left:{{x}}px; top:{{y}}px;width:{{width}}px;height:{{height}}px"><a {{if url}}href="{{url}}" target="_self"{{/if}}><img src="{{imgSrc}}"  style="width:100%;height:100%;" /></a></div>',
        cssDepends: [],
        jsDepends: [],
        css: '',
        code: ''
    }
});
