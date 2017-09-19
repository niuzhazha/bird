<template>
  <!-- :rules="ruleValidate" -->
  <el-form class="modify" ref="form" :model="server" 
    label-width="100px" style="background:#fff;padding: 20px;"
    v-on:submit.prevent>
    <div class="title-oprate pb14 bor-btm-ec">
      <span class="font14 col9">
        <router-link :to="{ path: '/hotel/list' }" class="back-icon">
          <img src="../assets/images/backIcon.png">
        </router-link>
        添加/修改服务商信息
      </span>
    </div>
    <div class="server-count font14 col9">基本信息</div>
    <el-form-item label="公司全称：">
      <el-input v-model="server.companyName" placeholder="请输入公司全称，和营业执照上的保持一致"></el-input>
    </el-form-item>
    <el-form-item label="公司简称：">
      <el-input v-model="server.companyNameShort" placeholder="请输入公司简介"></el-input>
    </el-form-item>
    <el-form-item label="公司LOGO：">
      <el-row>
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <el-button>点击上传公司LOGO</el-button>
        </el-upload>
        <!-- <el-dialog v-model="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog> -->
      </el-row>
    </el-form-item>
    <el-form-item class="width400" label="公司规模：">
      <el-select v-model="server.scale" placeholder="请选择公司规模">
        <el-option label="10-50" :value="server.scale"></el-option>
        <el-option label="100-999" :value="server.scale"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="所在城市：">
      <el-row>
        <el-col :span="10">
          <el-select v-model="server_box.province" placeholder="请选择" @change="select">
            <el-option
              v-for="province in citys"
              :key="province.code"
              :label="province.name"
              :value="province.code">
            </el-option>
          </el-select>
          <el-select v-model="server_box.city" placeholder="请选择">
            <el-option
              v-for="city in subcitys"
              :key="city.code"
              :label="city.name"
              :value="city.code">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="公司地址：">
      <el-input v-model="server.addr"></el-input>
    </el-form-item>
    <el-form-item label="公司法人：">
      <el-input v-model="server.legalPerson"></el-input>
    </el-form-item>
    <el-form-item label="公司简介：">
      <!-- <el-input v-model="form.intro"></el-input> -->
      <el-input type="textarea" v-model="server.description" placeholder="请输入公司简介..."></el-input>
    </el-form-item>
    <el-form-item label="营业执照：">
      <el-row>
        <img :src="item" v-for="item in server.licenseList">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <el-button>点击上传营业执照</el-button>
        </el-upload>
        <!-- <el-dialog v-model="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog> -->
      </el-row>
    </el-form-item>
    <el-form-item label="合同附件：">
      <el-row>
        <img :src="item" v-for="item in server.contractList">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <el-button>点击上传合同附件</el-button>
        </el-upload>
        <!-- <el-dialog v-model="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog> -->
      </el-row>
    </el-form-item>
    <div class="server-count font14 col9">费用信息</div>
    <el-form-item label="技术使用费：">
      <el-radio-group v-model="server.rateone">
        <el-radio class="radio" v-model="server.rateone.radio" label="1">1.2%</el-radio>
        <el-radio class="radio" v-model="server.rateone.radio" label="2">
          <el-input v-model="server.rateone.input" placeholder="请输入费率"></el-input>%
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="个人税率：">
      <el-radio-group v-model="server.ratetwo">
        <el-radio class="radio" v-model="server.ratetwo.radio" label="1">1.2%</el-radio>
        <el-radio class="radio" v-model="server.ratetwo.radio" label="2">
          <el-input v-model="server.ratetwo.input" placeholder="请输入费率"></el-input>%
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <button class="next-btn" type="primary" @click="onSubmit">下一步</button>
    </el-form-item>
  </el-form>
</template>
<script>
  export default {
    data () {
      return {
        server: {
          rateone: {
            radio: '',
            input: ''
          },
          ratetwo: {
            radio: '',
            input: ''
          }
        },
        server_box: {
          province: '',
          city: ''
        },
        citys: [],
        subcitys: []
      }
    },
    // watch: {
    //   'server.province' (val, oldVal) {
    //     console.log(val)
    //     清空第二个选择框中的可选数据
    //     this.$set(this.$data, 'subcitys', [])
    //     清空第二个选择框中的数据
    //     this.$set(this.server, 'city', '')
    //     this.citys.forEach(item => {
    //       // console.log(item.code)
    //       // console.log(val)
    //       省份的code === 你选择的code
    //       if (item.code === val) {
    //         console.log(item)
    //         被选中的城市存下来
    //         this.$set(this.$data, 'subcitys', item.cities)
    //       }
    //     })
    //   }
    // },
    mounted () {
      console.log(this.$route)
      if (this.$route.params.type === 'edit') {
        let item = {
          id: 0,
          companyName: '213',
          companyNameShort: '132',
          scale: 0,
          cityCode: '3123',
          addr: '312',
          legalPerson: '',
          useRate: 0,
          taxRate: 0,
          logo: '3123',
          description: 'shshs',
          createTime: 1505117617000,
          updateTime: 1505117619000,
          licenseList: [
            'shs',
            'ssss'
          ],
          contractList: [
            'www',
            'qaxx'
          ]
        }
        this.$set(this.$data, 'server', item)
      } else if (this.$route.params.type === 'goback') {
        console.log('goback')
        let serverStr = localStorage.getItem('serverString')
        let server = JSON.parse(serverStr)
        this.$set(this.$data, 'server', server)
      }
      this.getCities()
    },
    methods: {
      onSubmit () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            alert('submit!')
            console.log(valid)
            localStorage.setItem('serverString', JSON.stringify(this.server))
            // this.$router.push({
            //   name: 'ServerManageModifyTwo',
            //   params: { type: this.$route.params.type, id: this.$route.params.id }
            // })
          } else {
            console.log('error submit!!')
            return false
          }
        })
        // console.log('submit!')
        // console.log(this.server)
      },
      getCities () {
        let _this = this
        let cityApi = '/api/common/city'
        this.$http.get(cityApi).then(function (response) {
          // console.log(response)
          _this.$set(_this.$data, 'citys', response.data.data)
        }).catch(function (error) {
          console.log(error)
        })
      },
      select (val) {
        this.$set(this.$data, 'subcitys', [])
        this.$set(this.server, 'city', '')
        this.citys.forEach(item => {
          // console.log(item.code)
          // console.log(val)
          if (item.code === val) {
            // console.log(item)
            this.$set(this.$data, 'subcitys', item.cities)
          }
        })
      },
      handlePictureCardPreview () {},
      handleRemove () {}
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
  /*.modify .el-input__inner {border: 1px solid #dcdcdc;width: 400px;}*/
  .modify .el-select .el-input__inner {border: 1px solid #dcdcdc;width: 200px;}
  .modify .width400 .el-input__inner {border: 1px solid #dcdcdc;width: 400px;}
  /*.modify .el-form-item__label {text-align: left;}*/
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
  .el-upload--picture-card {
    background-color: #fff; 
    border: 0; 
    border-radius: 6px;
    width: auto;
    height: auto;
    cursor: pointer;
     line-height: 1; 
    vertical-align: top;
  }
</style>