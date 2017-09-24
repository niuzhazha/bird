<template>
  <section 
    class="g-login"
    :style="{'height': pSize.height+'px', 'background-size': bgSize.width+'px auto'}">
    <el-form 
      :model="formInline" 
      :rules="ruleInline" 
      ref="formInline"
      class="login-ruleForm">
      <div class="tc"><img class="logo" src="../assets/images/birdwork-logo.png"></div>

      <el-form-item class="input-text-item" prop="mobile">
        <!-- <span class="user-icon icon-user-icon iconfont"></span> -->
        <span class="user-icon"><img src="../assets/images/user-grey.png"></span>
        <el-input class="input-text" v-model="formInline.mobile">
        </el-input>
      </el-form-item>

      <el-form-item class="input-text-item" prop="password">
        <span class="user-icon"><img src="../assets/images/lock-grey.png"></span>
        <el-input class="input-text" type="password" v-model="formInline.password" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item class="submit-item tc">
        <el-button type="primary" @click="submitForm('formInline')">登录</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import Qs from 'qs'
export default {
  name: 'login',
  data () {
    return {
      msg: 'Welcome to Your Login',
      pSize: {
        width: 0,
        height: 0
      },
      bgSize: {
        width: 0
      },
      formInline: {
        mobile: '',
        password: ''
      },
      ruleInline: {
        mobile: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.pSize.height = window.innerHeight
    this.pSize.width = window.innerWidth

    this.bgSize.width = window.innerWidth
    this.bgSize.width = this.bgSize.width <= 1920 ? 1920 : this.bgSize.width
    window.onresize = this.resize
  },
  methods: {
    resize () {
      this.pSize.height = window.innerHeight
      this.pSize.width = window.innerWidth

      this.bgSize.width = window.innerWidth
      this.bgSize.width = this.bgSize.width <= 1920 ? 1920 : this.bgSize.width
    },
    submitForm (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          // Make a request for a user with a given ID
          let _this = this
          // ?mobile=18642894278&password=123456
          let loginApi = 'http://testapi.center.birdwork.cn/api/login'
          // let loginApi = 'http://127.0.0.1:8888/api/login'
          // let loginApi = '/api/loginTest?mobile=' + _this.formInline.mobile + '&password=' + _this.formInline.password
          // this.$http.get(loginApi).then(function (response) {
          //   console.log(response)
          //   console.log(response.data.code)
          //   if (response.data.code === 0) {
          //     _this.$message.success('登录成功!')
          //     _this.$router.push('/lnav-1')
          //   } else {
          //     _this.$message.error(response.data.message)
          //   }
          // }).catch(function (error) {
          //   console.log(error)
          //   _this.$message.error(error.data.message)
          // })
          let data = Qs.stringify({'mobile': _this.formInline.mobile,
            'password': _this.formInline.password})
          this.$http.post(loginApi, data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
            console.log(response)
            if (response.status === 200) {
              if (response.data.code === 0) {
                // localStorage.setItem('json_data', JSON.stringify())
                _this.$message.success('登录成功!')
                _this.$router.push('/lnav-1')
              } else {
                _this.$message.error(response.data.message)
              }
            } else {
                // _this.$message.error('网络异常')
            }
          }).catch(function (error) {
            console.log(error)
            _this.$message.error(error.data.message)
          })
        } else {
          this.$message.error('表单验证失败!')
        }
      })
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.g-login {
  /*background-color: #E0E0E0;*/
  background: url('../assets/images/login-bg.png') top center no-repeat;
  background-size: 2800px 1900px;
}
.g-login .login-ruleForm {
  width: 420px;
  height: 295px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -145px 0 0 -210px;
  background-color: #FFF;
  padding: 28px 60px;
}
.g-login .login-ruleForm .logo {
  margin-bottom: 25px;
}
.g-login .login-ruleForm .el-form-item {
  width: 420px;
  height: 35px;
  margin-bottom: 30px;
}

.g-login .login-ruleForm .el-input__inner {
  padding-left: 30px;
  padding-right: 30px;
}
.g-login .login-ruleForm .submit-item {
  margin-top: 40px;
}
.g-login .login-ruleForm .submit-item button {
  width: 100%;
}
.g-login .user-icon {
  display: inline-block;
  width: 17px;
  height: 17px;
  font-size: 0;
  position: absolute;
  left: 8px;
  top: 8px;
  z-index: 1;
}
</style>
