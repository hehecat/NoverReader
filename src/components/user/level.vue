<template>
  <div>
    <mu-header :backbtn='true'
               :searchbtn='false'
               class="head"></mu-header>
    <mu-container class="container">
      <mu-paper class="demo-paper"
                :z-depth="3">

        <mu-flex class="demo-linear-progress">
          <mu-linear-progress v-if="userinfo.lev"
                              mode="determinate"
                              :value="userinfo.exp/levelList[userinfo.lev.level].levelExp*100"></mu-linear-progress>
        </mu-flex>
      </mu-paper>
      <mu-paper :z-depth="1"
                class="demo-list-wrap">
        <mu-list v-if="userinfo.lev">
          <mu-list-item avatar
                        button
                        :ripple="false">
            <mu-list-item-action>
              <mu-button icon>
                <mu-icon size="36"
                         color='blue'
                         value="start"></mu-icon>
              </mu-button>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>当前等级</mu-list-item-title>
              <mu-list-item-sub-title>{{userinfo.lev.level}}级 {{userinfo.lev.levelName}}</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item avatar
                        button
                        :ripple="false">
            <mu-list-item-action>
              <mu-button icon>
                <mu-icon size="36"
                         color='red'
                         value="flash_on"></mu-icon>
              </mu-button>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>升级进度</mu-list-item-title>
              <mu-list-item-sub-title v-if='userinfo.exp'>{{userinfo.exp}}/{{levelList[userinfo.lev.level].levelExp}}</mu-list-item-sub-title>
            </mu-list-item-content>

          </mu-list-item>
          <mu-list-item avatar
                        button
                        :ripple="false">
            <mu-list-item-action>
              <mu-button icon>
                <mu-icon size="36"
                         color='green'
                         value="show_chart"></mu-icon>
              </mu-button>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title> 等级排名</mu-list-item-title>
              <mu-list-item-sub-title>超越{{userinfo.lev.rank}}%的读龙用户</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
        <mu-list v-for="(level,index) in levelList"
                 :key="index">
          <mu-list-item avatar
                        button
                        :ripple="false">
            <mu-list-item-action>
              <mu-avatar>
                <img :src="'level/lv'+level.level+'.png'">
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-title>{{level.levelName}}</mu-list-item-title>
            <mu-list-item-sub-title>经验上限: {{level.levelExp}}</mu-list-item-sub-title>
          </mu-list-item>
        </mu-list>
      </mu-paper>
    </mu-container>
  </div>

</template>

<script>
import header from '@/components/header/header'
import { getUserInfo, getLevelList } from '@/api/api'
export default {
  components: {
    'mu-header': header
  },
  created () {
    this.getLevelList();
    this.getUserInfo();
  },
  data () {
    return {
      levelList: [],
      userinfo: {}

    }
  },
  methods: {
    getLevelList () {
      getLevelList().then(res => {
        let list = res.data;
        list.sort((a, b) => {
          return a.level - b.level;
        })
        this.levelList = list;
      })
    },
    getUserInfo () {
      let userId = this.$route.params.userId;
      getUserInfo(userId).then(res => {
        this.userinfo = res.data;
      })
    }
  }

}
</script>

<style scoped>
.container {
  padding-top: 40px;
  margin-bottom: 50px;
}
.mu-avatar {
  background-color: white;
}
.head {
  position: fixed;
  top: 0;
  margin-bottom: 40px;
  width: 100%;
  z-index: 9999;
}
</style>
