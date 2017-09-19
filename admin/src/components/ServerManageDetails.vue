<template>
  <el-form class="details" ref="form" :model="form" label-width="105px" style="background:#fff;padding: 20px;">
    <div class="title-oprate pb14 bor-btm-ec">
      <span class="font14 col9"><a class="back-icon" href="#"><img src="../assets/images/backIcon.png"></a>服务商信息</span>
      <router-link class="back-icon" :to="{ name: 'ServerManageModify', params: { type: 'edit', id: 0 } }">
        <el-button class="fr" style="color:#fff;font-size:14px;" type="primary" size="mini">修改</el-button>
      </router-link>
    </div>
    <el-form-item label="公司全称：">
      <span>合肥亿佰人力资源有限公司</span>
    </el-form-item>
    <el-form-item label="公司简称：">
      <span>合肥亿佰</span>
    </el-form-item>
    <el-form-item label="公司logo：">
      <span><img src="../assets/images/details-logo.png"></span>
    </el-form-item>
    <el-form-item label="公司规模：">
      <span>40-99人</span>
    </el-form-item>
    <el-form-item class="city" label="所在城市：">
      <span>合肥</span>
    </el-form-item>
    <el-form-item label="公司地址：">
      <span>合肥</span>
    </el-form-item>
    <el-form-item label="公司法人：">
      <span>合肥合肥</span>
    </el-form-item>
    <el-form-item label="公司简介：">
      <span>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
    </el-form-item>
    <el-form-item label="营业执照：">
      <span><img src="../assets/images/lisence.png"></span>
    </el-form-item>
    <el-form-item label="合同附件：">
      <a class="download" href="#">点击下载</a>
    </el-form-item>
    <div class="rate">
      <div class="server-count font14 col9">费用信息</div>
      <el-form-item label="技术使用费：">
        <span>合肥合肥</span>
      </el-form-item>
      <el-form-item label="个人税率：">
        <span>合肥合肥</span>
      </el-form-item>
    </div>
    <div class="root">
      <div class="server-count font14 col9">系统账号与权限</div>
      <el-form-item label="管理员：">
        <span>成强</span>
      </el-form-item>
      <el-form-item label="联系方式：">
        <span>18712344321</span>
      </el-form-item>
      <el-form-item label="系统权限：">
        <span>客户管理、领队管理、用户管理、权限管理</span>
      </el-form-item>
    </div>
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
          resource: '',
          desc: ''
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
  .server-count {padding: 20px 0;}
  .el-input {/*width: 290px;border: 1px solid #dcdcdc;*/}
  .modify .el-input__inner {border: 1px solid #dcdcdc;width: 400px;}
  .modify .el-form-item__label {text-align: left;}
  .modify .el-button {
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
  .city .el-input__inner {width: 190px;}
  .city .el-input:first-child .el-input__inner {margin-right: 20px;}
  .city .el-input {width: 200px;}
  .modify .el-textarea__inner {width: 400px;resize: none;}
  .next-btn {margin-left: calc( 50% - 160px );font-size: 18px;width: 320px;height: 50px;color: #fff;background-color: #4794fe;border-radius: 4px;border-top-style: none;border-right-style: none;border-bottom-style: none;border-left-style: none;}
  .rate {border-top: 1px solid #ececec;border-bottom: 1px solid #ececec;}
  .details .el-form-item {margin-bottom: 0;}
  .el-form-item__label{text-align: left!important;}
</style>