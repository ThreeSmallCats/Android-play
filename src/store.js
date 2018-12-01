import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    iframeLink:'',
    title:'',
    // nav点击后获取的全部数据
    navClickData:'',
    // 点击mennu获取到的对应的数据(一级出来)
    menuClick:'',
    // 点击mennu获取到的对应的数据(二级出来)(可能用到.........)
    twoMenuClick:'',
    projectCid:249,
    projectNum:1,
    weChatCid:408,
    weChatNum:1,
    systemCid:60,
    systemNum:0
  },
  mutations: {
    setIframeLink(state,val){
      state.iframeLink = val
    },
    setTitle(state, val) {
      state.title = val
    },
    setNavClickData(state, val) {
      state.navClickData = val
    },
    setMenuClick(state, val) {
      state.menuClick = val
    },
    setTwoMenuClick(state, val) {
      state.twoMenuClick = val
    },
    setProjectCid(state, val) {
      state.projectCid = val
    },
    setProjectNum(state, val) {
      state.projectNum = val
    },
    setWeChatCid(state, val) {
      state.weChatCid = val
    },
    setWeChatNum(state, val) {
      state.weChatNum = val
    },
    setSystemCid(state, val) {
      state.systemCid = val
    },
    setSystemNum(state, val) {
      state.systemNum = val
    }
  },
  getters:{
    getTitle(state){
      return state.title
    }
  },
  actions: {}
});
