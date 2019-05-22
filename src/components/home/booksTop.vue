<template>
  <div class="index-container">
    <keep-alive>
      <div class="index-main-box">
        <m-head :menubtn="true"
                :center="true"></m-head>
        <div class="index-scroll-view"
             ref="indexview">
          <mu-list>
            <mu-list-item button
                          :ripple="false">
              <mu-list-item-action>
                <mu-icon value="equalizer"></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>小说榜单</mu-list-item-title>
            </mu-list-item>
          </mu-list>
          <mu-divider></mu-divider>
          <mu-list>
            <mu-list-item button
                          @click="golist('clickList')"
                          :ripple="true">
              <mu-list-item-title>点击榜</mu-list-item-title>
              <mu-list-item-action>
                <mu-icon value="keyboard_arrow_right"></mu-icon>
              </mu-list-item-action>
            </mu-list-item>
            <mu-list-item button
                          @click="golist('storeList')"
                          :ripple="true">
              <mu-list-item-title>收藏榜</mu-list-item-title>
              <mu-list-item-action>
                <mu-icon value="keyboard_arrow_right"></mu-icon>
              </mu-list-item-action>
            </mu-list-item>
            <mu-list-item button
                          @click="golist('recommendList')"
                          :ripple="true">
              <mu-list-item-title>推荐榜</mu-list-item-title>
              <mu-list-item-action>
                <mu-icon value="keyboard_arrow_right"></mu-icon>
              </mu-list-item-action>
            </mu-list-item>
          </mu-list>
        </div>
      </div>
    </keep-alive>
  </div>
</template>

<script>
import indexHeader from "@/components/header/header";
// import { Indicator } from "mint-ui";
export default {
  components: {
    "m-head": indexHeader,
  },
  data () {
    return {

    };
  },

  methods: {
    randomnum (arr) {
      return parseInt(Math.random() * (arr.length - 1));
    },
    golist (name) {
      this.$router.push({
        name: "categorylist",
        params: { cate: name },
      });
    },
  }
};
</script>

<style>
body a {
  margin: 0;
  color: #555;
}
ul {
  display: block;
  list-style-type: none;
  -webkit-margin-before: 0;
  -webkit-margin-after: 0;
  -webkit-margin-start: 0px;
  -webkit-margin-end: 0px;
  -webkit-padding-start: 0;
}
.index-main-box {
  height: 92vh;
  overflow: hidden;
  padding-bottom: 25px;
}
.index-scroll-view {
  overflow-y: scroll;
  height: 97.5%;
}
</style>
