<template>
  <div class="list-book-container">
    <m-head :backbtn="true"></m-head>
    <listItem :Lists="Categorylist"></listItem>
  </div>
</template>
<script type="text/javascript">
import header from "@/components/header/header";
import listItem from "@/components/listitem";
import { Indicator } from "mint-ui";
import { getCategoryInfo } from "@/api/api";
import { getRecommendTop, getClickTop, getStoreTop } from "@/api/api";


export default {
  data () {
    return {
      Categorylist: {}
    };
  },
  components: {
    "m-head": header,
    listItem
  },
  created () {
    Indicator.open();
    let cate = this.$route.params.cate;
    if (cate == 'recommendList') {
      getRecommendTop().then(res => {
        this.Categorylist = res.data;
        Indicator.close();
      });
    } else if (cate == 'storeList') {
      getStoreTop().then(res => {
        this.Categorylist = res.data;
        Indicator.close();
      });
    } else if (cate == 'clickList') {
      getClickTop().then(res => {
        this.Categorylist = res.data;
        Indicator.close();
      });
    } else {
      getCategoryInfo(cate).then(res => {
        this.Categorylist = res.data;
        Indicator.close();
      });
    }
  }
};
</script>
<style type="text/css">
.list-book-container {
  height: 92vh;
  overflow: hidden;
  padding-bottom: 25px;
}
</style>
