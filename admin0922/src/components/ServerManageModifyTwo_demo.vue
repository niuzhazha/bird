<template>
  <el-form class="modify2" ref="form" :model="form" label-width="105px" style="background:#fff;padding: 20px;">
    <div class="title-oprate pb14 bor-btm-ec">
      <span class="font14 col9"><a class="back-icon" href="#"><img src="../assets/images/backIcon.png"></a>添加/修改服务商信息</span>
    </div>
    <div class="server-count font14 col9">费用信息</div>
    <el-form-item label="技术使用费：">
      <el-radio-group v-model="form.rateone">
        <el-radio class="radio" v-model="radio" label="1">1.2%</el-radio>
        <el-radio class="radio" v-model="radio" label="2">
          <el-input v-model="input" placeholder="请输入费率"></el-input>%
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="个人税率：">
      <el-radio-group v-model="form.ratetwo">
        <el-radio class="radio" v-model="radio" label="1">1.2%</el-radio>
        <el-radio class="radio" v-model="radio" label="2">
          <el-input v-model="input" placeholder="请输入费率"></el-input>%
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <div class="server-count font14 col9">系统账号与权限</div>
    <el-form-item label="管理员：">
      <el-input v-model="form.address"></el-input>
    </el-form-item>
    <el-form-item label="联系方式：">
      <el-input v-model="form.corporate"></el-input>
    </el-form-item>
    <el-form-item label="系统密码：">
      <span>mima123</span>
    </el-form-item>
    <!-- <el-form-item label="系统权限：">
      <el-checkbox-group v-model="checkList" class="">
        <el-checkbox style="display:block;" v-model="privilege.home.checked" label="首页"></el-checkbox>
        <el-checkbox class="check-group" v-model="privilege.financial.checked" disabled style="display:block;" label="">财务管理
          <el-checkbox-group v-model="privilege.financial.paybill.checked" style="text-indent:2em;">
            <el-checkbox style="display:block;" label="">工资单
              <el-checkbox-group>
                <el-checkbox v-model="privilege.financial.paybill.tocheck" label="待审核"></el-checkbox>
                <el-checkbox v-model="privilege.financial.paybill.topay" label="待支付"></el-checkbox>
                <el-checkbox v-model="privilege.financial.paybill.payed" label="已支付"></el-checkbox>
                <el-checkbox v-model="privilege.financial.paybill.payout" label="未通过"></el-checkbox>
                <el-checkbox v-model="privilege.financial.paybill.total" label="全部"></el-checkbox>
                <el-checkbox v-model="privilege.financial.paybill.cardpay.checked" label="银行卡转账"></el-checkbox>
              </el-checkbox-group>
            </el-checkbox>
            <el-checkbox v-model="privilege.financial.bills" style="display:block;" label="发票管理"></el-checkbox>
            <el-checkbox v-model="privilege.financial.money" style="display:block;" label="钱包管理"></el-checkbox>
          </el-checkbox-group>
        </el-checkbox>
        <el-checkbox v-model="privilege.user.checked" style="display:block;" label="用户管理"></el-checkbox>
        <el-checkbox v-model="privilege.job.checked" style="display:block;" label="职位管理"></el-checkbox>
        <el-checkbox v-model="privilege.costomer.checked" style="display:block;" label="客户管理"></el-checkbox>
        <el-checkbox v-model="privilege.manager.checked" style="display:block;" label="领队管理"></el-checkbox>
      </el-checkbox-group>
    </el-form-item> -->
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
      <button class="next-btn" type="primary" @click="onSubmit">确定</button>
    </el-form-item>
  </el-form>
</template>
<script>
  export default {
    data () {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          rateone: '',
          ratetwo: ''
        },
        quanxian: {
          
        }
      }
    },
    methods: {
      onSubmit () {
        console.log('submit!')
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
  .modify2 .el-input__inner {border: 1px solid #dcdcdc;width: 100px;}
  .modify2 .el-form-item__label {text-align: left;}
  .modify2 .el-button {
    font-size: 12px;
    height: 24px;
    color: #4794fe!important;
    border: 1px solid #4794fe!important;
    width: 128px;
    display: inline-block;
    line-height: 24px; 
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    color: #1f2d3d;
    margin: 0;
    padding: 0!important;
    border-radius: 0;
  }
  .el-input, .el-input__inner {width: 80%;}
  .city .el-input__inner {width: 190px;}
  .city .el-input:first-child .el-input__inner {margin-right: 20px;}
  .city .el-input {width: 200px;}
  .modify2 .el-textarea__inner {width: 400px;resize: none;}
  .next-btn {margin-left: calc( 50% - 160px );font-size: 18px;width: 320px;height: 50px;color: #fff;background-color: #4794fe;border-radius: 4px;border-top-style: none;border-right-style: none;border-bottom-style: none;border-left-style: none;}
  .check-group {width: 64%;border-top: 1px dashed #ececec;border-bottom: 1px dashed #ececec;}
  .el-checkbox+.el-checkbox {margin-left: 0;}
</style>