<template>
    <section class="financial-management">
      <div class="main-content">
        <div class="title-oprate">
          <nav class="charge-nav">
            <a :class="{'active': toggleFlag === 0}" href="javascript:;" @click="changeNav(0)">待支付</a>
            <a :class="{'active': toggleFlag === 1}" href="javascript:;" @click="changeNav(1)">已支付</a>
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
                prop="name"
                label="姓名"
                width="30%">
              </el-table-column>
              <el-table-column
                prop="contact"
                label="联系方式"
                width="20%">
              </el-table-column>
              <el-table-column
                prop="amount"
                label="提现金额"
                width="26%">
              </el-table-column>
              <el-table-column
                prop="bank"
                label="所属银行"
                width="20%">
              </el-table-column>
              <el-table-column
                prop="cardNo"
                label="银行卡号"
                width="38%">
              </el-table-column>
              <el-table-column
                prop="createTime"
                label="提交时间"
                width="26%">
              </el-table-column>
              <el-table-column
                label="操作"
                width="20%">
                <template scope="scope">
                  <el-button type="text" size="small" @click="transferConfirm(scope)">转账</el-button>
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
                prop="name"
                label="姓名"
                width="30%">
              </el-table-column>
              <el-table-column
                prop="contact"
                label="联系方式"
                width="20%">
              </el-table-column>
              <el-table-column
                prop="amount"
                label="提现金额"
                width="26%">
              </el-table-column>
              <el-table-column
                prop="cardNo"
                label="所属银行"
                width="16%">
              </el-table-column>
              <el-table-column
                prop="extra.typeDesc"
                label="银行卡号"
                width="26%">
              </el-table-column>
              <el-table-column
                prop="createTime"
                label="提交时间"
                width="26%">
              </el-table-column>
              <el-table-column
                prop="updateTime"
                label="支付时间"
                width="26%">
              </el-table-column>
            </el-table>
        </div>
      </div>
      <div class="pagination-box">
        <pagination-comp
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
      this.getCash()
    },
    methods: {
      getCash (page = 1, pageSize = 10, status = 1) {
        // 页面加载时的过渡效果显示
        this.fullscreenLoading = true
        let _this = this
        let getCashApi = '/api/cash/list?page=' + page + '&pageSize=' + pageSize + '&status=' + status
        _this.$http.get(getCashApi).then((response) => {
          this.fullscreenLoading = false
          response.data.data.list.forEach((item) => {
            item.createTime = moment(item.createTime).format('YYYY-MM-DD')
            item.updateTime = moment(item.updateTime).format('YYYY-MM-DD')
            item.amount = (item.amount/100).toFixed(2)
            // item.student = item.type === 2 ? '是' : '否'
            // if (item.user === null) {
            //   item.name = ''
            // } else {
            //   item.name = item.user.name
            // }
          })
          // console.log(response.data.data.list)
          _this.$set(_this.$data, 'tableData', response.data.data.list)
          _this.$set(_this.pageInfo, 'pages', response.data.data.pages)
          _this.$set(_this.pageInfo, 'total', response.data.data.total)
        }).catch((err) => {
          console.log(err)
        })
      },
      transferConfirm (scope) {
        let _this = this
        let transferApi = '/api/cash/manager/bank/ok?id=' + scope.row.id
        this.$confirm('确定已通过银行卡转账吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.$http.get(transferApi).then(function (response) {
            console.log(response.data)
            if (response.data.code === 0) {
              _this.$message.success('转账成功')
              _this.getCash(_this.pageInfo.currentPage)
            } else {
              _this.$message.error('转账fail')
            }
          }).catch(function (error) {
            console.log(error)
          })
        }).catch(() => {
        })
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
        }
        this.getCash(1, 10, this.pageInfo.status)
      },
      // 点击页码
      listenPage (p) {
        this.getCash(p, 10)
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
  .mask-wrapper{background: rgba(0,0,0,.5);position: fixed;top: 0;left: 0;right: 0;bottom: 0;z-index: 2000;}
  .bill-dialog{position: absolute;top: 15%;left: 40%;width: 20%;background: #fff;border-radius: 2px;}
  .bill-dialog-header{background: #89b2f2;font-size: 14px;color: #fff;padding: 20px 22px 16px 22px;}
  .close-dialog{float: right;}
  .bill-item{padding: 10px 24px 2px 24px;}
  .bill-item:nth-child(even){background: #f7faff;}
  .bill-item li{padding-bottom: 10px;overflow: hidden;}
  .item-left{font-size: 14px;color: #999;float: left;width: 80px;text-align: right;}
  .item-right{font-size: 14px;color: #666;}
</style>
