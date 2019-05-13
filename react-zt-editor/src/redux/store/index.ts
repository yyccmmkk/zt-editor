import { createStore } from 'redux';
import main from '../reducers'
let store =createStore(main);
export {store};
export default store;
