<template>
  <section class="modify-password">
  	<div class="mian-content">
  		<div class="title-oprate">
  			<span>修改密码</span>
  		</div>
      <el-row>
        <el-col :span="16" :offset="1">
          <el-form label-position="right" label-width="120px" 
            :model="formLabelAlign" :rules="ruleInline" ref="formLabelAlign">
            <el-form-item label="旧密码：" prop="oldpass">
              <el-row>
                <el-col :span="10">
                  <el-input type="password"
                    v-model="formLabelAlign.oldpass"
                    placeholder="请输入旧密码"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="新密码：" prop="newpass">
              <el-row>
                <el-col :span="10">
                  <el-input type="password" 
                    v-model="formLabelAlign.newpass"
                    placeholder="请输入新密码"></el-input>
                </el-col>
                <el-col :span="10" class="pl20">
                  <span class="tips">密码为6-25位数字和字母的组合</span>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="确认新密码：" prop="renewpass">
              <el-row>
                <el-col :span="10">
                  <el-input type="password" 
                    v-model="formLabelAlign.renewpass"
                    placeholder="请确认新密码"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-row>
                <el-col :span="10" :offset="10">
                  <el-button class="ok-btn" type="primary" @click="submitForm('formLabelAlign')">提交</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
  	</div>
  </section>
</template>
<script>
  export default {
    data () {
      let validatePass = (rule, value, callback) => {
        // 非全数字，非全字母
        const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,25}$/
        if (value === '') {
          callback(new Error('请输入新密码'))
        } else if (!reg.test(value)) {
          callback(new Error('密码为6-25位数字和字母的组合!'))
        } else {
          callback()
        }
      }
      let validateRePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.formLabelAlign.newpass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        formLabelAlign: {
          oldpass: '',
          newpass: '',
          renewpass: ''
        },
        ruleInline: {
          oldpass: [
            { required: true, message: '请填写旧密码', trigger: 'blur' },
            { type: 'string', min: 6, message: '前端君觉得您的密码长度有问题哟', trigger: 'blur' }
          ],
          newpass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          renewpass: [
            { validator: validateRePass, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        let _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
            _this.$router.push('/loginpage')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.modify-password {

	}
  .mian-content {
    background-color: #FFF;
    min-height: 460px;
  }
  .title-oprate {
    margin: 0 20px 40px;
    border-bottom: 1px solid #ececec;
    padding: 10px 0;
    font-size: 14px;
    font-weight: bolder;
    color: #999;
  }
  .tips {
    font-size: 12px;
    color: #999; 
  }
  .ok-btn {
    width: 100%;
    margin-top: 30px;
  }
  .pl20 {padding-left: 20px;}
</style>
