<template>
  <div>
    <m-head class="head"
            :backbtn='true'></m-head>
    <mu-container class="container">
      <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;">
        <mu-card-header v-if="userInfo.lev"
                        :title="userInfo.nickname"
                        :sub-title="userInfo.lev.levelName">
          <mu-avatar slot="avatar">
            <img :src="this.GLOBAL.IMG_URL+userInfo.avatar">
          </mu-avatar>
          <mu-button flat
                     @click="userFocus()"
                     color="primary">
            <mu-icon left
                     :value="isfocus"></mu-icon>
            关注
          </mu-button>
        </mu-card-header>
        <router-link tag="div"
                     :to="'/userFocus/'+this.userId">
          <mu-row>
            <mu-col offset="4"
                    span="3">
              <div class="grid-cell">关注 <span>{{this.userInfo.focus_num}}</span></div>
            </mu-col>
            <mu-col span="3">
              <div class="grid-cell">粉丝 <span>{{this.userInfo.fans_num}}</span></div>
            </mu-col>
          </mu-row>
        </router-link>
        <mu-card-text>
          {{this.userInfo.intro}}
        </mu-card-text>

        <mu-paper>
          <mu-sub-header>在读 <span class="book-num">全部 {{this.books.length}} 本</span>
          </mu-sub-header>
          <mu-divider>
          </mu-divider>
          <mu-grid-list :cell-height='118'
                        class="gridlist-inline"
                        :cols="4">
            <div v-for="(book, index) in books"
                 :key="index">
              <router-link :to="'/bookinfo/'+book.novel_name"
                           tag="div">
                <mu-grid-tile>
                  <img :src="book.cover">
                  <span slot="title">{{book.novel_name}}</span>
                </mu-grid-tile>
              </router-link>
            </div>
          </mu-grid-list>
        </mu-paper>
      </mu-card>
      <mu-paper :z-depth="0"
                class="demo-list-wrap">
        <mu-list textline="three-line">
          <mu-sub-header>最近动态</mu-sub-header>
          <div class='no-content'
               v-if="comments.length<1">无</div>
          <div v-for="(comment, index) in comments"
               :key="index">
            <mu-list-item v-if="comment.comment"
                          avatar
                          :ripple="false">
              <mu-list-item-action>
                <mu-avatar slot="avatar">
                  <img :src="imgurl+userInfo.avatar">
                </mu-avatar>
              </mu-list-item-action>
              <mu-list-item-content>
                <mu-list-item-title>{{comment.title}}</mu-list-item-title>
                <mu-list-item-sub-title>
                  <span style="color: rgba(0, 0, 0, .87)">{{comment.novelname}}</span>
                  <br>
                  {{comment.comment}}
                </mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
            <!-- <mu-divider></mu-divider> -->
          </div>
        </mu-list>
      </mu-paper>
    </mu-container>
  </div>

</template>

<script>
import header from '@/components/header/header'
import { getCommentByUser, getUserCollections, getFans, getFocus, isFocus, focus, unFocus, getUserInfo } from '@/api/api'
export default {
  components: {
    "m-head": header,
  },
  data () {
    return {
      userId: this.$route.params.userId,
      userInfo: {},
      focuses: [],
      fans: [],
      books: [],
      comments: [],
      isfocus: 'star_border',
      imgurl: this.GLOBAL.IMG_URL
    };
  },
  created () {
    this.getFans();
    this.getFocus();
    this.isFocus();
    this.getUserInfo();
    this.getUserCollect();
    this.getCommentByUser();
    console.log(this.GLOBAL.IMG_URL)
  },
  methods: {
    userFocus () {
      if (this.isfocus == 'star') {
        this.unFocus();
        console.log(1);

      } else {
        this.focus();
        console.log(2);
      }
    },
    focus () {
      focus(this.userId).then(res => {
        if (res.data.errorCode == 0) {
          this.isfocus = 'star';
        }
      })
    },
    isFocus () {
      isFocus(this.userId).then(res => {
        if (res.data.errorCode == 0) {
          this.isfocus = 'star';
        }
      })
    },
    unFocus () {
      unFocus(this.userId).then(res => {
        if (res.data.errorCode == 0) {
          this.isfocus = 'star_border';
        }
      })
    },
    getFans () {
      getFans(this.userId).then(res => {
        this.fans = res.data;
      })
    },
    getFocus () {
      getFocus(this.userId).then(res => {
        this.focuses = res.data;
      })
    },
    getUserInfo () {
      getUserInfo(this.userId).then(res => {
        this.userInfo = res.data;
      })
    },
    getUserCollect () {
      getUserCollections(this.userId).then(res => {
        this.books = res.data;
      })
    },
    getCommentByUser () {
      getCommentByUser(this.userId, 10).then(res => {
        this.comments = res.data;
      })
    }
  }
}
</script>
<style lang="less" scoped>
.gridlist-inline {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}
.demo-text {
  padding: 6px;
  background: #fff;
  p {
    margin: 8px 0;
  }
}
.container {
  padding-top: 50px;
}
.demo-list-wrap {
  width: 100%;
  max-width: 360px;
  overflow: hidden;
}
.mu-grid-tile-wrapper {
  width: 100% !important;
}
.mu-card-header-title {
  padding-right: 50px;
}
.offset-4 {
  margin-left: 30%;
}
.grid-cell span {
  font-size: 15px;
  font-weight: 600;
}
.book-num {
  position: absolute;
  right: 20px;
}
.book-num::after {
  content: " >";
  font-size: 18px;
  font-weight: 500px;
}
.mu-grid-tile > img {
  width: 86px;
  height: 113px;
}
.mu-grid-tile-titlebar {
  position: relative;
  height: 10px;
}
.head {
  position: fixed;
  top: 0;
  margin-bottom: 40px;
  width: 100%;
  z-index: 9999;
}
.no-content {
  margin: 40px 20px;
  text-align: center;
}
</style>
