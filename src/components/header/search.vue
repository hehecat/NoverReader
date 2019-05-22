<template>
  <div class="search-contaier">
    <mu-appbar style="width: 100%;height:50px"
               z-depth="0"
               color="#fff">
      <div class="search-input-group">
        <input @keydown="keydownsearch"
               class="search-input-text"
               v-model="keyword"
               type="text"
               name="searchBook"
               placeholder="输入书名/作者/关键字">
      </div>
      <mu-button icon
                 @click="searchbook"
                 slot="right">
        <mu-icon value="search"
                 color="black"></mu-icon>
      </mu-button>
    </mu-appbar>
    <div class="no-result"
         v-show="noResult">
      <p>搜索结果未找到</p>
    </div>
    <listItem :Lists="lists"></listItem>
    <m-footer id="foot"></m-footer>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import listitem from "../listitem";
import footer from "@/components/footer/footer";
import { getSearchResult } from "@/api/api";

export default {
  components: {
    listItem: listitem,
    "m-footer": footer
  },
  data () {
    return {
      keyword: "",
      lists: {},
      bgcolor: [],
      noResult: false
    };
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit("SetSearchResult", {});
    next();
  },
  watch: {
    "$store.state.SearchResult": function () {
      if (this.$store.state.SearchResult.total == 0) {
        this.noResult = true;
      } else {
        this.noResult = false;
        this.lists = this.$store.state.SearchResult;
      }
    }
  },
  methods: {
    keydownsearch (el) {
      if (el.keyCode == 13) {
        this.searchbook();
      }
    },
    searchbook () {
      if (this.keyword == "") {
        Toast({
          message: "请输入关键字",
          duration: 2000
        });
      } else {
        getSearchResult(this.keyword).then(res => {
          this.$store.commit("SetSearchResult", res.data);
        });
      }
    }
  }
};
</script>

<style type="text/css">
.search-contaier {
  height: 92vh;
  overflow: hidden;
  position: relative;
  padding-bottom: 25px;
}
.search-input-group {
  position: absolute;
  height: 34px;
  top: 3px;
  left: 0;
  width: 100%;
  padding: 0 45px 0 28px;
  font-size: 0;
}
.search-input-text {
  height: 32px;
  width: 100%;
  outline: none;
  padding: 5px 0 0 10px;
  font-size: 16px;
  background-color: #fff;
  border-bottom: 1px solid #65b1ff;
}
.search-input-text::-webkit-input-placeholder {
  color: black;
}
.search-input-text:-moz-placeholder {
  color: black;
}
.search-input-text::-moz-placeholder {
  color: black;
}
.search-input-text:-ms-input-placeholder {
  color: black;
}

.no-result {
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 18px;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.search-hotwords-container {
  padding: 10px 25px;
}
.search-hotwords-container > h3 {
  font-weight: normal;
  font-size: 16px;
  margin-bottom: 10px;
}
.search-hotwords {
  margin: 0px 10px 10px 0;
  float: left;
}
.search-hotwords > a {
  padding: 5px 10px;
  border-radius: 4px;
  color: black;
}
</style>
