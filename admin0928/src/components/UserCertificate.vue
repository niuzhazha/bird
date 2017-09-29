<template>
    <section class="user-certificate">
      <div class="main-content">
        <div class="title-oprate">
          <nav class="charge-nav">
            <a :class="{'active': toggleFlag === 0}" href="javascript:;" @click="changeNav(0)">待审核</a>
            <a :class="{'active': toggleFlag === 1}" href="javascript:;" @click="changeNav(1)">未通过</a>
            <a :class="{'active': toggleFlag === 2}" href="javascript:;" @click="changeNav(2)">已通过</a>
          </nav>
        </div>
        <div class="main-table" v-show="toggleFlag === 0">
          <div class="server-count">共<span>{{ pageInfo.total }}</span>条</div>
          <el-table
            class="table-list"
            :data="tableData"
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
              prop="user.idCard"
              label="身份证号"
              width="180">
            </el-table-column>
            <el-table-column label="身份证正反面照" width="280">
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
                <el-button type="text" size="small" @click="togglePass(scope, 0)">通过</el-button>
                <el-button type="text" size="small" @click="togglePass(scope, 3)">不通过</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="main-table" v-show="toggleFlag === 1">
          <div class="server-count">共<span>{{ pageInfo.total }}</span>条</div>
          <el-table
            class="table-list"
            :data="tableData"
            stripe
            style="width: 100%;border: 0;color: #666;">
            <el-table-column
              prop="user.name"
              label="姓名"
              width="100">
            </el-table-column>
            <el-table-column
              prop="user.genderText"
              label="性别"
              width="80">
            </el-table-column>
            <el-table-column
              prop="user.birthday"
              label="出生日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="user.idCard"
              label="身份证号"
              width="180">
            </el-table-column>
            <el-table-column label="身份证正反面照" width="280">
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
                <el-button type="text" size="small" @click="togglePass(scope, 0)">通过</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="main-table" v-show="toggleFlag === 2">
          <div class="server-count">共<span>{{ pageInfo.total }}</span>条</div>
          <el-table
            class="table-list"
            :data="tableData"
            stripe
            style="width: 100%;border: 0;color: #666;">
            <el-table-column
              prop="user.name"
              label="姓名"
              width="100">
            </el-table-column>
            <el-table-column
              prop="user.genderText"
              label="性别"
              width="80">
            </el-table-column>
            <el-table-column
              prop="user.birthday"
              label="出生日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="user.idCard"
              label="身份证号"
              width="180">
            </el-table-column>
            <el-table-column label="身份证正反面照" width="280">
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
          v-if="tableData.length > 0"
          :totle-page="pageInfo.pages" 
          :current-page="1"
          v-on:jumpPage="listenPage"></pagination-comp>
      </div>
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
        tableData: [],
        pageInfo: {
          // 记录当前页码
          currentPage: 1,
          certState: 2
        }
      }
    },
    mounted () {
      this.getWorkerState()
    },
    methods: {
      // 初始化页面数据
      getWorkerState (page = 1, pageSize = 10, certState = 2) {
        // 页面加载时的过渡效果显示
        this.fullscreenLoading = true
        let _this = this
        let workerStateApi = '/api/worker/getListByCertState?page=' + page + '&pageSize=' + pageSize + '&certState=' + certState
        _this.$http.get(workerStateApi).then((response) => {
          this.fullscreenLoading = false
          response.data.data.list.forEach((item) => {
            // item.state = item.status === 1 ? '已停用' : '正常'
            item.updateTime = moment(item.updateTime).format('YYYY-MM-DD')
            item.user.genderText = item.user.gender === 1 ? '男' : '女'

          })
          _this.$set(_this.$data, 'tableData', response.data.data.list)
          // console.log(_this.tableData)
          _this.$set(_this.pageInfo, 'pages', response.data.data.pages)
          _this.$set(_this.pageInfo, 'total', response.data.data.total)
        }).catch((err) => {
          console.log(err)
        })
      },
      changeNav (index) {
        this.toggleFlag = index
        
        switch(index) {
          case 0:
            this.pageInfo.certState = 2
            break
          case 1:
            this.pageInfo.certState = 3
            break
          case 2:
            this.pageInfo.certState = 0
            break
        }
        this.getWorkerState(1, 10, this.pageInfo.certState)
      },
      showPicDialog (pic1, pic2) {
        console.log(pic1, pic2)
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
      togglePass(scope, type) {
        // 可取到当前条目的信息
        let _this = this
        // let status = scope.row.certState
        // console.log(status)
        console.log('type', type)
        console.log('userId', scope.row.id);
        // console.log(scope.row)

        // 提示语
        let showText = type === 0 ? '确定要认证通过？' : '确定要认证不通过？'
        let tipsTextOk = type === 0 ? '账号已通过!' : '账号不通过!'
        let tipsTextCancel = type === 0 ? '已取消通过!' : '已取消不通过'

        // 启用、停用接口地址
        let togglePassApi = '/api/worker/updateWorkerAuditStatus?userId=' + scope.row.userId + '&certState=' + type
        this.$confirm(showText, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 页面加载时的过渡效果显示
          this.fullscreenLoading = true
          // 调用停用、启用接口
          _this.$http.get(togglePassApi).then((response) => {
            // 页面加载时的过渡效果隐藏
            this.fullscreenLoading = false
            if (response.data.code === 0) {
              // 修改成功后，重新渲染页面。
              _this.getWorkerState(this.pageInfo.currentPage)
              this.$message({
                type: 'success',
                message: tipsTextOk
              })
            }
          }).catch((err) => {
            console.log(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: tipsTextCancel
          })
        })
        // console.log(index)
        // 可取到当前条目的信息
        // console.log(rows[index].id)
        // let state = rows[index].state
        // let tipsTextOk = state === '未认证' ? '未认证!' : '已认证！'
        // let tipsTextCancel = state === '正常' ? '已取消停用!' : '已取消启用'
        // this.$confirm('确定通过吗？', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消'
        //   // type: 'warning'
        // }).then(() => {
        //   this.$message({
        //     // type: 'success',
        //     // message: tipsTextOk
        //   })
        // }).catch(() => {
        //   this.$message({
        //     // type: 'info'
        //     // message: tipsTextCancel
        //   })
        // })
      },
      // 点击页码
      listenPage (p) {
        this.getWorkerState(p, 10)
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