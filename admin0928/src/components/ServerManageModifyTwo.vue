<template>
  <el-form 
    class="modify2" 
    :model="formInline" 
    :rules="ruleInline"
    ref="formInline"
    label-width="105px" 
    style="background:#fff;padding: 20px;">
    <div class="title-oprate pb14 bor-btm-ec">
      <span class="font14 col9">
      <router-link class="back-icon" :to="{ name: 'ServerManageModify', params: { type: 'goback', id: this.$route.params.id } }">
        <img src="../assets/images/backIcon.png">
      </router-link>
      添加/修改服务商信息</span>
    </div>
    <div class="server-count font14 col9">系统账号与权限</div>
    <el-form-item label="管理员：" prop="name">
      <el-row>
        <el-col :span="10">
          <el-input v-model="formInline.openUser.name" placeholder="请输入管理员名字"></el-input>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="联系方式：" prop="mobile">
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
          <el-checkbox disabled v-model="privilege.home.selectAll">首页</el-checkbox>
        </el-col>
      </el-row>
      
      <!-- 一级 -->
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


      <!-- <el-row>
        <el-col :span="24">
          <el-checkbox disabled v-model="privilege.home.selectAll">首页</el-checkbox>
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
      </el-row> -->
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
        trees: [],
        formInline: {
          openUser: {
            name: '',
            mobile: ''
          }
        },
        privilege: {
          home: {
            selectAll: true
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
          name: [
            { required: true, message: '请输入管理员', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '请输入联系方式', trigger: 'blur' }
          ]
        }
      }
    },
    mounted () {
      this.formInline = JSON.parse(localStorage.getItem('serverString'))
      this.formInline.openUser = this.formInline.openUser === null ? {
        name: '',
        mobile: ''
      } : this.formInline.openUser
      // console.log(this.formInline)
      this.getTrees()
    },
    methods: {
      onSubmit (name) {
        // this.$refs[name].validate((valid) => {
          // if (valid) {
        let _this = this
        console.log(_this.formInline)
        console.log(_this.privilege)
        let addApi = '/api/provider/addOpenUser'
        this.$http({
          url: addApi,
          params: {
            'name': _this.formInline.openUser.name,
            'mobile': _this.formInline.openUser.mobile,
            // 'authIds': '1,2',
            'authIds': _this.privilege.oldpass,
            'providerId': _this.$route.params.id
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
      },
      getTrees () {
        let _this = this
        let treeApi = '/api/provider/getAuthsList'
        this.$http.get(treeApi).then(function (response) {
          // console.log(response.data.data.children)
          if (response.data.code === 0) {
            _this.$set(_this.$data, 'trees', response.data.data.children)
            console.log(_this.trees)
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      // 系统权限功能
      toggleCheck (type, val) {
        // 存放传入的具体点按checkbox
        let typeArr = []
        if (type.indexOf('.') > -1) {
          typeArr = type.split('.')
        }

        // 如果选中此checkbox
        if (val) {
          // 如果选中的checkbox，是二级的checkbox
          if (typeArr.length === 2) {
            // 点击二级后，把三级所有checkbox置为已选
            for (let item in this.privilege[typeArr[0]][typeArr[1]]) {
              // 点击二级后，把三级所有checkbox置为已选,排除selectAll，因为点击的这个二级checkbox的selectAll就变为true了
              if (item !== 'selectAll') {
                this.privilege[typeArr[0]][typeArr[1]][item] = true
              }
            }

            // 点击二级时，一级的toggle
            let isAllSelectArr = []
            // 循环一级下所有子项，除了selectAll.
            for (let item in this.privilege[typeArr[0]]) {
              if (this.privilege[typeArr[0]][item] !== 'selectAll') {
                // 循环一级下所有子项中的子项中为selectAll的项.
                for (let subitem in this.privilege[typeArr[0]][item]) {
                  if (subitem === 'selectAll') {
                    // 把所有一级的子项的子项中名为selectAll的项目的结果，存到数组中
                    isAllSelectArr.push(this.privilege[typeArr[0]][item][subitem])
                  }
                }
              }
            }
            // 判断isAllSelectArr的所有项目的结果，是否全是true
            let isAllSelect = isAllSelectArr.every((item) => {
              return item === true
            })
            // 如果全是true，则让一级的checkbox选中
            if (isAllSelect) {
              this.privilege[typeArr[0]].selectAll = true
            }

          // 如果选中的checkbox，是三级的checkbox
          } else if (typeArr.length === 3) {
            // 点击三级
            // 二级的toggle
            let isAllSelectArrTwo = []
            for (let item in this.privilege[typeArr[0]][typeArr[1]]) {
              if (item !== 'selectAll') {
                isAllSelectArrTwo.push(this.privilege[typeArr[0]][typeArr[1]][item])
              }
            }
            let isAllSelectTwo = isAllSelectArrTwo.every((item) => {
              return item === true
            })
            if (isAllSelectTwo) {
              this.privilege[typeArr[0]][typeArr[1]].selectAll = true
            }

            // 一级的toggle
            let isAllSelectArrOne = []
            for (let item in this.privilege[typeArr[0]]) {
              if (this.privilege[typeArr[0]][item] !== 'selectAll') {
                for (let subitem in this.privilege[typeArr[0]][item]) {
                  if (subitem === 'selectAll') {
                    isAllSelectArrOne.push(this.privilege[typeArr[0]][item][subitem])
                  }
                }
              }
            }
            let isAllSelectOne = isAllSelectArrOne.every((item) => {
              return item === true
            })
            if (isAllSelectOne) {
              this.privilege[typeArr[0]].selectAll = true
            }

          // 如果选中的checkbox，是一级的checkbox
          } else {
            for (let item in this.privilege[type]) {
              if (item !== 'selectAll') {
                for (let subitem in this.privilege[type][item]) {
                  this.privilege[type][item][subitem] = true
                }
              }
            }
          }
        } else {
          if (typeArr.length === 2) {
            this.privilege[typeArr[0]].selectAll = false
            for (let item in this.privilege[typeArr[0]][typeArr[1]]) {
              if (item !== 'selectAll') {
                this.privilege[typeArr[0]][typeArr[1]][item] = false
              }
            }
          } else if (typeArr.length === 3) {
            this.privilege[typeArr[0]].selectAll = false
            for (let item in this.privilege[typeArr[0]][typeArr[1]]) {
              if (item === 'selectAll') {
                this.privilege[typeArr[0]][typeArr[1]][item] = false
              }
            }
          } else {
            this.privilege[type].selectAll = false
            for (let item in this.privilege[type]) {
              if (item !== 'selectAll') {
                console.log(item)
                for (let subitem in this.privilege[type][item]) {
                  this.privilege[type][item][subitem] = false
                }
              }
            }
          }
        }
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