<template>
    <section class="user-certificate">
      <div class="main-content">
        <div class="title-oprate">
          <nav class="charge-nav">
            <a :class="{'active': toggleFlag === 0}" href="#" @click="changeNav(0)">待审核</a>
            <a :class="{'active': toggleFlag === 1}" href="#" @click="changeNav(1)">未通过</a>
            <a :class="{'active': toggleFlag === 2}" href="#" @click="changeNav(2)">已通过</a>
          </nav>
        </div>
        <div class="main-table" v-show="toggleFlag === 0">
          <div class="server-count">共<span>30</span>条</div>
          <el-table
            class="table-list"
            :data="tableDataTodo"
            stripe
            style="width: 100%;border: 0;color: #666;">
            <el-table-column
              prop="user.name"
              label="姓名"
              width="100">
            </el-table-column>
            <el-table-column
              prop="user.gender"
              label="性别"
              width="80">
            </el-table-column>
            <el-table-column
              prop="user.birthday"
              label="出生日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="user.idcard"
              label="身份证号"
              width="180">
            </el-table-column>
            <el-table-column prop="img" label="身份证正反面照" width="280">
              <template scope="scope">
                <img :src="scope.row.idCardFront" @click="showPicDialog(scope.row.idCardFront,scope.row.idCardBack)">
                <img :src="scope.row.idCardBack" @click="showPicDialog(scope.row.idCardFront,scope.row.idCardBack)">
              </template>
            </el-table-column>
            <el-table-column
              prop="updateTime"
              label="提交时间"
              width="180">
            </el-table-column>
            <el-table-column
              prop="auditReason"
              label="上次未通过理由"
              width="180">
            </el-table-column>
            <el-table-column
              label="操作"
              width="180">
              <template scope="scope">
                <el-button type="text" size="small" @click="togglePass(scope, tableData)(scope, tableData)">通过</el-button>
                <el-button type="text" size="small" @click="togglePass(scope, tableData)(scope, tableData)">不通过</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="main-table" v-show="toggleFlag === 1">
          <div class="server-count">共<span>30</span>条</div>
          <el-table
            class="table-list"
            :data="tableDataNo"
            stripe
            style="width: 100%;border: 0;color: #666;">
            <el-table-column
              prop="user.name"
              label="姓名"
              width="100">
            </el-table-column>
            <el-table-column
              prop="user.gender"
              label="性别"
              width="80">
            </el-table-column>
            <el-table-column
              prop="user.birthday"
              label="出生日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="user.idcard"
              label="身份证号"
              width="180">
            </el-table-column>
            <el-table-column prop="img" label="身份证正反面照" width="280">
              <template scope="scope">
                <img :src="scope.row.idCardFront" @click="showPicDialog(scope.row.idCardFront,scope.row.idCardBack)">
                <img :src="scope.row.idCardBack" @click="showPicDialog(scope.row.idCardFront,scope.row.idCardBack)">
              </template>
            </el-table-column>
            <el-table-column
              prop="updateTime"
              label="提交时间"
              width="180">
            </el-table-column>
            <el-table-column
              prop="state"
              label="上次未通过理由"
              width="180">
            </el-table-column>
            <el-table-column
              label="操作"
              width="180">
              <template scope="scope">
                <el-button type="text" size="small" @click="togglePass(scope, tableData)">通过</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="main-table" v-show="toggleFlag === 2">
          <div class="server-count">共<span>30</span>条</div>
          <el-table
            class="table-list"
            :data="tableDataAccess"
            stripe
            style="width: 100%;border: 0;color: #666;">
            <el-table-column
              prop="user.name"
              label="姓名"
              width="100">
            </el-table-column>
            <el-table-column
              prop="user.gender"
              label="性别"
              width="80">
            </el-table-column>
            <el-table-column
              prop="user.birthday"
              label="出生日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="user.idcard"
              label="身份证号"
              width="180">
            </el-table-column>
            <el-table-column prop="img" label="身份证正反面照" width="280">
             <template scope="scope">
                <img :src="scope.row.idCardFront" @click="showPicDialog(scope.row.idCardFront,scope.row.idCardBack)">
                <img :src="scope.row.idCardBack" @click="showPicDialog(scope.row.idCardFront,scope.row.idCardBack)">
              </template>
            </el-table-column>
            <el-table-column
              prop="updateTime"
              label="提交时间"
              width="180">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="pagination-box">
        <pagination-comp
          v-if="tableDataTodo.length > 0"
          :totle-page="pageInfo.pages" 
          :current-page="1"
          v-on:jumpPage="listenPage"></pagination-comp>
      </div>
      <!-- <el-pagination
        class="pagination-box"
        layout="prev, pager, next"
        @current-change="currentChange"
        :total="1000">
      </el-pagination> -->
      <el-dialog class="idcard-dialog" title="身份证正反面" :visible.sync="bigImg.toggle">
        <el-row>
          <el-col :span="12">
            <img :src="bigImg.up">
            <div class="pt30">身份证正面</div>
          </el-col>
          <el-col :span="12">
            <img :src="bigImg.down">
            <div class="pt30">身份证背面</div>
          </el-col>
        </el-row>
      </el-dialog>
    </section>
