<template>
  <div>
    <m-head :backbtn="true"
            :searchbtn="false">
    </m-head>

    <mu-container class="container">
      <div class='no-history'
           v-if="history.length===0"> 暂无阅读历史 </div>
      <listItem :Lists="history"></listItem>
      <div class="foot-btn">
        <mu-flex justify-content="center"
                 align-items="center">

          <mu-button full-width
                     color="primary"
                     @click="clearHistory()"> 清除阅读历史</mu-button>
        </mu-flex>
      </div>

    </mu-container>

  </div>
</template>

<script>
import header from '@/components/header/header'
import listItem from "@/components/listitem";
import { getHistory, clearHistory } from '@/api/api'
export default {
  components: {
    'm-head': header,
    listItem

  },
  inject: ['reload'],
  data () {
    return {
      history: []
    }

  },
  created () {
    this.getHistory();
  },
  methods: {
    getHistory () {
      getHistory().then(res => {
        let history = res.data;
        history.map((v, index, arr) => {
          for (let i in v.book) {
            arr[index][i] = v.book[i];
          }
          delete arr[index].book;
        })
        this.history = history;
      })
    },
    clearHistory () {
      clearHistory().then(() => {
        this.reload();

      })
    }
  }
}
</script>

<style scoped>
.gridlist-demo {
  width: 360px;
  height: 450px;
  overflow-y: auto;
}
.container {
  height: 100%;
  padding-bottom: 20px;
}
.foot-btn {
  position: fixed;
  bottom: 4px;
  width: 96%;
}
.no-history {
  height: 100px;
  text-align: center;
}
</style>
