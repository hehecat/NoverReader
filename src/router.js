import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'bookshelf',
      component: resolve => require(['@/components/home/bookshelf'], resolve),
      meta: {
        keepAlive: false,
        isShowFoot: true
      }
    },
    {
      path: '/index.html',
      name: 'index',
      component: resolve => require(['@/components/home/bookshelf'], resolve),
      meta: {
        keepAlive: false,
        isShowFoot: true
      }
    },
    {
      path: '/header',
      name: 'header',
      component: resolve => require(['@/components/header/header'], resolve),
      meta: {
        keepAlive: true,
        isShowFoot: true
      }
    },
    {
      path: '/search',
      name: 'search',
      component: resolve => require(['@/components/header/search'], resolve),
      meta: {
        keepAlive: true,
        isShowFoot: true
      }
    },
    {
      path: '/bookinfo/:bookname',
      name: 'bookinfo',
      component: resolve => require(['@/components/book/bookinfo'], resolve),
      meta: {
        keepAlive: false,
        isShowFoot: false
      }
    },
    {
      path: '/booksTop',
      name: 'booksTop',
      component: resolve => require(['@/components/home/booksTop'], resolve),
      meta: {
        keepAlive: true,
        isShowFoot: true
      }
    },
    {
      path: '/category',
      name: 'category',
      component: resolve => require(['@/components/home/category'], resolve),
      meta: {
        keepAlive: true,
        isShowFoot: true
      }
    },
    {
      path: '/categorylist/:cate',
      name: 'categorylist',
      component: resolve => require(['@/components/categorylist'], resolve),
      meta: {
        keepAlive: false,
        isShowFoot: true
      }
    },
    {
      path: '/reader/:bookid',
      name: 'reader',
      component: resolve =>
        require(['@/components/readerPages/reader'], resolve),
      meta: {
        keepAlive: false,
        isShowFoot: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/components/user/login'], resolve),
      meta: {
        keepAlive: false,
        isShowFoot: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: resolve => require(['@/components/user/register'], resolve),
      meta: {
        keepAlive: false,
        isShowFoot: true
      }
    },
    {
      path: '/me',
      name: 'me',
      component: resolve => require(['@/components/home/user'], resolve),
      meta: {
        keepAlive: false,
        isShowFoot: true,
        requireAuth: true
      }
    },
    {
      path: '/write-comment/:bookname',
      name: 'write-comment',
      component: resolve =>
        require(['@/components/book/write-comment'], resolve),
      meta: {
        keepAlive: false,
        isShowFoot: false,
        requireAuth: true
      }
    },
    {
      path: '/write-reply/:commentId',
      name: 'write-reply',
      component: resolve => require(['@/components/book/write-reply'], resolve),
      meta: {
        keepAlive: false,
        isShowFoot: false,
        requireAuth: true
      }
    },
    {
      path: '/user/:userId',
      name: 'user',
      component: resolve => require(['@/components/user/user'], resolve),
      meta: {
        keepAlive: false,
        isShowFoot: false,
        requireAuth: false
      }
    },
    {
      path: '/userFocus/:userId',
      name: 'userFocus',
      component: resolve => require(['@/components/user/focus'], resolve),
      meta: {
        keepAlive: false,
        isShowFoot: true,
        requireAuth: false
      }
    },
    {
      path: '/userComment/:userId',
      name: 'userComment',
      component: resolve => require(['@/components/user/comment'], resolve),
      meta: {
        keepAlive: false,
        isShowFoot: true,
        requireAuth: false
      }
    },
    {
      path: '/level/:userId',
      name: 'level',
      component: resolve => require(['@/components/user/level'], resolve),
      meta: {
        keepAlive: false,
        isShowFoot: true,
        requireAuth: true
      }
    },
    {
      path: '/setting/',
      name: 'setting',
      component: resolve => require(['@/components/home/setting'], resolve),
      meta: {
        keepAlive: false,
        isShowFoot: false,
        requireAuth: true
      }
    },
    {
      path: '/history/',
      name: 'history',
      component: resolve => require(['@/components/home/history'], resolve),
      meta: {
        keepAlive: false,
        isShowFoot: false,
        requireAuth: true
      }
    }
  ]
})
