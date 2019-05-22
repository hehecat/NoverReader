<template>
  <div class="category-book-view"
       id="list-view">
    <ul class="category-book">
      <li class="category-book-item"
          v-for="book in Lists"
          :key="book.id">
        <router-link :to="{'name':'bookinfo',params:{bookname:book.novel_name}}"
                     class="fix">
          <div class="category-book-cover">
            <img v-lazy="book.novel_cover ||'image/nocover.jpg' "
                 :title="book.title">
          </div>
          <div class="category-book-msg">
            <h3 class="category-book-title">{{book.novel_name}}</h3>
            <p class="category-list-author">
              {{book.novel_author}}
              <span class="category-col-line">|</span>
              {{book.novel_family}}
            </p>
            <p>{{book.novel_introduction}}</p>
            <p class="category-book-star">
              {{book.novel_store}}人在追
              <span class="category-col-line">|</span>
              {{book.novel_recommend}}推荐
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript">
export default {
  data () {
    return {};
  },
  props: ["Lists"]
};
</script>

<style type="text/css">
.category-book-view {
  overflow-y: scroll;
  height: 100%;
}
.category-book-item > a {
  width: 100%;
  padding: 10px 14px 0;
  color: #555;
  margin-bottom: 10px;
}
.category-book-cover {
  width: 86px;
  height: 113px;
  background-color: #555;
  float: left;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 5px 10px #555;
}
.category-book-cover > img {
  width: inherit;
  height: inherit;
}
.category-book-msg {
  margin-left: 100px;
  height: 118px;
  line-height: 28px;
  border-bottom: 1px solid #ddd;
}
.category-book-msg > p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.4);
  font-size: 14px;
}
.category-book-title {
  font-size: 16px;
  font-weight: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.category-list-author {
  font-size: 12px;
}
.category-col-line {
  margin: 0 5px;
  font-size: 14px;
}
.category-book-star {
  color: rgba(0, 0, 0, 0.6);
}
</style>