</template>
<script>
  import PaginationComp from './commons/PaginationComp'
  import moment from 'moment'
  export default {
    components: {
      PaginationComp
    },
    data () {
      return {
        // picdialog: false,
        toggleFlag: 0,
        bigImg: {
          up: '',
          down: '',
          toggle: false
        },
        // tableData: [],
        tableDataTodo: [],
        tableDataNo: [],
        tableDataAccess: [],
        pageInfo: {
          // 记录当前页码
          currentPage: 1
        }
      }
    },
    mounted () {
      this.getWorkerState2()
      this.getWorkerState1()
      this.getWorkerState0()
    },
    methods: {
      // 初始化页面数据
      getWorkerState2 (page = 1, pageSize = 10, certState = 2) {
        // 页面加载时的过渡效果显示
        this.fullscreenLoading = true
        let _this = this
        let workerStateApi = '/api/worker/getListByCertState?page=' + page + '&pageSize=' + pageSize + '&certState=' + certState
        _this.$http.get(workerStateApi).then((response) => {
          this.fullscreenLoading = false
          // console.log(response)
          // console.log(this.tableDataTodo)
          response.data.data.list.forEach((item) => {
            // console.log(item)
            // item.state = item.status === 1 ? '已停用' : '正常'
            item.updateTime = moment(item.updateTime).format('YYYY-MM-DD')
            if (item.user === null) {
              item.name = ''
            } else {
              item.name = item.user.name
              // item.contact = item.openUser.mobile
            }
            // console.log(item.certState)
            // if (item.certState === 2) {
              // _this.$set(_this.$data, 'tableDataTodo', response.data.data.list)
            //   // console.log(tableDataTodo)
              // _this.tableDataTodo.push(item)
            // } else if (item.certState === 1) {
            //   _this.$set(_this.$data, 'tableDataNo', response.data.data.list)
            // } else if (item.certState === 0) {
            //   _this.$set(_this.$data, 'tableDataAccess', response.data.data.list)
            // }
          })
          _this.$set(_this.$data, 'tableDataTodo', response.data.data.list)
          // console.log(_this.tableData)
          _this.$set(_this.pageInfo, 'pages', response.data.data.pages)
          _this.$set(_this.pageInfo, 'total', response.data.data.total)
        }).catch((err) => {
          console.log(err)
        })
      },
      getWorkerState1 (page = 1, pageSize = 10, certState = 1) {
        // 页面加载时的过渡效果显示
        this.fullscreenLoading = true
        let _this = this
        let workerStateApi = '/api/worker/getListByCertState?page=' + page + '&pageSize=' + pageSize + '&certState=' + certState
        _this.$http.get(workerStateApi).then((response) => {
          this.fullscreenLoading = false
          // console.log(this.tableDataTodo)
          response.data.data.list.forEach((item) => {
            // console.log(item)
            // item.state = item.status === 1 ? '已停用' : '正常'
            item.updateTime = moment(item.updateTime).format('YYYY-MM-DD')
            if (item.user === null) {
              item.name = ''
            } else {
              item.name = item.user.name
              // item.contact = item.openUser.mobile
            }
            // console.log(item.certState)
            // if (item.certState === 2) {
              _this.$set(_this.$data, 'tableDataNo', response.data.data.list)
            //   // console.log(tableDataTodo)
            //   // _this.tableDataTodo.push(item)
            // } else if (item.certState === 1) {
            //   _this.$set(_this.$data, 'tableDataNo', response.data.data.list)
            // } else if (item.certState === 0) {
            //   _this.$set(_this.$data, 'tableDataAccess', response.data.data.list)
            // }
          })
          // console.log(_this.tableData)
          _this.$set(_this.pageInfo, 'pages', response.data.data.pages)
          _this.$set(_this.pageInfo, 'total', response.data.data.total)
        }).catch((err) => {
          console.log(err)
        })
      },
      getWorkerState0 (page = 1, pageSize = 10, certState = 0) {
        // 页面加载时的过渡效果显示
        this.fullscreenLoading = true
        let _this = this
        let workerStateApi = '/api/worker/getListByCertState?page=' + page + '&pageSize=' + pageSize + '&certState=' + certState
        _this.$http.get(workerStateApi).then((response) => {
          this.fullscreenLoading = false
          // console.log(this.tableDataTodo)
          response.data.data.list.forEach((item) => {
            // console.log(item)
            // item.state = item.status === 1 ? '已停用' : '正常'
            item.updateTime = moment(item.updateTime).format('YYYY-MM-DD')
            if (item.user === null) {
              item.name = ''
            } else {
              item.name = item.user.name
              // item.contact = item.openUser.mobile
            }
            // console.log(item.certState)
            // if (item.certState === 2) {
              _this.$set(_this.$data, 'tableDataAccess', response.data.data.list)
            //   // console.log(tableDataTodo)
            //   // _this.tableDataTodo.push(item)
            // } else if (item.certState === 1) {
            //   _this.$set(_this.$data, 'tableDataNo', response.data.data.list)
            // } else if (item.certState === 0) {
            //   _this.$set(_this.$data, 'tableDataAccess', response.data.data.list)
            // }
          })
          // console.log(_this.tableData)
          _this.$set(_this.pageInfo, 'pages', response.data.data.pages)
          _this.$set(_this.pageInfo, 'total', response.data.data.total)
        }).catch((err) => {
          console.log(err)
        })
      },
      changeNav (index) {
        this.toggleFlag = index
      },
      showPicDialog (pic1, pic2) {
        // console.log(pic1, pic2)
        this.$set(this.bigImg, 'up', pic1)
        this.$set(this.bigImg, 'down', pic2)
        this.$set(this.bigImg, 'toggle', true)
        // if (this.picdialog === false) {
        //   this.picdialog = true
        // } else {
        //   // this.billdialog = !this.billdialog
        //   this.picdialog = false
        // }
      },
      hidePicDialog () {
        this.$set(this.bigImg, 'toggle', false)
      },
      // toggleAccount (scope, rows) {
      //   // 可取到当前条目的信息
      //   let _this = this
      //   let status = scope.row.status

      //   // 提示语
      //   let showText = status === 0 ? '账号停用后该服务商的所有账号都将被停用，确定要停用吗' : '确定要启用该服务商吗'
      //   let tipsTextOk = status === 0 ? '账号已停用!' : '账号启用成功!'
      //   let tipsTextCancel = status === 0 ? '已取消停用!' : '已取消启用'

      //   // 要变成什么状态
      //   let changeStatus = status === 0 ? 1 : 0
      //   // let changeStatus = 0
      //   // if (status === 0) {
      //   //   changeStatus = 1
      //   // }

      //   // 启用、停用接口地址
      //   let toggleAccountApi = '/api/provider/updateStatusById?id=' + scope.row.id + '&status=' + changeStatus
      //   this.$confirm(showText, '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     // 页面加载时的过渡效果显示
      //     this.fullscreenLoading = true
      //     // 调用停用、启用接口
      //     _this.$http.get(toggleAccountApi).then((response) => {
      //       // 页面加载时的过渡效果隐藏
      //       this.fullscreenLoading = false
      //       if (response.data.code === 0) {
      //         // 修改成功后，重新渲染页面。
      //         _this.getProvider(this.pageInfo.currentPage)
      //         this.$message({
      //           type: 'success',
      //           message: tipsTextOk
      //         })
      //       }
      //     }).catch((err) => {
      //       console.log(err)
      //     })
      //   }).catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: tipsTextCancel
      //     })
      //   })
      // },
      togglePass (index, rows) {
        // console.log(index)
        // 可取到当前条目的信息
        console.log(rows[index].id)
        let state = rows[index].state
        let tipsTextOk = state === '未认证' ? '未认证!' : '已认证！'
        let tipsTextCancel = state === '正常' ? '已取消停用!' : '已取消启用'
        this.$confirm('确定通过吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
          // type: 'warning'
        }).then(() => {
          this.$message({
            // type: 'success',
            // message: tipsTextOk
          })
        }).catch(() => {
          this.$message({
            // type: 'info'
            // message: tipsTextCancel
          })
        })
      },
      // 点击页码
      listenPage (p) {
        this.getWorkerState1(p, 10)
        // 翻页时，记录翻到了第几页
        this.$set(this.pageInfo, 'currentPage', p)
        // localStorage.setItem('currentPage', p)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .user-certificate {color: #999;}
  .el-table {
    border: 0;
  }
  /*.th {color: #999;}*/
  /*.el-button {font-size: 14px;color: #4399ff;}*/
  .main-content {
    background-color: #FFF;
  }
  .title-oprate {
    margin: 0 20px;
    margin-left: 0;
    border-bottom: 1px solid #ececec;
    font-size: 14px;
    font-weight: bolder;
    color: #999;
  }
  .charge-nav a {width: 140px;display: inline-block;text-align: center;padding: 10px 0;}
  .charge-nav a.active {color: #0868f3;background-color: #ececec;}
  .server-count {
    padding: 20px;
  }
  .server-count span {
    color: #0868f3;
    margin: 0 3px;
  }
  .pagination-box {
    text-align: center;
    margin-top: 30px;
  }
  td {border-bottom: 0;}
  /*.el-table td {border-bottom: none!important;}*/
  .el-table td, .el-table th.is-leaf {border-bottom: 1px solid #fff!important;}
  .el-pager li {border-radius: 50%!important;margin: 0 5px;}
  .el-message-box {background-color: #f6f6f6;}
  .el-input .el-input__inner {border: 0;}
  .cell img {width: 62px;height: 40px;}
  .idcard-dialog {
    text-align:center;
    img {
      width: 200px;
      height: 140px;
    }
  }
  .up-div img,.down-div img {width: 239px;height: 154px;}
</style>