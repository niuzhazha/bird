<template>
  <el-form class="modify" ref="form" :model="form" label-width="100px" style="background:#fff;padding: 20px;">
    <div class="title-oprate pb14 bor-btm-ec">
      <span class="font14 col9"><a class="back-icon" href="#"><img src="../assets/images/backIcon.png"></a>添加/修改账号</span>
    </div>
    <div class="server-count font14 col9">基本信息</div>
    <el-form-item label="姓名：">
      <el-input v-model="form.fullname" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="部门：">
      <el-input v-model="form.firstname" placeholder=""></el-input>
    </el-form-item>
    <!-- <el-form-item class="width400" label="公司规模：">
      <el-select v-model="form.region" placeholder="请选择公司规模">
        <el-option label="10-50" value="shanghai"></el-option>
        <el-option label="100-999" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="所在城市：">
      <el-row>
        <el-col :span="10">
          <el-select v-model="server.province" placeholder="请选择" @change="select">
            <el-option
              v-for="province in citys"
              :key="province.code"
              :label="province.name"
              :value="province.code">
            </el-option>
          </el-select>
          <el-select v-model="server.city" placeholder="请选择">
            <el-option
              v-for="city in subcitys"
              :key="city.code"
              :label="city.name"
              :value="city.code">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </el-form-item> -->
    <el-form-item label="职位：">
      <el-input v-model="form.address"></el-input>
    </el-form-item>
    <el-form-item label="手机号：">
      <el-input v-model="form.corporate"></el-input>
    </el-form-item>
    <el-form-item label="初始密码：">
      <!-- <el-input v-model="form.intro"></el-input> -->
      <el-input v-model="form.intro" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="分配权限：">
      <!-- <el-row>
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <el-button>点击上传营业执照</el-button>
        </el-upload>
        <el-dialog v-model="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-row> -->
    </el-form-item>
      <button class="next-btn" type="primary" @click="onSubmit">保存</button>
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
          resource: '',
          desc: ''
        },
        server: {
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
      this.getCities()
    },
    methods: {
      onSubmit () {
        let _this = this
        console.log('submit!')
        _this.$router.push('/servermanagemodifytwo')
      },
      getCities () {
        let _this = this
        let cityApi = '/api/common/city'
        this.$http.get(cityApi).then(function (response) {
          console.log(response)
          _this.$set(_this.$data, 'citys', response.data.data)
        }).catch(function (error) {
          console.log(error)
        })
      },
      select (val) {
        this.$set(this.$data, 'subcitys', [])
        this.$set(this.server, 'city', '')
        this.citys.forEach(item => {
          console.log(item.code)
          // console.log(val)
          if (item.code === val) {
            console.log(item)
            this.$set(this.$data, 'subcitys', item.cities)
          }
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
  .server-count {padding: 20px 0;}
  .el-input {/*width: 290px;border: 1px solid #dcdcdc;*/}
  .modify .el-input__inner {border: 1px solid #dcdcdc;width: 400px;}
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