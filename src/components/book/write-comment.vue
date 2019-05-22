<template>
  <div>
    <mu-appbar style="width: 100%;height:40px"
               z-depth="0">
      <mu-button icon
                 slot="left"
                 @click="back()">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
      <mu-button flat
                 @click='submit()'
                 slot="right">发布</mu-button>
    </mu-appbar>

    <div class="rate">
      <star-rate class="start"
                 v-model="rank"
                 type="star1"
                 :allow-clear="false" />
      <div class="text">{{ evaluation }}</div>
    </div>
    <mt-field maxlength="20"
              class="text"
              placeholder="听说起个好标题点击率会更高哦～"
              type="textarea"
              rows="1"
              v-model="title"></mt-field>
    <mt-field maxlength="300"
              @input="descInput"
              class="text"
              placeholder="请简明扼要的概括下这本书，控制在300字以内，也可以直接评分跳过短评发布。"
              type="textarea"
              rows="4"
              v-model="comment"></mt-field>

    <div class="number">{{remnant}}/300</div>
  </div>
</template>

<script>
import StarRate from 'vue-cute-rate'
import { MessageBox } from 'mint-ui'
import { addComment } from '@/api/api'
export default {
  components: {
    StarRate
  },
  data () {
    return {
      title: '',
      comment: '',
      remnant: 0,
      rank: 0,
      evaluations: ['打个分吧', '浪费生命', '打发时间', '值得一看', '非常喜欢', '必看神作'],
      evaluation: '打个分吧'

    }
  },
  watch: {
    'rank': function () {
      this.evaluation = this.evaluations[this.value];
    }
  },
  methods: {
    descInput () {
      var txtVal = this.comment.length;
      this.remnant = txtVal;
    },
    back () {
      this.$router.go(-1);
    },
    submit () {
      let novelname = this.$router.currentRoute.params.bookname;
      let title = this.title;
      let comment = this.comment;
      let rank = this.rank;
      if (this.rank === 0) {
        MessageBox('Notice', '请先评分哦～');
      } else if (this.remnant > 300) {
        MessageBox('Notice', '字数太多啦~');
      } else {
        addComment(novelname, title, comment, rank).then((res) => {
          if (res.data.errorCode == 0) {
            MessageBox.alert('发布成功!').then(() => {
              this.back();
            });
          }
        });
      }
    },
  }
}
</script>

<style>
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
</style>

