<template>
  <div>
    <div id="logo">
      <img id="logoImg"
           src="image/logo.jpeg">
    </div>
    <div id="input">
      <mt-field placeholder=" username"
                v-model="username"></mt-field>
      <mt-field placeholder=" password"
                type='password'
                v-model="password"></mt-field>
    </div>
    <div id="button">
      <mt-button id="login"
                 type="primary"
                 @click="login()"
                 size='large'>登陆</mt-button>
      <mt-button id="register"
                 type="primary"
                 @click="toRegister()"
                 size='large'>注册</mt-button>
    </div>

  </div>
</template>

<script>
import { login, getUserCollections } from '@/api/api'
import util from '@/api/util'
import { MessageBox } from 'mint-ui'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    toRegister () {
      this.$router.push('register');
    },
    login () {
      if (this.username && this.password) {
        login(this.username, this.password).then(res => {
          if (!res.data.errorCode) {
            util.setLocalData('JWT_TOKEN', res.data.token);
            util.setLocalData('user', res.data);
            this.getUserCollect()
            this.$store.commit("SetToken", res.data.token);
            this.$store.commit("SetUser", res.data);
            this.$router.push('me');
          } else {
            MessageBox('Notice', res.data.msg);
          }
        });
      } else {
        MessageBox('Notice', '用户名及密码不能为空');
      }
    },
    getUserCollect () {
      getUserCollections(this.userId).then(res => {
        let collects = util.getLocalData('myfollowbook');
        if (!collects) {
          util.setLocalData('myfollowbook', res.data);
        }
      })
    },
  }
}
</script>

<style>
#logoImg {
  width: 100px;
  margin: 20px auto;
}
#button {
  margin: 0 5px;
}
#login {
  margin: 30px 0 10px 0;
}
</style>
