import { createStore } from 'vuex';
// 定义模块对象
const userStore = {
  namespaced: true, // 启用命名空间
  state() {
    return {
      showAuth: true,
      status:"正常",
      registerTime:"2024-10-16",
      name:"username",
      phone:"phone",
      email:"email",
      text:"text",
    };
  },
  mutations: {
    // 定义你的 mutations
    openAuth(state){
      state.showAuth = true;
    },
    closeAuth(state){
      state.showAuth = false;
    }
  },
  actions: {
    // 定义你的 actions
    openAuth({commit}){
      commit('openAuth');
    },
    closeAuth({commit}){
      commit('closeAuth');
    }
  },
  getters: {
    // 定义你的 getters
  }
};

// 默认导出模块对象
export default userStore;