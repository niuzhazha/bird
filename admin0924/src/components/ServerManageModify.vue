<template>
  <el-form 
    :model="formInline" 
    :rules="ruleInline" 
    ref="formInline"
    label-width="110px" style="background:#fff;padding: 20px;"
    class="login-ruleForm">
    
    <div class="title-oprate pb14 bor-btm-ec">
      <span class="font14 col9">
        <router-link :to="{ path: '/lnav-1' }" class="back-icon">
          <img src="../assets/images/backIcon.png">
        </router-link>
        添加/修改服务商信息
      </span>
    </div>

    <div class="server-count font14 col9">基本信息</div>
    <el-form-item label="公司全称：" prop="companyName">
      <el-row>
        <el-col :span="10">
          <el-input v-model="formInline.companyName" placeholder="请输入公司全称，和营业执照上的保持一致"></el-input>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="公司简称：" prop="companyNameShort">
      <el-row>
        <el-col :span="10">
          <el-input v-model="formInline.companyNameShort" placeholder="请输入公司简介"></el-input>
        </el-col>
      </el-row>
    </el-form-item>
    
    <el-form-item label="公司LOGO：" required prop="logo_file">
      <el-row>
        <el-upload
          action="#"
          list-type="picture-card"
          :file-list="fileList"
          :on-remove="handleRemove_logo"
          :on-success="uploadSuccess_logo"
          :before-upload="beforeUpload_logo">
          <el-button>点击上传公司LOGO</el-button>
        </el-upload>
      </el-row>
    </el-form-item>

    <el-form-item label="公司规模：" prop="scale">
      <el-row>
        <el-col :span="10">
          <el-select v-model="formInline.scale" placeholder="请选择公司规模">
            <el-option
              v-for="scale in scales"
              :key="scale.code"
              :label="scale.name"
              :value="scale.code">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </el-form-item>
    
    <el-form-item label="所在城市：" required>
      <el-row>
        <el-col :span="5">
          <el-form-item prop="province">
            <el-select v-model="formInline.provinceCode" placeholder="请选择" @change="select">
              <el-option
                v-for="province in citys"
                :key="province.code"
                :label="province.name"
                :value="province.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5" style="margin-left: 20px;">
          <el-form-item prop="city">
            <el-select v-model="formInline.cityCode" placeholder="请选择">
              <el-option
                v-for="city in subcitys"
                :key="city.code"
                :label="city.name"
                :value="city.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form-item>
    
    <el-form-item label="公司地址：" prop="addr">
      <el-row>
        <el-col :span="10">
          <el-input v-model="formInline.addr"></el-input>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="公司法人：" prop="legalPerson">
      <el-row>
        <el-col :span="10">
          <el-input v-model="formInline.legalPerson"></el-input>
        </el-col>
      </el-row>
    </el-form-item>
    
    <el-form-item label="公司简介：" prop="description">
      <el-row>
        <el-col :span="10">
          <el-input type="textarea" 
            v-model="formInline.description" 
            placeholder="请输入公司简介..."></el-input>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item label="营业执照：" required prop="licenseList">
      <el-row>
        <el-upload
          action="#"
          list-type="picture-card"
          :file-listl="fileListl"
          :on-remove="handleRemove_license"
          :on-success="uploadSuccess_license"
          :before-uploadL="beforeUpload_license">
          <el-button>点击上传营业执照</el-button>
        </el-upload>
      </el-row>
    </el-form-item>
    
    <el-form-item label="合同附件：" prop="contractList">
      <el-row>
        <!-- <img :src="item" v-for="item in server.contractList"> -->
        <el-upload
          action="http://testapi.center.birdwork.cn/api/common/upload"
          list-type="picture-card"
          :file-listc="fileListc"
          :on-remove="handleRemove_contract"
          :on-success="uploadSuccess_contract"
          :before-uploadC="beforeUpload_contract">
          <el-button>点击上传合同附件</el-button>
        </el-upload>
      </el-row>
    </el-form-item>

    <div class="server-count font14 col9">费用信息</div>
    <el-form-item label="技术使用费：" prop="useRate_input">
      <el-radio-group v-model="formInline.useRate_radio">
        <el-radio class="radio" :label="1">1.2%</el-radio>
        <el-radio class="radio" :label="2">
          <el-input v-model="formInline.useRate_input" 
            placeholder="请输入费率" :disabled="formInline.useRate_radio === 1"></el-input>
          <span style="padding-left:10px;">%</span>
        </el-radio>
      </el-radio-group>
    </el-form-item>
    
    <el-form-item label="个人税率：" prop="taxRate_input">
      <el-radio-group v-model="formInline.taxRate_radio">
        <el-radio class="radio" :label="1">1.2%</el-radio>
        <el-radio class="radio" :label="2">
          <el-input v-model="formInline.taxRate_input" 
            placeholder="请输入费率" :disabled="formInline.taxRate_radio === 1"></el-input>
          <span style="padding-left:10px;">%</span>
        </el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item class="submit-item tc">
      <el-button class="next-btn" type="primary" @click="onSubmit('formInline')">下一步</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  export default {
    data () {
      let useRatePass = (rule, value, callback) => {
        if (this.formInline.useRate_radio === 2) {
          if (value === '') {
            callback(new Error('请输入费率'))
          }
        }
      }
      let taxRatePass = (rule, value, callback) => {
        if (this.formInline.taxRate_radio === 2) {
          if (value === '') {
            callback(new Error('请输入费率'))
          }
        }
      }
      // let logoPass = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('请输入公司LOGO'))
      //   }
      // }
      // let licensePass = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('请上传公司营业执照'))
      //   }
      // }
      // let contractPass = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('请上传公司合同附件'))
      //   }
      // }
      return {
        // disabled: true,
        formInline: {
          companyName: '',
          companyNameShort: '',
          logo_file: '',
          scale: '',
          provinceCode: '',
          cityCode: '',
          addr: '',
          legalPerson: '',
          description: '',
          licenseList: '',
          contractList: '',
          useRate_radio: 1,
          useRate_input: '',
          taxRate_radio: 1,
          taxRate_input: ''
        },
        fileList: [],
        fileListl: [],
        fileListc: [],
        ruleInline: {
          companyName: [
            { required: true, message: '请输入公司全称', trigger: 'blur' }
          ],
          companyNameShort: [
            { required: true, message: '请输入公司简称', trigger: 'blur' }
          ],
          // logo_file: [
          //   { validator: logoPass, trigger: 'blur' }
          // ],
          scale: [
            { required: true, message: '请选择公司规模', trigger: 'blur' }
          ],
          province: [
            { required: true, message: '请选择所在省份', trigger: 'blur' }
          ],
          city: [
            { required: true, message: '请选择所在城市', trigger: 'blur' }
          ],
          addr: [
            { required: true, message: '请输入公司地址', trigger: 'blur' }
          ],
          legalPerson: [
            { required: true, message: '请输入公司法人', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '请输入公司简介', trigger: 'blur' }
          ],
          // licenseList: [
          //   { validator: licensePass, trigger: 'blur' }
          // ],
          // contractList: [
          //   { validator: contractPass, trigger: 'blur' }
          // ],
          useRate_input: [
            { validator: useRatePass, trigger: 'blur' }
          ],
          taxRate_input: [
            { validator: taxRatePass, trigger: 'blur' }
          ]
        },
        citys: [],
        subcitys: [],
        scales: []
      }
    },
    mounted () {
      let _this = this
      let p = this.getCities()
      this.getScale()
      if (this.$route.params.type === 'edit') {
        this.$set(this.$data, 'formInline', JSON.parse(localStorage.getItem('serverStrings')))
        this.$set(this.formInline, 'scale', this.formInline.scale + '')
        console.log(p)
        p.then(function() {
          _this.citys.forEach(item => {
            if (item.code === _this.formInline.provinceCode) {
              console.log(item)
              _this.$set(_this.$data, 'subcitys', item.cities)
              _this.$set(_this.formInline, 'cityCode', _this.formInline.cityCode + '')
            }
          })
        })
        // console.log(this.formInline.cityCode, typeof this.formInline.cityCode)
      } else if (this.$route.params.type === 'goback') {
        console.log('goback')
        let serverStr = localStorage.getItem('serverString')
        let server = JSON.parse(serverStr)
        this.$set(this.$data, 'server', server)
      }
    },
    methods: {
      onSubmit (name) {
        
        this.$refs[name].validate((valid) => {
          if (valid) {
            let _this = this
            let addApi = '/api/provider/addOrUpdate'
            this.$http({
              url: addApi,
              params: {
                'companyName': _this.formInline.companyName,
                'companyNameShort': _this.formInline.companyNameShort,
                'scale': _this.formInline.scale,
                'cityCode': '010',
                'addr': _this.formInline.addr,
                'legalPerson': _this.formInline.legalPerson,
                'description': _this.formInline.description,
                'useRate': '12',
                'taxRate': '12',
                'logo': '22',
                'licenseList': '11',
                'contractList': '33'
              },
              method: 'post'
            }).then(function (response) {
              console.log(response)
              if (response.data.code === 0) {
                // _this.$message.success('!')
                localStorage.setItem('serverString', JSON.stringify(this.formInline))
                _this.$router.push('/servermanagemodifytwo/add/0')
              } else {
                _this.$message.error(response.data.message)
              }
            }).catch(function (error) {
              console.log(error)
              _this.$message.error(error.data.message)
            })
          } else {
            this.$message.error('表单验证失败!')
          }
        })
      },
      getCities () {
        let _this = this
        // let cityApi = 'http://192.168.0.107:8080/api/common/city'
        let cityApi = '/api/common/city'
        let p = this.$http.get(cityApi).then(function (response) {
          _this.$set(_this.$data, 'citys', response.data.data)
        }).catch(function (error) {
          console.log(error)
        })
        return p
      },
      getScale () {
        let _this = this
        let scaleApi = '/api/provider/scale'
        this.$http.get(scaleApi).then(function (response) {
          // console.log(response)
          _this.$set(_this.$data, 'scales', response.data.data)
        }).catch(function (error) {
          console.log(error)
        })
      },
      select (val) {
        this.$set(this.$data, 'subcitys', [])
        this.$set(this.formInline, 'city', '')
        this.citys.forEach(item => {
          // console.log(item.code)
          // console.log(val)
          if (item.code === val) {
            // console.log(item)
            this.$set(this.$data, 'subcitys', item.cities)
          }
        })
      },
      uploadSuccess_logo (response, file, fileList) {
        this.formInline.logo_file = file.url
        console.log(this.formInline)
      },
      handleRemove_logo (file, fileList) {
        this.formInline.logo_file = ''
      },
      beforeUpload_logo (file) {
        // console.log(file)
        let fd = new FormData()
        fd.append('file', file)
        fd.append('type', 20)
        this.$http({
          url: '/api/common/upload',
          data: fd,
          method: 'post'
        }).then(res => {
          console.log(res)
          let obj = {url: res.data.data, name:'img1'}
          this.fileList.push(obj)
        })
        // console.log(this.formInline.logo_file)
        if (this.formInline.logo_file) {
          this.$message('只能上传一张LOGO图片')
          return false
        }
      },
      beforeUpload_license (file) {
        // console.log(file)
        let fd = new FormData()
        fd.append('file', file)
        fd.append('type', 100)
        this.$http({
          url: '/api/common/upload',
          data: fd,
          method: 'post'
        }).then(res => {
          console.log(res)
          let obj = {url: res.data, name:'img2'}
          this.fileListl.push(obj)
        })
      },
      beforeUpload_contract (file) {
        // console.log(file)
        let fd = new FormData()
        fd.append('file', file)
        fd.append('type', 11)
        this.$http({
          url: '/api/common/upload',
          data: fd,
          method: 'post'
        }).then(res => {
          console.log(res)
          let obj = {url: res.data, name:'img3'}
          this.fileListc.push(obj)
        })
      },
      uploadSuccess_license (response, file, fileList) {
        let urlArr = []
        fileList.forEach(item => {
          urlArr.push(item.url)
        })
        this.formInline.licenseList = urlArr.join()
      },
      handleRemove_license (file, fileList) {
        this.formInline.licenseList = ''
      },
      uploadSuccess_contract (response, file, fileList) {
        let urlArr = []
        fileList.forEach(item => {
          urlArr.push(item.url)
        })
        this.formInline.contractList = urlArr.join()
      },
      handleRemove_contract (file, fileList) {
        this.formInline.contractList = ''
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
  .el-upload button {
    color: #4794fe!important;
    border: 1px solid #4794fe!important;
    color: #1f2d3d;
  }
  .city .el-input__inner {width: 25%;border: 1px solid #000;}
  .el-select{width: 100%;}
  .city .el-input:first-child .el-input__inner {margin-right: 20px;}
  .city .el-input {width: 200px;}
  .modify .el-textarea__inner {width: 100%;resize: none;}
  .next-btn {font-size: 18px;width: 320px;height: 50px;color: #fff;background-color: #4794fe;border-radius: 4px;border-top-style: none;border-right-style: none;border-bottom-style: none;border-left-style: none;}
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