<template>
  <el-form class="modify" ref="formInline" :rules="ruleInline" :model="formInline" label-width="100px" style="background:#fff;padding: 20px;">
    <div class="title-oprate pb14 bor-btm-ec">
      <span class="font14 col9"><a class="back-icon" href="#"><img src="../assets/images/backIcon.png"></a>添加/修改账号</span>
    </div>
    <div class="server-count font14 col9">基本信息</div>
    <el-form-item label="姓名：" prop="name" required>
      <el-input v-model="formInline.name" placeholder="请填写该用户的姓名"></el-input>
    </el-form-item>
    <!-- <el-form-item label="部门：" prop="department" required>
      <el-input v-model="formInline.department" placeholder="请输入该用户的部门"></el-input>
    </el-form-item>
    <el-form-item label="职位：" prop="title" required>
      <el-input v-model="formInline.title" placeholder="请输入该用户的职位"></el-input>
    </el-form-item> -->
    <el-form-item label="手机号：" prop="mobile" required>
      <el-input v-model="formInline.mobile" placeholder="手机号默认为登录账号"></el-input>
    </el-form-item>
    <el-form-item label="初始密码：" prop="password" required>
      <el-input v-model="formInline.password" placeholder="请输入初始密码"></el-input>
    </el-form-item>
    <el-form-item label="系统权限：" prop="authIds" required>
      <el-row>
        <el-col :span="24">
          <el-checkbox disabled v-model="privilege.home.selectAll">首页</el-checkbox>
        </el-col>
      </el-row>
      <template v-for="tree in trees">
        <el-row>
          <el-col :span="24">
            <el-checkbox>{{tree.name}}</el-checkbox>
          </el-col>
        </el-row>

        <!-- 二级 -->
        <template
          v-if="tree.children && tree.children.length>0"
          v-for="subtree in tree.children">
          <el-row>
            <el-col :span="24" :offset="1">
              <el-checkbox>{{subtree.name}}</el-checkbox>
            </el-col>
          </el-row>

          <!-- 三级 -->
          <el-checkbox-group>
            <!--   v-model="checkedCities" @change="handleCheckedCitiesChange" -->
            <el-row>
                <el-col :span="2" :offset="index === 0 ? 2 : 1"
                  v-if="subtree.children && subtree.children.length>0"
                  v-for="(thrtree, index) in subtree.children"
                  :key="thrtree.id">
                  <el-checkbox>{{thrtree.name}}</el-checkbox>
                </el-col>
            </el-row>
          </el-checkbox-group>
        </template>
      </template>
    </el-form-item>
      <button class="next-btn" type="primary" @click="onSubmit">保存</button>
    </el-form-item>
  </el-form>
</template>
<script>
  export default {
    data () {
      return {
        trees: [],
        formInline: {
          name: '',
          // department: '',
          // title: '',
          mobile: '',
          password: '',
          authIds: []
        },
        ruleInline: {
          name: [
            { required: true, message: '请填写该用户的姓名', trigger: 'blur' }
          ],
          // department: [
          //   { required: true, message: '请输入该用户的部门', trigger: 'blur' }
          // ],
          // title: [
          //   { required: true, message: '请输入该用户的职位', trigger: 'blur' }
          // ],
          mobile: [
            { required: true, message: '请输入手机号码', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入初始密码', trigger: 'blur' }
          ],
          authIds: [
            { required: true, message: '请选择分配权限', trigger: 'blur' }
          ]
        }
      }
    },
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