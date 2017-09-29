<template>
    <section class="financial-management">
      <div class="main-content">
        <div class="title-oprate">
          <nav class="charge-nav">
            <a :class="{'active': toggleFlag === 0}" href="javascript:;" @click="changeNav(0)">待充值</a>
            <a :class="{'active': toggleFlag === 1}" href="javascript:;" @click="changeNav(1)">已充值</a>
            <a :class="{'active': toggleFlag === 2}" href="javascript:;" @click="changeNav(2)">已取消</a>
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
              prop="accountId"
              label="服务商ID"
              width="14%">
            </el-table-column>
            <el-table-column
              prop="provider.companyName"
              label="服务商名称"
              width="20%">
            </el-table-column>
            <el-table-column
              prop="openUser.mobile"
              label="联系方式"
              width="20%">
            </el-table-column>
            <el-table-column
              prop="openUserAccount.amount"
              label="账户余额"
              width="16%">
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="充值申请时间"
              width="20%">
            </el-table-column>
            <el-table-column
              prop="amountDesc"
              label="充值金额"
              width="16%">
            </el-table-column>
            <el-table-column
              label="操作"
              width="20%">
              <template scope="scope">
                <el-button type="text" size="small" @click="financialConfirm(scope, 2)">确定</el-button>
                <el-button type="text" size="small" @click="financialRefulse(scope, 3)">取消</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="main-table" v-show="toggleFlag === 1">
          <div class="server-count">共<span>{{ pageInfo.total }}</span>条</div>
          <el-table
            v-show="toggleFlag === 1"
            class="table-list"
            :data="tableData"
            stripe
            style="width: 100%;border: 0;color: #666;">
            <el-table-column
              prop="accountId"
              label="服务商ID"
              width="14%">
            </el-table-column>
            <el-table-column
              prop="provider.companyName"
              label="服务商名称"
              width="20%">
            </el-table-column>
            <el-table-column
              prop="openUser.mobile"
              label="联系方式"
              width="20%">
            </el-table-column>
            <el-table-column
              prop="openUserAccount.amount"
              label="账户余额"
              width="16%">
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="充值申请时间"
              width="20%">
            </el-table-column>
            <el-table-column
              prop="amountDesc"
              label="充值金额"
              width="16%">
            </el-table-column>
          </el-table>
        </div>
        <div class="main-table" v-show="toggleFlag === 2">
          <div class="server-count">共<span>{{ pageInfo.total }}</span>条</div>
          <el-table
            v-show="toggleFlag === 2"
            class="table-list"
            :data="tableData"
            stripe
            style="width: 100%;border: 0;color: #666;">
            <el-table-column
              prop="provider.id"
              label="服务商ID"
              width="14%">
            </el-table-column>
            <el-table-column
              prop="provider.companyName"
              label="服务商名称"
              width="20%">
            </el-table-column>
            <el-table-column
              prop="openUser.mobile"
              label="联系方式"
              width="20%">
            </el-table-column>
            <el-table-column
              prop="openUserAccount.amount"
              label="账户余额"
              width="16%">
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="充值申请时间"
              width="26%">
            </el-table-column>
            <el-table-column
              prop="amount"
              label="充值金额"
              width="16%">
            </el-table-column>
            <el-table-column
              prop="updateTime"
              label="取消时间"
              width="25%">
            </el-table-column>
            <el-table-column
              prop="cancelReason"
              label="取消原因"
              width="20%">
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
    </section>
</template>
<script>
  import PaginationComp from './commons/PaginationComp'
  export default {
    components: {
      PaginationComp
    },
    data () {
      return {
        fullscreenLoading: false,
        toggleFlag: 0,
        tableData: [],
        pageInfo: {
          // 记录当前页码
          currentPage: 1,
          status: 1
        }
      }
    },
    mounted () {
      this.getFinance()
    },
    methods: {
      getFinance (page = 1, pageSize = 10, status = 1) {
        // 页面加载时的过渡效果显示
        this.fullscreenLoading = true
        let _this = this
        let financeApi = '/api/finance/list?page=' + page + '&pageSize=' + pageSize + '&status=' + status
        _this.$http.get(financeApi).then((response) => {
          this.fullscreenLoading = false
          response.data.data.list.forEach((item) => {
            item.openUserAccount.amount = (item.openUserAccount.amount/100).toFixed(2)
            // item.createTime = moment(item.createTime).format('YYYY-MM-DD')
            // item.student = item.type === 2 ? '是' : '否'
            // if (item.user === null) {
            //   item.name = ''
            // } else {
            //   item.name = item.user.name
            // }
          })
          // console.log(response.data.data)
          _this.$set(_this.$data, 'tableData', response.data.data.list)
          _this.$set(_this.pageInfo, 'pages', response.data.data.pages)
          _this.$set(_this.pageInfo, 'total', response.data.data.total)
        }).catch((err) => {
          console.log(err)
        })
      },
      // 点击页码
      listenPage (p) {
        this.getFinance(p, 10)
        // 翻页时，记录翻到了第几页
        this.$set(this.pageInfo, 'currentPage', p)
        // localStorage.setItem('currentPage', p)
      },
      changeNav (index) {
        this.toggleFlag = index
        
        switch(index) {
          case 0:
            this.pageInfo.status = 1
            break
          case 1:
            this.pageInfo.status = 2
            break
          case 2:
            this.pageInfo.status = 3
            break
        }
        this.getFinance(1, 10, this.pageInfo.status)
      },
      financialConfirm (scope, type) {
        let _this = this
        // console.log('id1 ',scope.row.id)
        // console.log('type1 ',type)

        let financeApi = '/api/finance/updateHistoryStateById?id=' + scope.row.id + '&status=' + type
        this.$confirm('确定线下已经收到银行转账且金额正确？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.$http.get(financeApi).then(function (response) {
            if (response.data.code === 0) {
              _this.$message.success('充值成功')
              _this.getFinance(_this.pageInfo.currentPage)
              // _this.$router.push('/financialmanagement')
            }
          }).catch(function (error) {
            console.log(error)
          })
        }).catch(() => {
        })
      },
      financialRefulse (scope, type) {
        let _this = this
        this.$prompt(' ', '取消理由', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          if (value != null) {
            _this.$set(_this.tableData, 'cancelReason', value)
            let financialRefulseApi = '/api/finance/updateHistoryStateById?id=' + scope.row.id + '&status=' + type +'&cancelReason=' + value
            _this.$http.get(financialRefulseApi).then(function (response) {
            if (response.data.code === 0) {
              _this.$message.success('取消成功')
              _this.getFinance(_this.pageInfo.currentPage)
            }
          })
            this.$message({
              type: 'success',
              // _this.getFinance(this.pageInfo.currentPage)
              message: '取消理由是: ' + value
            })
          } else {
            this.$message({
              type: 'info',
              message: '请输入取消原因'
            })
          }
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消'
          })
        })
      },
      // 点击页码
      listenPage (p) {
        this.getFinance(p, 10)
        // 翻页时，记录翻到了第几页
        this.$set(this.pageInfo, 'currentPage', p)
        // localStorage.setItem('currentPage', p)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .financial-management {color: #999;}
  .el-table {
    border: 0;
  }
  /*.th {color: #999;}*/
  /*.el-button {font-size: 14px;color: #4399ff;}*/
  .main-content {
    background-color: #FFF;
  }
  .el-table__header,.el-table__body {width: 100%!important;}
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
</style>
