<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive&&isRouterAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive&&isRouterAlive"></router-view>
    <m-footer id="foot"
              v-show="$route.meta.isShowFoot"></m-footer>
  </div>
</template>

<script>
import footer from "@/components/footer/footer";

export default {
  name: "app",
  components: {
    "m-footer": footer
  },
  data () {
    return {
      isRouterAlive: true
    };
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>

<style>
#foot {
  width: 100%;
  position: fixed;
  bottom: 0;
}
</style>
