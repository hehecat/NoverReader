<template>

  <div>
    <mt-header id="header"
               fixed
               title="用户注册"></mt-header>
    <mu-container class="container">
      <mu-form ref="form"
               :model="validateForm"
               class="mu-demo-form">
        <mu-form-item label="用户名"
                      prop="username"
                      :rules="nicknameRules">
          <mu-text-field prop="username"
                         v-model="validateForm.username"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="昵称"
                      prop="nickname"
                      :rules="nicknameRules">
          <mu-text-field prop="nickname"
                         v-model="validateForm.nickname"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="密码"
                      prop="password"
                      :rules="passwordRules">
          <mu-text-field prop="password"
                         v-model="validateForm.password"
                         :action-icon="visibility ? 'visibility_off' : 'visibility'"
                         :action-click="() => (visibility = !visibility)"
                         :type="visibility ? 'text' : 'password'"></mu-text-field><br />
        </mu-form-item>
        <mu-form-item label="邮箱"
                      prop=" email">
          <mu-text-field prop="email"
                         v-model="validateForm.email"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="联系电话"
                      prop="phone">
          <mu-text-field prop="phone"
                         v-model="validateForm.phone"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="个人简介">
          <mu-text-field multi-line
                         :rows="3"
                         :rows-max="6"
                         type="texr"
                         v-model="validateForm.intro"></mu-text-field>
        </mu-form-item>

        <mu-form-item>
          <div class="button">
            <mu-button color="primary"
                       large
                       @click="submit">提交</mu-button>
            <mu-button large
                       @click="clear">重置</mu-button>
          </div>

        </mu-form-item>
      </mu-form>
    </mu-container>
  </div>
</template>

<script>

import { register } from '@/api/api'
import { MessageBox } from 'mint-ui';
export default {
  data () {
    return {
      visibility: false,
      visibility2: false,
      nicknameRules: [
        { validate: (val) => !!val, message: '必须填写用户名' },
        { validate: (val) => val.length >= 3, message: '用户名长度大于3' }
      ],
      passwordRules: [
        { validate: (val) => !!val, message: '必须填写密码' },
        { validate: (val) => val.length >= 5 && val.length <= 12, message: '密码长度大于5小于12' }
      ],
      validateForm: {
        nickname: '',
        intro: '',
        password: '',
        email: '',
        phone: '',

      },
    };
  },
  methods: {
    submit () {
      this.$refs.form.validate().then((result) => {
        let username = this.validateForm.username;
        let nickname = this.validateForm.nickname;
        let password = this.validateForm.password;
        let intro = this.validateForm.intro;
        let email = this.validateForm.email;
        let phone = this.validateForm.phone;

        if (result) {
          register(username, nickname, password, email, phone, intro).then(res => {
            if (res.data.errorCode != '0') {
              MessageBox('注册失败', res.data.msg);
            } else {
              MessageBox('注册成功', res.data.msg).then(() => {
                this.$router.push('login');
              });

            }
          });
        }
      });
    },
    clear () {
      this.$refs.form.clear();
      this.validateForm = {
        username: '',
        password: '',
      };
    },

  }
}

</script>

<style>
#header {
  background-color: rgb(245, 245, 245);
  color: rgb(111, 111, 111);
  height: 40px;
}
.button {
  margin: 0 auto;
}
.container {
  padding-top: 40px;
  margin-bottom: 40px;
}
</style>
