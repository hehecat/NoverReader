<template>
  <div>
    <m-head :backbtn='true'></m-head>
    <mu-tabs :value.sync="active"
             inverse
             color="secondary"
             full-width
             text-color="rgba(0, 0, 0, .54)"
             center>
      <mu-tab>关注</mu-tab>
      <mu-tab>粉丝</mu-tab>
    </mu-tabs>
    <div class="demo-text"
         v-if="active === 1">
      <mu-row>
        <mu-col>
          <mu-list v-for="(user) in focuses"
                   :key="user.id">
            <router-link tag="div"
                         :to="{name:'user',params:{userId:user.id}}">
              <mu-list-item avatar>
                <mu-list-item-action avatar>
                  <mu-avatar>
                    <img :src="imgurl+user.avatar">
                  </mu-avatar>
                </mu-list-item-action>
                <mu-list-item-content>
                  <mu-list-item-title>{{user.nickname}}</mu-list-item-title>
                </mu-list-item-content>
                <mu-list-item-action>
                  <div class="lev">
                    <img :src="'level/lv'+user.lev.level+'.png'"
                         alt="">
                  </div>
                  lv.{{user.lev.levelName}}
                </mu-list-item-action>
              </mu-list-item>
            </router-link>
          </mu-list>
          <mu-divider></mu-divider>
        </mu-col>
      </mu-row>
    </div>
    <div class="demo-text"
         v-if="active === 0">
      <mu-row>
        <mu-col>
          <mu-list v-for="(user) in fans"
                   :key="user.id">
            <router-link tag="div"
                         :to="{name:'user',params:{userId:user.id}}">
              <mu-list-item avatar>
                <mu-list-item-action avatar>
                  <mu-avatar>
                    <img :src="imgurl+user.avatar">
                  </mu-avatar>
                </mu-list-item-action>
                <mu-list-item-content>
                  <mu-list-item-title>{{user.nickname}}</mu-list-item-title>
                </mu-list-item-content>
                <mu-list-item-action>
                  <div class="lev">
                    <img :src="'level/lv'+user.lev.level+'.png'"
                         alt="">
                  </div>
                  lv.{{user.lev.levelName}}
                </mu-list-item-action>
              </mu-list-item>
            </router-link>
          </mu-list>
          <mu-divider></mu-divider>
        </mu-col>
      </mu-row>
    </div>
  </div>

</template>

<script>
import header from '@/components/header/header'
import { getFans, getFocus } from '@/api/api'

export default {
  data () {
    return {
      active: 1,
      userId: this.$route.params.userId,
      focuses: [],
      fans: [],
      imgurl: this.GLOBAL.IMG_URL
    }
  },
  created () {
    this.getFans();
    this.getFocus();
  },
  methods: {
    getFans () {
      getFans(this.userId).then(res => {
        this.fans = res.data;
      })
    },
    getFocus () {
      getFocus(this.userId).then(res => {
        this.focuses = res.data;
      })
    },
  },
  components: {
    "m-head": header,
  },
}
</script>

<style >
.lev img {
  width: 20px;
  height: 20px;
}
</style>
