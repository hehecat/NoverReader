import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let state = {
  isShowCatlog: false,
  isShowFoot: false,
  token: '',
  user: {},
  BookInfo: {},
  RankList: {},
  CategoryList: {},
  SearchResult: {}
}
let mutations = {
  SetCategoryList(state, list) {
    state.CategoryList = list;
  },
  SetUser(state, user) {
    state.user = user;
  },
  SetRankList(state, rank) {
    state.RankList = rank;
  },
  SetToken(state, token) {
    state.token = token;
  },
  ChangeDetail(state, name) {
    if (name == 'catlog') {
      state.isShowCatlog = true;
      state.isShowSource = false;
    } else if (name == 'source') {
      state.isShowSource = true;
      state.isShowCatlog = false;
    } else {
      state.isShowSource = false;
      state.isShowCatlog = false;
    }
  },
  SetBookInfo(state, book) {
    state.BookInfo = book;
  },
  SetSearchResult(state, books) {
    state.SearchResult = books;
  }
}

export default new Vuex.Store({
  state,
  mutations
})