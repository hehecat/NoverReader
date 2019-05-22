<template>
  <div>
    <div class="book-info-content">
      <div class="book-info-cover">
        <img :src="book.novel_cover||'image/nocover.jpg'">
      </div>
      <div class="book-info-describle">
        <h3 class="book-info-title">{{book.novel_name}}</h3>
        <p>作者：{{book.novel_author}}</p>
        <p>字数：{{book.novel_number}}</p>
        <p>收藏人数：{{book.novel_store}}</p>
        <p>最后更新：{{book.chapter_last.section_name}}</p>
      </div>
    </div>
    <div class="info-longintro">小说简介:
      <p>{{book.novel_introduction}}</p>
    </div>
    <comment :Comments='Comments'></comment>
    <ul class="btn-info-group">
      <router-link :to="'/reader/'+book._id"
                   tag="li">
        <div @click="saveHistory()">开始阅读</div>
      </router-link>
      <li class="btn-info-bookshelf"
          :class="{'btn-info-bookshelf-active':isfollowed}"
          @click="followAction"></li>
    </ul>
  </div>
</template>
<script type="text/javascript">
import { getComments, getBookInfo, saveLocalStorage, saveHistory } from "@/api/api";
import util from "@/api/util";
import moment from "moment";
import comment from "@/components/book/comment"
import { Indicator } from "mint-ui";


moment.locale("zh-cn");
export default {
  data () {
    return {
      book: {
        chapter_last: {
          section_name: ''
        }
      },
      isfollowed: false,
      Comments: {}
    };
  },
  components: {
    'comment': comment,
  },
  computed: {
    datareset () {
      return moment(this.book.updated).fromNow();
    }
  },
  created () {
    this.getbookInfo();
    this.getcomment();
  },
  watch: {
    "$route.params": "getbookInfo"
  },
  methods: {
    getcomment () {
      let novelname = this.$router.currentRoute.params.bookname;
      console.log(novelname);
      getComments(novelname).then(res => {
        this.Comments = res.data;
      })
    },
    isFollow () {
      let localShelf = util.getLocalData("myfollowbook");
      this.isfollowed = !!(localShelf && localShelf[this.book._id]);
    },
    saveHistory () {
      let history = util.getLocalData("myhistory") ? util.getLocalData("myhistory") : {}
      history[this.book._id] = {
        title: this.book.novel_name,
        cover: this.book.novel_cover,
        lastChapter: 0,
        position: 0,
      };
      console.log(history);

      util.setLocalData("myhistory", history);
      saveHistory().then();
    },
    followAction () {
      let localShelf = util.getLocalData("myfollowbook")
        ? util.getLocalData("myfollowbook")
        : {};
      if (this.isfollowed) {
        delete localShelf[this.book._id];
        util.setLocalData("myfollowbook", localShelf);
        this.isfollowed = !this.isfollowed;
      } else {
        localShelf[this.book._id] = {
          title: this.book.novel_name,
          cover: this.book.novel_cover,
          lastChapter: 0,
          position: 0,
        };
        util.setLocalData("myfollowbook", localShelf);
        this.isfollowed = !this.isfollowed;
      }
      saveLocalStorage().then(res => {
        console.log(res.data);

      })
    },
    getbookInfo () {
      Indicator.open();
      getBookInfo(this.$route.params.bookname).then(res => {
        this.book = res.data;
        this.isFollow();
        this.$store.commit("SetBookInfo", res.data);
        Indicator.close();
      }),
        err => {
          console.log(err);
          Indicator.close();
        };
    }
  }
};
</script>
<style type="text/css">
.book-info-content {
  padding: 30px 20px 30px 30px;
  display: table;
  width: 100%;
}
.book-info-cover {
  width: 93px;
  height: 124px;
  margin-right: 18px;
  float: left;
  border: 1px solid #f0f0f0;
  box-shadow: 0 5px 10px #555;
  border-radius: 4px;
}
.book-info-cover > img {
  width: 100%;
  height: 100%;
}
.book-info-describle {
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.book-info-title {
  font-weight: normal;
  font-size: 16px;
  margin-bottom: 5px;
}
.book-info-describle p {
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.btn-info-group {
  position: fixed;
  bottom: 0;
  width: 100%;
  font-size: 0;
  /* padding: 0 10px 10px; */
  /* margin-bottom: 10px; */
}
.btn-info-group > li {
  text-align: center;
  display: inline-block;
  width: 50%;
  background-color: #fff;
  font-size: 14px;
  line-height: 3.8em;
  height: 53px;
  /* border-radius: 4px; */
  /* border: solid 1px #ddd; */
}
.btn-info-group > li:first-child {
  /* margin-right: 2%; */
  background-color: #409eff;
  color: #efefef;
  border-right: solid 1px #ddd;
}

.btn-info-bookshelf-active::after {
  content: "\53D6\6D88\6536\85CF" !important;
  background-color: #409eff !important;
  color: #efefef;
  display: block;
}
.btn-info-bookshelf::after {
  content: "\52A0\5165\6536\85CF";
  display: block;
}
.info-longintro > p {
  padding: 10px 14px;
  line-height: 2em;
}
.info-longintro {
  border-bottom: 2px solid #ddd;
}

.info-last-chapter {
  padding: 10px 14px;
  margin-bottom: 10px;
  line-height: 28px;
}
.last-update {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: #42b983;
}
.last-update:hover {
  color: #42b983;
}

.info-tags {
  padding: 10px 14px;
  overflow: hidden;
  text-emphasis: ellipsis;
  white-space: nowrap;
}
.info-tags > span {
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: #e6a23c;
  color: #f2f6fc;
}
.info-tags > span + span {
  margin-left: 10px;
}
.info-tags > span:last-child {
  background-color: #53ac7d;
}
.nextread {
  margin-bottom: 10px;
  text-align: center;
}
.hot_head {
  color: #555;
  font-size: 18px;
  width: 80%;
  float: left;
}
.write_comment {
  width: 20%;
  float: left;
}
.rate {
  width: 100px;
}
</style>
