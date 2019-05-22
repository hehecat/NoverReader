<template>
  <div>
    <mu-appbar style="width: 100%;height:40px"
               z-depth="0">
      <mu-button icon
                 slot="left"
                 @click="back"
                 v-show="backbtn">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
      {{title}}
      <mu-button icon
                 v-show="searchbtn"
                 slot="right"
                 :to="{ name: 'search'}">
        <mu-icon value="search"></mu-icon>
      </mu-button>
    </mu-appbar>
  </div>
</template>

<script>
export default {

  watch: {
    '$route': function () {
      this.keyword = '';
    }
  },

  methods: {
    back () {
      if (this.go == -1) {
        this.$router.go(-1);
      } else {
        this.$router.push({ name: this.go })
      }

    },

  },
  props: {
    backbtn: {
      type: Boolean,
      default: false
    },

    searchbtn: {
      type: Boolean,
      default: true
    },
    menubtn: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    center: {
      type: Boolean,
      default: false
    },
    ifsearch: {
      type: Boolean,
      default: false
    },
    go: {
      default: -1
    }
  }
}
</script>
<style type="text/css">
</style>

