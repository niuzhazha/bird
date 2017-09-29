<template>
    <section class="user-management">
      <div class="main-content">
        <div class="title-oprate">
          <span>用户管理</span>
        </div>
        <div class="server-count">共<span>{{ pageInfo.total }}</span>个用户</div>
        <el-table
          class="table-list"
          :data="tableData"
          stripe
          style="width: 100%;border: 0;color: #666;">
          <el-table-column
            prop="id"
            label="ID"
            width="16%">
          </el-table-column>
          <el-table-column
            prop="user.name"
            label="姓名"
            width="16%">
          </el-table-column>
          <el-table-column
            prop="user.gender"
            label="性别"
            width="16%">
          </el-table-column>
          <el-table-column
            prop="user.birthday"
            label="出生日期"
            width="20%">
          </el-table-column>
          <el-table-column
            prop="student"
            label="是否学生"
            width="16%">
          </el-table-column>
          <el-table-column
            prop="certState"
            label="认证状态"
            width="16%">
          </el-table-column>
          <el-table-column
            prop="certNum"
            label="信用分"
            width="16%">
          </el-table-column>
          <!-- <template scope="scope">
            <el-button type="text" size="small">{{ scope.row.workerCreditDetail.commentNum }}</el-button>
            <el-button type="text" size="small">{{ scope.row.workerCreditDetail.commentAvg }}</el-button>
          </template> -->
          <el-table-column
            prop=""
            label="评价"
            width="16%">
            <template scope="scope">
              <el-button type="text" size="small">{{ scope.row.workerCreditDetail.commentNum }}</el-button>
              <el-button type="text" size="small">{{ scope.row.workerCreditDetail.commentAvg }}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="注册时间"
            width="20%">
          </el-table-column>
          <el-table-column
            prop="user.mobile"
            label="手机号"
            width="20%">
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-box">
        <pagination-comp
          v-if="tableData.length > 0"
          :totle-page="pageInfo.pages" 
          :current-page="1"
          v-on:jumpPage="listenPage"></pagination-comp>
      </div>
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
        fullscreenLoading: false,
        tableData: [],
        pageInfo: {
          // 记录当前页码
          currentPage: 1
        }
      }
    },
    mounted () {
      this.getWorker()
    },
    methods: {
      getWorker (page = 1, pageSize = 10) {
        // 页面加载时的过渡效果显示
        this.fullscreenLoading = true
        let _this = this
        let workerApi = '/api/worker/list?page=' + page + '&pageSize=' + pageSize
        _this.$http.get(workerApi).then((response) => {
          this.fullscreenLoading = false
          response.data.data.list.forEach((item) => {
            // console.log(item)
            item.createTime = moment(item.createTime).format('YYYY-MM-DD')
            item.student = item.type === 2 ? '是' : '否'
            if (item.user === null) {
              item.name = ''
            } else {
              item.name = item.user.name
            }
          })
          _this.$set(_this.$data, 'tableData', response.data.data.list)
          // console.log(_this.tableData)
          // console.log(response.data.data)
          _this.$set(_this.pageInfo, 'pages', response.data.data.pages)
          _this.$set(_this.pageInfo, 'total', response.data.data.total)
        }).catch((err) => {
          console.log(err)
        })
      },
      // 点击页码
      listenPage (p) {
        this.getWorker(p, 10)
        // 翻页时，记录翻到了第几页
        this.$set(this.pageInfo, 'currentPage', p)
        // localStorage.setItem('currentPage', p)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .user-management {
    
  }
  .server-list {color: #999;}
  .el-table {
    border: 0;
  }
  /*.th {color: #999;}*/
  .el-table__header,.el-table__body {width: 100%!important;}
  .el-button {font-size: 14px;/*color: #4399ff;*/}
  .main-content {
    background-color: #FFF;
  }
  .title-oprate {
    margin: 0 20px;
    border-bottom: 1px solid #ececec;
    padding: 10px 0;
    font-size: 14px;
    font-weight: bolder;
    color: #999;
  }
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
</style>
