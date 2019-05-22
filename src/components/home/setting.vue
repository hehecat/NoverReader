<template>
  <div>
    <mu-header :searchbtn='false'
               :backbtn='true'></mu-header>
    <mu-container>
      <mu-form ref="form"
               :model="validateForm"
               class="mu-demo-form">
        <mu-form-item label="昵称"
                      prop="nickname"
                      :rules="nicknameRules">
          <mu-text-field prop="nickname"
                         v-model="validateForm.nickname"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="个人简介">
          <mu-text-field multi-line
                         :rows="3"
                         :rows-max="6"
                         type="texr"
                         v-model="validateForm.intro"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="旧密码"
                      prop="oldPassword"
                      :rules="passwordRules">
          <mu-text-field prop="oldPassword"
                         v-model="validateForm.oldPassword"
                         :action-icon="visibility ? 'visibility_off' : 'visibility'"
                         :action-click="() => (visibility = !visibility)"
                         :type="visibility ? 'text' : 'password'"></mu-text-field><br />

        </mu-form-item>

        <mu-form-item label="新密码"
                      prop="newPassword"
                      :rules="passwordRules">
          <mu-text-field type="password"
                         v-model="validateForm.newPassword"
                         prop="newPasseword"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="确认密码"
                      prop="rePassword"
                      :rules="rePasswordRules">
          <mu-text-field type="password"
                         v-model="validateForm.rePassword"
                         prop="rePasseword"></mu-text-field>
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
import header from '@/components/header/header'
import { getUserInfo, userSetting } from '@/api/api'
import util from '@/api/util'
import { MessageBox } from 'mint-ui'

export default {
  components: {
    'mu-header': header,

  },
  data () {
    return {
      visibility: false,
      nicknameRules: [
        { validate: (val) => !!val, message: '必须填写用户名' },
        { validate: (val) => val.length >= 3, message: '用户名长度大于3' }
      ],
      passwordRules: [
        { validate: (val) => !!val, message: '必须填写密码' },
        { validate: (val) => val.length >= 5 && val.length <= 12, message: '密码长度大于5小于12' }
      ],
      rePasswordRules: [
        { validate: (val) => !!val, message: '必须填写密码' },
        { validate: (val) => val == this.validateForm.newPassword, message: '两次密码不同!' }
      ],
      validateForm: {
        nickname: '',
        intro: '',
        newPassword: '',
        oldPassword: ''

      },
      userInfo: '',
    }
  },
  created () {
    this.getUserInfo();
  },
  methods: {
    submit () {
      this.$refs.form.validate().then((result) => {
        let nickname = this.validateForm.nickname;
        let oldpass = this.validateForm.oldPassword;
        let newpass = this.validateForm.newPassword;
        let intro = this.validateForm.intro;

        if (result) {
          userSetting(nickname, intro, oldpass, newpass).then(res => {
            if (res.data.errorCode == '0') {
              MessageBox.alert('修改成功!');
            }
          })
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
    getUserInfo () {
      let user = util.getLocalData('user');
      getUserInfo(user.uid).then(res => {
        this.userInfo = res.data;
        this.validateForm.nickname = this.userInfo.nickname;
        this.validateForm.intro = this.userInfo.intro;
      })
    }
  }
};
</script>


<style>
.mu-demo-form {
  width: 100%;
  max-width: 460px;
}
.button {
  margin: 0 auto;
}
</style>