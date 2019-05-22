<template>
  <div>
    <div class="c1">热门书评</div>
    <router-link class="c2"
                 :to="{ name: 'write-comment', params: { bookname: this.$router.currentRoute.params.bookname }}"
                 tag='div'>写书评</router-link>
    <ul class="comment">
      <li class="comment-item"
          v-for="(comment,index) in Comments"
          :key="index">
        <router-link tag='div'
                     :to="{ name: 'user', params: {userId:comment.user.id}}">
          <mu-avatar>
            <img :src="imgurl+comment.user.avatar">
          </mu-avatar>
          <div class="name">{{comment.user.nickname}}</div>
        </router-link>

        <div class="level">lv.{{comment.user.lev}}</div>
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
  </div>
</template>

<script>
import { addThumb } from '@/api/api'
import { MessageBox } from 'mint-ui'
import StarRate from 'vue-cute-rate'

export default {
  components: {
    StarRate
  },
  props: ['Comments'],
  data () {
    return {
      imgurl: this.GLOBAL.IMG_URL,
    }
  },
  methods: {
    addCommentThumb (id, index) {
      addThumb('comment', id).then(res => {
        if (res.data.errorCode == 0) {
          this.Comments[index]['is_thumb'] = 1;
          this.Comments[index]['thumb'] += 1;
        } else if (res.data.errorCode == 30000) {
          MessageBox.alert('请先登录!');
        }
      })
    },
    isThumb () {
      MessageBox.alert('已经点赞过!');
    }
  }

}

</script>

<style scoped>
.c1 {
  width: 45%;
  margin: 10px;
  display: inline-block;
}
.c2 {
  margin-top: 10px;
  padding-left: 40px;
  width: 45%;
  color: darkred;
  display: inline-block;
}
.c2::before {
  content: "";
  display: block;
  width: 20px;
  height: 16px;
  float: left;
  margin: 2px 0 0 0;
  background: url("https://www.easyicon.net/api/resizeApi.php?id=1148019&size=16")
    no-repeat;
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
  background: url("https://www.easyicon.net/api/resizeApi.php?id=1187838&size=14");
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
</style>
