<template>
  <div class="myfollow-book-container">
    <m-header :center="true"></m-header>
    <div class="myfollow-book-view">
      <div @click="$router.push({path:'/booksTop'})"
           v-show="nobook"
           class="myfollow-noitem"></div>
      <p class="myfollow-book-msg"
         v-show="nobook">书架空空如也，点击添加图书</p>
      <ul class="myfollow-book-list">
        <li class="myfollow-book-item"
            v-for="(book,index) in followbook"
            :key="index">
          <a @click="readbook(index)"
             @touchstart="ontouchstart(index)"
             @touchmove="ontouchmove"
             @touchend="ontouchend">
            <img :src="book.cover||'image/nocover.jpg'">
            <p>{{book.title}}</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import header from "@/components/header/header";
import util from "@/api/util";
import _ from "lodash";
import { saveLocalStorage } from '@/api/api'
import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      nobook: true,
      timer: null,
      followbook: {}
    };
  },
  created () {
    this.getfollowbook();
  },
  methods: {
    ontouchstart (id) {
      this.timer = setTimeout(() => {
        MessageBox.confirm('确定要这么做？', '取消收藏').then(() => {
          let localShelf = util.getLocalData('myfollowbook') ? util.getLocalData('myfollowbook') : {};
          delete localShelf[id];
          util.setLocalData('myfollowbook', localShelf);
          this.getfollowbook();
          saveLocalStorage()
        }).catch((err) => {
          return err;
        })
      }, 1000)
    },
    ontouchmove () {
      clearTimeout(this.timer);
    },
    ontouchend () {
      clearTimeout(this.timer);
    },
    getfollowbook () {
      let localShelf = util.getLocalData("myfollowbook")
        ? util.getLocalData("myfollowbook")
        : {};
      if (!_.isEmpty(localShelf)) {
        this.followbook = localShelf;
        this.nobook = false;
      } else {
        this.nobook = true;
        this.followbook = {};
      }
    },
    readbook (id) {
      let localShelf = util.getLocalData('myfollowbook') ? util.getLocalData('myfollowbook') : {}
      this.$store.commit('SetBookInfo', localShelf[id])
      this.$router.push({ 'name': 'reader', params: { bookid: id } })
    }
  },
  components: {
    "m-header": header,
  }
};
</script>


<style>
body a {
  margin: 0;
  color: #555;
}

.myfollow-book-container {
  position: relative;
  height: 92vh;
  overflow: hidden;
  padding-bottom: 25px;
}
.myfollow-book-view {
  height: 47.5%;
}

.myfollow-book-list {
  font-size: 0;
}
.myfollow-book-item {
  display: inline-block;
  width: 33.33%;
  padding: 10px 14px;
}
.myfollow-book-item > a img {
  margin: 0 auto;
  width: 86px;
  height: 113px;
  border-radius: 4px;
  box-shadow: 0 5px 10px #555;
}
.myfollow-book-item > a p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
  color: #555;
  text-align: center;
  margin-top: 5px;
}
.myfollow-noitem {
  width: 150px;
  height: 150px;
  border-radius: 10%;
  position: absolute;
  margin: auto;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #555;
  background: url("~@/assets/addbg.jpeg") no-repeat;
  background-size: 150px 150px;
  background-position: center;
}
.myfollow-book-msg {
  text-align: center;
  margin-top: 15vh;
}
</style>
