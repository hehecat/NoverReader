<template>
  <div>
    <div class="header">
      <div class="background">
        <div class="avatar">
          <input @change="uploadFile($event)"
                 type="file"
                 id='image'
                 accept="image/*"
                 capture='camera'>
          <img :src="this.GLOBAL.IMG_URL + this.user.avatar">
        </div>
        <div class="nickname">
          {{user.name}}
        </div>
        <div class="level">
          lev.{{user.lev.levelName}}
          <img id="level_img"
               :src="'level/lv'+user.lev.level+'.png'"
               alt="">
        </div>
      </div>
      <div @click="toSetting()"
           class="setting">
        <img src="image/setting.png"
             alt="">
      </div>
      <div class="clock">
        <img :src='isClock'
             @click="userClock()"
             alt="">
      </div>
      <div class="cells">
        <router-link tag="div"
                     :to="{name:'userFocus',params:{userId:this.user.uid}}">
          <mt-cell title="关注/粉丝"
                   is-link></mt-cell>
        </router-link>
        <router-link tag="div"
                     :to="{name:'userComment',params:{userId:this.user.uid}}">
          <mt-cell title="我的书评"
                   is-link></mt-cell>
        </router-link>

        <router-link tag="div"
                     :to="{name:'level',params:{userId:this.user.uid}}">
          <mt-cell title="我的等级"
                   is-link></mt-cell>
        </router-link>
        <router-link tag="div"
                     :to="{name:'history',params:{userId:this.user.uid}}">
          <mt-cell title="阅读历史"
                   is-link></mt-cell>
        </router-link>

        <mu-divider></mu-divider>
        <div @click="logout()">
          <mt-cell class="logout"
                   title="退出登录"></mt-cell>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfo, uploadImg, clock, isUserClocked } from '@/api/api'
import { MessageBox } from 'mint-ui'
import util from '@/api/util'

export default {
  data () {
    return {
      user: util.getLocalData('user'),
      'isClock': '',
    }
  },
  created () {
    this.judgeClock();
  },
  inject: ['reload'],
  methods: {
    toSetting () {
      this.$router.push({ name: 'setting' })
    },
    userClock () {
      clock().then(res => {
        if (res.data.errorCode == 20005) {
          MessageBox.alert('今日已打卡！');
          this.isClock = 'image/签到y.png'
        } else if (res.data.errorCode == 0) {
          MessageBox.alert('打卡成功！');
          this.isClock = 'image/签到y.png'
        }
      })
    },
    judgeClock () {
      isUserClocked(this.user.uid).then(res => {
        if (res.data.errorCode == 20005) {
          this.isClock = 'image/签到y.png'
        } else if (res.data.errorCode == 0) {
          this.isClock = 'image/签到n.png'
        }
      })
    },
    logout () {
      util.setLocalData('JWT_TOKEN', '');
      util.setLocalData('myfollowbook', '');
      util.setLocalData('user', '');
      this.$router.replace({ name: 'login' });
    },
    uploadFile (event) {
      let file = event.target.files[0]; //获取input的图片file值
      let param = new FormData(); // 
      param.append('image', file);//对应后台接收图片名  
      uploadImg(param).then(res => {
        if (res.data.avatar) {
          MessageBox.alert('上传成功!')
          let user = util.getLocalData('user');
          user.avatar = res.data.avatar;
          util.setLocalData('user', user);
          // this.user.avatar = res.data.avatar;
          this.reload();

        }
      })
    },
    getUserInfo () {
      getUserInfo(this.user.uid).then(res => {
        this.user = res.data;
      })
    }

  }
};
</script>

<style >
.cells {
  margin: 5px 0;
}

.background {
  width: 100%;
  height: 120px;
  background: url("~@/assets/userbg.jpg") no-repeat left top;
  background-size: 100% 100%;
}
.avatar img {
  position: relative;
  border-radius: 35px;
  top: 15px;
  left: 10px;
  height: 70px;
  width: 70px;
}
.avatar {
  background: #0000;
}
.setting {
  position: absolute;
  top: 10px;
  right: 20px;
}
.clock {
  position: absolute;
  top: 80px;
  right: 20px;
}
.nickname {
  position: absolute;
  top: 40px;
  left: 100px;
  font-size: 20px;
}
.level {
  position: absolute;
  top: 70px;
  left: 200px;
}
#level_img {
  position: absolute;
  top: -20px;
  left: 50px;
  width: 45px;
  height: 45px;
}
.logout {
  margin-top: 20px;
}
#image {
  opacity: 0;
  position: absolute;
  width: 100px;
  height: 100px;
  z-index: 9999;
}
</style>
