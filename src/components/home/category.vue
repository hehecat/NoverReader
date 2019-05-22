<template>
  <div class="category-container">
    <m-head :center="true"></m-head>
    <div class="category-view">
      <ul class="category-list">
        <li v-for="(list,index) in categorylist"
            :key="index.id"
            class="category-list-item">
          <mu-row @click="golist(list)">
            <mu-col span="6">
              <div class="imgbox">
                <img :src="list.img">
              </div>
            </mu-col>
            <mu-col span="6">
              <p class="category-list-number"
                 style="font-size: 15px;font-weight: bold;line-height: 40px">{{list.name}}</p>
              <p class="category-list-number">{{list.number}}本</p>
            </mu-col>
          </mu-row>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/javascript">
import header from "@/components/header/header";
import { getCategories } from "@/api/api";

export default {
  name: "category",
  data () {
    return {
      categorylist: {}
    };
  },
  components: {
    "m-head": header
  },
  created () {
    getCategories()
      .then(res => {
        this.categorylist = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    golist (list) {
      this.$store.commit("SetCategoryList", list);
      this.$router.push({
        name: "categorylist",
        params: { cate: list.name }
      });
    }
  }
};
</script>
<style type="text/css">
body a {
  margin: 0;
  color: #555;
}
.category-container {
  position: relative;
  height: 92vh;
  overflow: hidden;
  padding-bottom: 25px;
}
.category-view {
  height: 97.5%;
  overflow-y: scroll;
}
/* category item  */
.category-title {
  padding: 10px;
  border-bottom: 1px solid #ebeef5;
  font-size: 16px;
}
.category-list {
  font-size: 0;
}
.category-list-item {
  width: 50%;
  height: 70px;
  display: inline-block;
  vertical-align: middle;
  border-right: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
  overflow: hidden;
}
.imgbox {
  width: 100%;
  height: 70px;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
.imgbox img {
  margin: 0 0 0 20%;
  width: 60px;
  height: 70px;
}
.category-list-item > p {
  color: #555;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.category-list-number {
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
  vertical-align: middle;
}
</style>
