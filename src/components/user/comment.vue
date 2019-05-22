<template>
  <div>
    <m-head class="head"
            :backbtn="true"></m-head>
    <mu-paper :z-depth="0"
              class="demo-list-wrap">
      <ul class="comment">
        <li class="comment-item"
            v-for="(comment,index) in comments"
            :key="index">
          <router-link tag='div'
                       :to="{ name: 'user', params: {userId:userId}}">
            <mu-avatar>
              <img :src="imgurl+userInfo.avatar">
            </mu-avatar>
            <div class="name">{{userInfo.nickname}}</div>
          </router-link>

          <div class="level"
               v-if="userInfo.lev">lv.{{userInfo.lev.levelName}}</div>
          <div>
            <star-rate :value="comment.rank"
                       disabled
                       type="star1" />
          </div>
          <div class="title"
               v-show="comment.title!=''">{{comment.title}}</div>
          <div class="tex"
               v-show="comment.comment!=''">{{comment.comment}}</div>
          <div class="foot">
            <div class="date">{{comment.update_time}}</div>
            <div class="right">
              <div class="thumb"
                   v-if="comment.is_thumb==0"
                   @click="addCommentThumb(comment.id,index)">{{comment.thumb}}</div>
              <div class="thumb2"
                   v-if="comment.is_thumb==1"
                   @click="isThumb()">{{comment.thumb}}</div>
              <router-link class="reply"
                           tag='div'
                           :to="{ name: 'write-reply', params: {commentId:comment.id}}">{{comment.reply}}</router-link>
            </div>
          </div>
        </li>
      </ul>
    </mu-paper>
  </div>
</template>

<script>
import StarRate from 'vue-cute-rate'

import header from "@/components/header/header";
import { getCommentByUser, getUserInfo } from '@/api/api'
export default {
  components: {
    "m-head": header,
    StarRate
  },
  data () {
    return {
      userId: this.$route.params.userId,
      userInfo: {},
      comments: [],
      imgurl: this.GLOBAL.IMG_URL
    }
  },
  created () {
    this.getCommentByUser();
    this.getUserInfo();
  },
  methods: {
    getCommentByUser () {
      getCommentByUser(this.userId, 20).then(res => {
        this.comments = res.data;
      })
    },
    getUserInfo () {
      getUserInfo(this.userId).then(res => {
        this.userInfo = res.data;
      })
    }
  }
}
</script>

<style scoped>
.head {
  position: fixed;
  top: 0;
  margin-bottom: 40px;
  width: 100%;
  z-index: 9999;
}
/*评论item*/
.comment-item {
  margin: 5px;
  position: relative;
  padding: 0 3px 2px 3px;
  border-bottom: 1px solid gainsboro;
}
.name {
  color: gray;
  margin-right: 5px;
  position: absolute;
  top: 10px;
  left: 50px;
  display: inline-block;
}
.level {
  position: absolute;
  top: 11px;
  left: 120px;
  color: gray;
  border-radius: 5px;
  font-size: 0.3em;
  border: 1px solid grey;
  padding: 0 0.2em;
  display: inline-block;
}
.title {
  margin: 5px 0;
}
.tex {
  text-align: left;
  color: gray;
  margin: 5px 0px;
}
.date {
  display: inline-block;
  width: 50%;
  font-size: 10px;
  color: gray;
}
.right {
  display: inline-block;
  padding-left: 31%;
  width: 50%;
  font-size: 12px;
  color: gray;
}
.thumb {
  display: inline-block;
  width: 44%;
  text-align: center;
}
.thumb2 {
  display: inline-block;
  width: 44%;
  text-align: center;
}
.reply::before {
  /* background: url("https://www.easyicon.net/api/resizeApi.php?id=1187838&size=14"); */
  content: "";
  display: block;
  width: 14px;
  height: 14px;
  float: left;
  margin: 1px 0 0 0;
}
.reply {
  display: inline-block;
  width: 44%;
  text-align: center;
}
.thumb::before {
  background: url("https://www.easyicon.net/api/resizeApi.php?id=1223115&size=14");
  content: "";
  display: block;
  width: 14px;
  height: 14px;
  float: left;
  margin: 1px 0 0 0;
}
.thumb2::before {
  background: url("https://www.easyicon.net/api/resizeApi.php?id=1182305&size=14");
  content: "";
  display: block;
  width: 14px;
  height: 14px;
  float: left;
  margin: 1px 0 0 0;
}
.mu-paper {
  margin-bottom: 60px;
  padding-top: 40px;
}
</style>
