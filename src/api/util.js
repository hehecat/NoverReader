import _ from 'lodash'
const localStorage = window.localStorage;
export default {
  staticPath: 'http://127.0.0.1',
  getLocalData(item) {
    return _.isEmpty(JSON.parse(localStorage.getItem(item))) ? null : JSON.parse(localStorage.getItem(item));
  },

  setLocalData(item, obj) {
    localStorage.setItem(item, JSON.stringify(obj));
  }
}