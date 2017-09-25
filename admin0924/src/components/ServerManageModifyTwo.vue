<template>
  <el-form 
    class="modify2" 
    ref="form" 
    :model="formInline" 
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
    <el-form-item label="管理员：" prop="openUser.name">
      <el-row>
        <el-col :span="10">
          <el-input v-model="formInline.openUser.name" placeholder="请输入管理员名字"></el-input>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="联系方式：" prop="openUser.mobile">
      <el-row>
        <el-col :span="10">
          <el-input v-model="formInline.openUser.mobile" placeholder="请输入联系方式"></el-input>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="系统密码：">
      <el-row>
        <el-col :span="10">
          <span>mima123</span>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item label="系统权限：" prop="oldpass">
      <el-row>
        <el-col :span="24">
          <el-checkbox v-model="privilege.home.selectAll">首页</el-checkbox>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-checkbox v-model="privilege.financial.selectAll"
            @change="toggleCheck('financial', privilege.financial.selectAll)">财务管理</el-checkbox>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" :offset="1">
          <el-checkbox v-model="privilege.financial.gongzidan.selectAll"
            @change="toggleCheck('financial.gongzidan', privilege.financial.gongzidan.selectAll)">工资单</el-checkbox>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2" :offset="2">
          <el-checkbox v-model="privilege.financial.gongzidan.daishenhe"
            @change="toggleCheck('financial.gongzidan.daishenhe', privilege.financial.gongzidan.daishenhe)">待审核</el-checkbox>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-checkbox v-model="privilege.financial.gongzidan.daizhifu"
            @change="toggleCheck('financial.gongzidan.daizhifu', privilege.financial.gongzidan.daizhifu)">待支付</el-checkbox>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-checkbox v-model="privilege.financial.gongzidan.yizhifu"
            @change="toggleCheck('financial.gongzidan.yizhifu', privilege.financial.gongzidan.yizhifu)">已支付</el-checkbox>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-checkbox v-model="privilege.financial.gongzidan.weitongguo"
            @change="toggleCheck('financial.gongzidan.weitongguo', privilege.financial.gongzidan.weitongguo)">未通过</el-checkbox>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-checkbox v-model="privilege.financial.gongzidan.quanbu"
            @change="toggleCheck('financial.gongzidan.quanbu', privilege.financial.gongzidan.quanbu)">全部</el-checkbox>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-checkbox v-model="privilege.financial.gongzidan.yhkzz"
            @change="toggleCheck('financial.gongzidan.yhkzz', privilege.financial.gongzidan.yhkzz)">银行卡转账</el-checkbox>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24" :offset="1">
          <el-checkbox v-model="privilege.financial.fapiao.selectAll"
            @change="toggleCheck('financial.fapiao', privilege.financial.fapiao.selectAll)">发票管理</el-checkbox>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24" :offset="1">
          <el-checkbox v-model="privilege.financial.qianbao.selectAll"
            @change="toggleCheck('financial.qianbao', privilege.financial.qianbao.selectAll)">钱包管理</el-checkbox>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-checkbox v-model="privilege.user.selectAll"
            @change="toggleCheck('user', privilege.user.selectAll)">用户管理</el-checkbox>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-checkbox v-model="privilege.job.selectAll"
            @change="toggleCheck('job', privilege.job.selectAll)">职位管理</el-checkbox>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-checkbox v-model="privilege.kehu.selectAll"
            @change="toggleCheck('kehu', privilege.kehu.selectAll)">客户管理</el-checkbox>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-checkbox v-model="privilege.manager.selectAll"
            @change="toggleCheck('manager', privilege.manager.selectAll)">领队管理</el-checkbox>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item class="submit-item tc">
      <el-button class="next-btn" type="primary" @click="onSubmit('form')">确定</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  export default {
    data () {
      return {
        formInline: {
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
          openUser: [
            { required: true, message: '请输入管理员' }
          ],
          mobile: [
            { required: true, message: '请输入联系方式' }
          ]
        }
      }
    },
    mouted () {
      this.formInline = JSON.parse(localStorage.getItem('serverString'))
      console.log(this.formInline)
    },
    methods: {
      onSubmit (name) {
        // this.$refs[name].validate((valid) => {
          // if (valid) {
        let _this = this
        // console.log(valid)
        let addApi = '/api/provider/addOpenUser'
        this.$http({
          url: addApi,
          params: {
            'name': _this.formInline.openUser.name,
            'mobile': '17732843328',
            'authIds': '1',
            'providerId': '37'
          },
          method: 'post'
        }).then(function (response) {
          // console.log(response)
          if (response.data.code === 0) {
            _this.$message.success('新增成功!')
            _this.$router.push('/lnav-1')
          } else {
            _this.$message.error(response.data.message)
          }
        }).catch(function (error) {
          console.log(error)
          _this.$message.error(error.data.message)
        })
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