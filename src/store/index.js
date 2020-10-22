import Vue from 'vue'
import Vuex from 'vuex'
import {
  setStore,
  getStore,
  removeStore
} from '@/utils/store'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)
const state = { // 要设置的全局访问的state对象
  history: [],// 要设置的初始属性值
  authActive: '',
  routerShow: false,
  browserHeaderTitle: getStore({
    name: 'browserHeaderTitle'
  }) || '后台管理系统',
  login: false,
  form: {},
  token: '',
  powerList: '',
  tableName: '',
  selectIndex: 0,
  selectIndex3: 0,
  topath: '/',
  commonShow: true,
  stateName: '',
  tabTitle: '',
  loginList: {},
  visitingShow: false,
  expertShow: false,
  processList: [],
  lang: 'zh',//默认语言
}
const getters = { // 实时监听state值的变化(最新状态)
}
const mutations = {
  addHistory(state, data) {
    if (!state.history) {
      state.history = [
      ]
    }
    state.history.push(data)
    // sessionStorage.setItem('history', JSON.stringify(state.history))
  },
  delHistory(state, data) {
    state.history.splice(data, 1)
    // sessionStorage.setItem('history', JSON.stringify(state.history))
  },
  authActiveAction(state, data) {
    state.authActive = data
    // sessionStorage.setItem('authActive', state.authActive)
  },
  SET_BROWSERHEADERTITLE(state, data) {
    state.browserHeaderTitle = data.browserHeaderTitle
  },
  SET_BROWSERHEADERTITLE(state, data) {
    state.browserHeaderTitle = data.browserHeaderTitle
  },
  ROUTER_SHOW(state, data) {
    state.routerShow = data;
  },
  GET_LANGUAGE(state, data) {
    state.lang = data
  },
  GET_TOKEN(state, data) {
    state.token = data;
    sessionStorage.token = state.token;
  },
  GET_POWERLIST(state, data) {
    state.powerList = data
  },
  GET_TABLENAME(state, data) {
    state.tableName = data
  },
  GET_LOGIN(state, data) {
    state.login = data
    sessionStorage.login = state.login;
  },
  GET_SELECTINDEX(state, data) {
    state.selectIndex = data
  },
  GET_SELECTINDEX3(state, data) {
    state.selectIndex3 = data
  },
  GET_TOPATH(state, data) {
    state.topath = data
    // console.log(data)
  },
  GET_COMMONSHOW(state, data) {
    state.commonShow = data
  },
  GET_STATENAME(state, data) {
    state.stateName = data
  },
  GET_TABTITLE(state, data) {
    state.tabTitle = data
  },
  GET_FROM(state, data) {
    state.form = data
  },
  SET_LOGINLIST(state, data) {
    state.loginList = data
  },
  GET_VISITINGSHOW(state, data) {
    state.visitingShow = data
  },
  GET_EXPERTSHOW(state, data) {
    state.expertShow = data
  },
  SET_PROCESSLIST(state, data) {
    state.processList = data
  },
  SET_LAYOUT(state, data) {
    console.log(data)
    // state.login = data.login
    state.topath = '/';
    state.tabTitle = '';
    state.powerList = [];
    state.tableName = '';
    // state.token = data.token;;
    state.loginList = '';
    state.visitingShow = false;
    state.expertShow = false;
  }
}
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  plugins: [createPersistedState({
    // storage: window.sessionStorage,
    reducer(val) {
      return {
        // 只储存state中的token
        lang: val.lang,
        // login: val.login,
        // selectIndex: val.selectIndex,
        topath: val.topath,
        commonShow: val.commonShow,
        tabTitle: val.tabTitle,
        powerList: val.powerList,
        tableName: val.tableName,
        // token: val.token,
        loginList: val.loginList,
        visitingShow: val.visitingShow,
        expertShow: val.expertShow,
      }
    }
  })]
})

export default store
