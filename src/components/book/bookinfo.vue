<template>
  <transition name="bookinfo"
              mode="in-out">
    <div class="book-info-main">
      <m-head :backbtn="true"></m-head>
      <div class="book-info-container"
           id="book-info-view">
        <info-content></info-content>
      </div>
    </div>
  </transition>
</template>
<script type="text/javascript">
import header from "@/components/header/header";
import infocontent from "./info-content";
export default {
  data () {
    return {
      backstep: -1
    };
  },
  beforeRouteEnter (to, from, next) {
    if (from.name == "home") {
      next(vm => {
        vm.backstep = "home";
      });
    } else {
      next();
    }
  },
  beforeRouteUpdate (to, from, next) {
    // document.getElementById("book-info-view").scrollTop = 0;
    this.$router.state.isShowFoot = true;
    next();
  },
  components: {
    "m-head": header,
    "info-content": infocontent
  }
};
</script>
<style type="text/css">
.bookinfo-enter-active,
.bookinfo-leave-active {
  transition-duration: 0.3s;
}
.bookinfo-leave-to,
.bookinfo-enter {
  transform: translate3d(100vw, 0px, 0px);
}
.book-info-main {
  height: 92vh;
  width: 100%;
  overflow: hidden;
  padding-bottom: 25px;
}
.book-info-container {
  height: 97.5%;
  overflow-y: scroll;
}
</style>
