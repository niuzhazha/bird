<template>
  <el-form class="details" ref="form" :model="form" label-width="105px" style="background:#fff;padding: 20px;">
    <div class="title-oprate pb14 bor-btm-ec">
      <span class="font14 col9"><router-link :to="{ path: '/lnav-1' }" class="back-icon"><img src="../assets/images/backIcon.png"></router-link>服务商信息</span>
      <router-link class="back-icon" :to="{ name: 'ServerManageModify', params: { type: 'edit', id: routerId } }">
        <el-button class="fr" style="color:#fff;font-size:14px;" type="primary" size="mini">修改</el-button>
      </router-link>
    </div>
    <el-form-item label="公司全称：">
      {{ form.companyName }}
    </el-form-item>
    <el-form-item label="公司简称：">
      {{ form.companyNameShort }}
    </el-form-item>
    <el-form-item label="公司logo：">
      {{ form.logo }}
    </el-form-item>
    <el-form-item label="公司规模：">
      {{ form.scale }}
    </el-form-item>
    <el-form-item class="city" label="所在城市：">
      {{ form.cityName }}
    </el-form-item>
    <el-form-item label="公司地址：">
      {{ form.addr }}
    </el-form-item>
    <el-form-item label="公司法人：">
      {{ form.legalPerson }}
    </el-form-item>
    <el-form-item label="公司简介：">
      {{ form.description }}
    </el-form-item>
    <el-form-item label="营业执照：">
      {{ form.licenseList }}
    </el-form-item>
    <el-form-item label="合同附件：" prop="">
      <a class="download" href="#">点击下载</a>
    </el-form-item>
    <div class="rate">
      <div class="server-count font14 col9">费用信息</div>
      <el-form-item label="技术使用费：">
        {{ form.useRate }}
      </el-form-item>
      <el-form-item label="个人税率：">
        {{ form.taxRate }}
      </el-form-item>
    </div>
    <div class="root">
      <div class="server-count font14 col9">系统账号与权限</div>
      <el-form-item label="管理员：" v-if="form.openUser === null" v-text="">
      </el-form-item>
      <el-form-item label="管理员：" v-else-if="form.openUser != null">
        {{ form.openUser.name }}
      </el-form-item>
      <el-form-item label="联系方式：" v-if="form.openUser === null" v-text="">
      </el-form-item>
      <el-form-item label="联系方式：" v-else-if="form.openUser != null">
        {{ form.openUser.mobile }}
      </el-form-item>
      <el-form-item label="系统权限：" v-if="form.openUser === null" v-text="">
      </el-form-item>
      <el-form-item label="系统权限：" v-else-if="form.openUser != null">
        {{ form.openUser.typeDesc }}
      </el-form-item>
    </div>
  </el-form>
</template>
<script>
  export default {
    data () {
      return {
        form: {},
        routerId: this.$route.query.id
      }
    },
    mounted () {
      let _this = this
      let detailsApi = '/api/provider/getProviderDetailsById?id=' + _this.routerId
      this.$http.get(detailsApi).then(function (response) {
        console.log(response.data)
        _this.$set(_this.$data, 'form', response.data)
        // if (response.data.code === 0) {
          // console.log(_this.form)
          console.log(111)
          localStorage.setItem('serverStrings', JSON.stringify(response.data))
          // console.log(response)
        // }
      }).catch(function (error) {
        console.log(error)
      })
    }
    // page () {
      // localStorage.getItem('currentPage')
    // }
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
  .modify .el-input__inner {border: 1px solid #dcdcdc;}
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