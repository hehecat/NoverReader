<template>
  <div>
    <mu-bottom-nav :value.sync="shift">
      <mu-bottom-nav-item to="/"
                          title="书架"
                          value="书架"
                          icon="inbox"></mu-bottom-nav-item>
      <mu-bottom-nav-item to="/booksTop"
                          title="推荐"
                          value="推荐"
                          icon="restore"></mu-bottom-nav-item>
      <mu-bottom-nav-item to="/category"
                          title="分类"
                          value="分类"
                          icon="sort"></mu-bottom-nav-item>
      <mu-bottom-nav-item to="/me"
                          title="我的"
                          value="我的"
                          icon="person_outline"></mu-bottom-nav-item>
    </mu-bottom-nav>
  </div>
</template>

<script type="text/javascript">
export default {
  data () {
    return {
      shift: "书架"
    };
  },
};
</script>
<style type="text/scss">
</style>
