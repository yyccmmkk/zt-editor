import BannerConfig from '../redux/container/config-components/BannerConfig';
import Config from '../components/right-config/config' ;

const config=[
    {
        path:'/banner/:id',
        component:BannerConfig
    },
    {
        path:'/config',
        component:Config
    },
    {
        path:'/',
        component:Config
    },


];
export default config;
