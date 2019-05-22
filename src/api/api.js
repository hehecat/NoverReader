import axios from '@/axios/fetch'
import util from '@/api/util'

//1获取搜索结果
export function getSearchResult(word) {
  // let query = qs.stringify(word);
  return axios({
    url: '/novel/getSearchResult/' + word
  })
}

//2获取小说详情
export function getBookInfo(name) {
  return axios({
    url: '/novel/getBookInfo/' + name
  })
}

//3获取小说章节
export function getBookChapters(name) {
  return axios({
    url: '/novel/getChapters/' + name
  })
}

//4获取章节内容
export function getBookChapter(name, id) {
  return axios({
    url: '/novel/getChapter/' + name + '/' + id
  })
}

//5获取小说分类
export function getCategories() {
  return axios({
    url: '/novel/getCategory/'
  })
}

//6获取小说分类内容
export function getCategoryInfo(cate) {
  return axios({
    url: '/novel/getCategoryInfo/' + cate
  })
}
//7获取小说收藏榜
export function getStoreTop() {
  return axios({
    url: '/novel/getStoreTop'
  })
}
//8获取小说点击榜
export function getClickTop() {
  return axios({
    url: '/novel/getClickTop'
  })
}
//9获取小说推荐榜
export function getRecommendTop() {
  return axios({
    url: '/novel/getRecommendTop'
  })
}

//10用户注册
export function register(username, nickname, password, email, phone, intro) {
  return axios({
    url: '/user/register/',
    method: 'post',
    data: {
      username,
      password,
      email,
      nickname,
      phone,
      intro
    }
  })
}

//11用户登陆
export function login(username, password) {
  return axios({
    url: '/user/login/',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

//12保存用户收藏
export function saveLocalStorage() {
  return axios({
    url: '/user/saveLocalStorage/',
    method: 'POST',
    data: util.getLocalData('myfollowbook')
  })
}

//13保存用户阅读历史
export function saveHistory() {
  return axios({
    url: '/user/saveHistory/',
    method: 'POST',
    data: util.getLocalData('myhistory')
  })
}
//14获取用户阅读历史
export function getHistory() {
  return axios({
    url: '/user/getHistory/'
  })
}
//15清除用户阅读历史
export function clearHistory() {
  return axios({
    url: '/user/clearHistory/'
  })
}

//16获取用户收藏
export function getUserCollections() {
  return axios({
    url: '/user/getUserCollections/'
  })
}

//17添加用户评论
export function addComment(novelName, title, comment, rank) {
  return axios({
    url: '/novel/addComment/',
    method: 'post',
    data: {
      novelName,
      title,
      comment,
      rank
    }
  })
}

//18添加用户回复
export function addReply(content, commentId) {
  return axios({
    url: '/novel/addReply',
    method: 'post',
    data: {
      content,
      commentId
    }
  })
}

//19获取用户评论
export function getComments(novelname) {
  return axios({
    url: '/novel/getComments/' + novelname
  })
}

//20获取单个用户评论
export function getComment(commentId) {
  return axios({
    url: 'novel/getComment/' + commentId
  })
}

//21获取用户回复
export function getReplys(commentId) {
  return axios({
    url: '/novel/getReplys/' + commentId
  })
}
//22添加点赞
export function addThumb(type, goalId) {
  return axios({
    url: '/novel/addThumb/' + type + '/' + goalId
  })
}

//23签到
export function clock() {
  return axios({
    url: '/user/clock/'
  })
}

//判断用户是否签到
export function isUserClocked(userId) {
  return axios({
    url: '/user/isUserClocked/' + userId
  })
}
//获取关注列表
export function getFocus(userId) {
  return axios({
    url: '/user/getFocusByUser/' + userId
  })
}

//获取粉丝列表
export function getFans(userId) {
  return axios({
    url: '/user/getFansByUser/' + userId
  })
}

//关注
export function focus(to) {
  return axios({
    url: 'user/focus/' + to
  })
}

//取消关注
export function unFocus(to) {
  return axios({
    url: 'user/unFocus/' + to
  })
}
//是否关注
export function isFocus(to) {
  return axios({
    url: 'user/isFocus/' + to
  })
}

//获取用户信息
export function getUserInfo(userId) {
  return axios({
    url: 'user/getUserInfo/' + userId
  })
}

//获取用户评论
export function getCommentByUser(userId, number) {
  return axios({
    url: 'user/getCommentByUser/' + userId + '/' + number
  })
}

//上传图片
export function uploadImg(image) {
  return axios({
    url: 'user/uploadImg/',
    method: 'post',
    data: image
  })
}

//获取等级列表
export function getLevelList() {
  return axios({
    url: 'user/getLevelList/'
  })
}

//用户设置
export function userSetting(nickname, intro, oldPassword, newPassword) {
  return axios({
    url: 'user/userSetting/',
    method: 'post',
    data: {
      nickname,
      intro,
      oldPassword,
      newPassword
    }
  })
}
