<template>
  <el-form 
    class="modify2" 
    ref="form" 
    :model="server" 
    :rules="ruleInline"
    label-width="105px" 
    style="background:#fff;padding: 20px;">
    <div class="title-oprate pb14 bor-btm-ec">
      <span class="font14 col9">
      <router-link class="back-icon" :to="{ name: 'ServerManageModify', params: { type: 'goback', id: 0 } }">
        <img src="../assets/images/backIcon.png">
      </router-link>
      添加/修改服务商信息</span>
    </div>
    <div class="server-count font14 col9">系统账号与权限</div>
    <el-form-item label="管理员：" prop="openusername">
      <el-row>
        <el-col :span="10">
          <el-input v-model="server.openUser.name" placeholder="请输入管理员名字"></el-input>
        </el-col>
      </el-row>
    </el-form-item>
    <!-- <el-form-item label="联系方式：" prop="openusermobile">
      <el-row>
        <el-col :span="10">
          <el-input v-model="server.openUser.mobile" placeholder="请输入联系方式"></el-input>
        </el-col>
      </el-row>
    </el-form-item> -->
    <el-form-item label="系统密码：">
      <el-row>
        <el-col :span="10">
          <span>mima123</span>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item class="submit-item tc">
      <el-button class="next-btn" type="primary" @click="onSubmit('form')">确定</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import Qs from 'qs'
  export default {
    data () {
      return {
        server: {
          openUser: {
            name: '',
            mobile: ''
          }
        },
        privilege: {
          home: {
            selectAll: false
          },
          financial: {
            selectAll: false,
            gongzidan: {
              selectAll: false,
              daishenhe: false,
              daizhifu: false,
              yizhifu: false,
              weitongguo: false,
              quanbu: false,
              yhkzz: false
            },
            fapiao: {
              selectAll: false
            },
            qianbao: {
              selectAll: false
            }
          },
          user: {
            selectAll: false
          },
          job: {
            selectAll: false
          },
          kehu: {
            selectAll: false
          },
          manager: {
            selectAll: false
          }
        },
        ruleInline: {
          // openusername: [
          //   { required: true, message: '请输入管理员名字', trigger: 'blur' }
          // ]
          // openusermobile: [
          //   { required: true, message: '请输入联系方式', trigger: 'blur' },
          //   { type: 'number', message: '请输入正确的手机号', trigger: 'blur' }
          // ]
        }
      }
    },
    methods: {
      onSubmit (name) {
        // this.$refs[name].validate((valid) => {
          // if (valid) {
        let _this = this
        // console.log(valid)
        let addApi = 'http://192.168.0.107:8080/api/provider/addOpenUser'
        let data = Qs.stringify({
          'name': _this.server.openUser.name,
          'mobile': _this.server.openUser.mobile,
          'authIds': '2',
          'providerId': '2'
        })
        this.$http.post(addApi, data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
          console.log(response)
          if (response.data.code === 0) {
            // _this.$message.success('!')
            // _this.$router.push('/servermanagemodifytwo')
          } else {
            // _this.$message.error(response.data.message)
          }
        }).catch(function (error) {
          console.log(error)
          // _this.$message.error(error.data.message)
        })
          // } else {
          //   this.$message.error('表单验证失败!')
          // }
        // })
      }
    }
  }
</script>
<style>
  .font14 {font-size: 14px;}
  .col9 {color: #999;}
  .back-icon {margin-right: 10px;}
  .pb14 {padding-bottom: 14px;}
  .bor-btm-ec {border-bottom: 1px solid #ececec;}
  .server-count {padding: 20px 0;padding-bottom: 5px;}
  .el-input {/*width: 290px;border: 1px solid #dcdcdc;*/}
  .modify2 .el-input__inner {border: 1px solid #dcdcdc;/*width: 100px;*/}
  .modify2 .el-form-item__label {text-align: left;}
  /*.el-input, .el-input__inner {width: 80%;}*/
  .city .el-input__inner {width: 190px;}
  .city .el-input:first-child .el-input__inner {margin-right: 20px;}
  .city .el-input {width: 200px;}
  .modify2 .el-textarea__inner {width: 400px;resize: none;}
  .check-group {width: 64%;border-top: 1px dashed #ececec;border-bottom: 1px dashed #ececec;}
  .el-checkbox+.el-checkbox {margin-left: 0;}
  .next-btn {font-size: 18px;width: 320px;height: 50px;color: #fff;background-color: #4794fe;border-radius: 4px;border-top-style: none;border-right-style: none;border-bottom-style: none;border-left-style: none;}
</style>