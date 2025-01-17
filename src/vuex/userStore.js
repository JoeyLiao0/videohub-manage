// 定义模块对象
const userStore = {
  namespaced: true, // 启用命名空间
  state() {
    return {
      showAuth: true,
      status: null,
      registerTime: null,
      name: null,
      email: null,
      avatar: null,
    };
  },
  mutations: {
    OPEN_AUTH(state) {
      state.showAuth = true;
    },
    CLOSE_AUTH(state) {
      state.showAuth = false;
    },
    SET_ME_INFO(state, payload) {
      state.status = payload.status;
      state.registerTime = payload.time;
      state.email = payload.email;
      state.avatar = payload.avatar;
      state.name = payload.name;
      state.avatar = payload.avatar;
    }
  },
  actions: {
    openAuth({ commit }) {
      commit("OPEN_AUTH");
    },
    closeAuth({ commit }) {
      commit("CLOSE_AUTH");
    },
    setMeInfo({commit},data){
      commit("SET_ME_INFO", data);
    },
  },
};

// 默认导出模块对象
export default userStore;
