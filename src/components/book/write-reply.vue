<template>
  <div>
    <mu-appbar style="width: 100%;height:40px"
               z-depth="0">
      <mu-button icon
                 slot="left"
                 @click="back()">
        <mu-icon value="arrow_back"
                 @click="back()"></mu-icon>
      </mu-button>
      回复评论
    </mu-appbar>

    <div class="comment"
         v-if="comment.user">
      <div class="name">{{comment.user.nickname}}</div>
      <div class="level">lv.{{comment.user.lev}}</div>
      <div>
        <star-rate :value="comment.rank"
                   disabled
                   type="star1"
                   v-model="comment.rank" />
      </div>
      <div class="title"
           v-show="comment.title!='null'">{{comment.title}}</div>
      <div class="tex"
           v-show="comment.comment!='null'">{{comment.comment}}</div>
      <div class="thumbNum">
        <i class="material-icons">
          thumb_up
        </i>
        {{comment.thumb}}
      </div>
    </div>

    <ul class="replys">
      <li class="comment-item"
          v-for="(reply,index) in replys"
          :key="reply.id">
        <!-- <img class="avatar"
             src="https://static.easyicon.net/preview/115/1154173.gif"
             alt=""> -->
        <div class="name">{{reply.user.nickname}}</div>
        <div class="level">lv.{{reply.user.lev}}</div>
        <div class="tex">{{reply.content}}</div>
        <div class="foot">
          <div class="date">{{reply.update_time}}</div>
          <div class="right">
            <div class="thumb"
                 v-if="reply.is_thumb==0"
                 @click="addReplyThumb(reply.id,index)">{{reply.thumb}}</div>
            <div class="thumb2"
                 v-if="reply.is_thumb==1"
                 @click="isThumb()">{{reply.thumb}}</div>
          </div>
        </div>
      </li>
    </ul>

    <div class="footer">
      <mt-field maxlength="300"
                class="reply"
                type="text"
                rows="1"
                v-model="reply"></mt-field>
      <mu-button class="submit"
                 @click="userReply()"
                 color="primary">发布</mu-button>
    </div>
  </div>

</template>

<script>
import { MessageBox } from 'mint-ui'
import { getComment, addReply, getReplys, addThumb } from '@/api/api'
import StarRate from 'vue-cute-rate'

export default {
  components: {
    StarRate
  },
  data () {
    return {
      comment: {},
      replys: {},
      reply: '',
      commentId: this.$route.params.commentId,
    }
  },
  inject: ['reload'],
  created () {
    this.getReply();
    this.getComment();
  },
  methods: {
    back () {
      this.$router.go(-1);
    },
    getReply () {
      getReplys(this.commentId).then(res => {
        this.replys = res.data;
      });
    },
    getComment () {
      getComment(this.commentId).then(res => {
        this.comment = res.data;
      });
    },
    userReply () {
      if (this.reply === '') {
        MessageBox.alert('回复不能为空');
      } else {
        addReply(this.reply, this.commentId).then(res => {
          if (res.data.errorCode === 0) {
            MessageBox.alert('发布成功!').then(() => {
              this.reload();
            });
          } else {
            console.log(res.data.errorCode);
          }
        });
      }
    },
    addReplyThumb (id, index) {
      addThumb('reply', id).then(res => {
        if (res.data.errorCode == 0) {
          this.replys[index]['is_thumb'] = 1;
          this.replys[index]['thumb'] += 1;
        } else {
          MessageBox.alert(res.data.msg);
        }
      })
    },
    isThumb () {
      MessageBox.alert('已点赞!');
    }

  }
}
</script>

<style scoped >
.mu-appbar {
  position: fixed;
  top: 0;
}

.rate {
  text-align: center;
}
.text {
  text-align: center;
}
.number {
  text-align: right;
  margin-right: 10px;
}
.start {
  width: 320px;
}
.comment {
  margin: 5px;
  padding: 0 3px 2px 3px;
  border-bottom: 1px solid gainsboro;
}
.comment-item {
  margin: 5px;
  padding: 0 3px 2px 3px;
  border-bottom: 1px solid gainsboro;
}
.avatar {
  border-radius: 15px;
  margin-right: 5px;
  width: 30px;
  display: inline-block;
}
.name {
  color: gray;
  margin-right: 5px;
  display: inline-block;
}
.level {
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
.thumbNum {
  text-align: center;
}
.thumbNum img {
  display: inline;
}
/* 回复 */
.reply {
  /* display: inline-block; */
  width: 72%;
}
.replys {
  margin-bottom: 60px;
}
.footer {
  width: 100%;
  position: fixed;
  bottom: 0;
}
.submit {
  width: 27%;
  height: 43px;
  position: absolute;
  bottom: 3px;
  right: 1px;
}
</style>

