import { createStore } from 'vuex';
import userStore from './userStore'; // 导入 userStore 模块


export const store = createStore({
  modules: {
    user: userStore,
  }
});

export default store;