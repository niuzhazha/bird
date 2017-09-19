<template>
    <section class="financial-management">
      <div class="main-content">
        <div class="title-oprate">
          <nav class="charge-nav">
            <a class="active" href="#">待充值</a>
            <a href="#">已充值</a>
            <a href="#">已取消</a>
          </nav>
        </div>
        <div class="server-count">共<span>1000</span>条</div>
        <el-table
          class="table-list"
          :data="tableData"
          stripe
          style="width: 100%;border: 0;color: #666;">
          <el-table-column
            fixed
            prop="id"
            label="服务商ID"
            width="120">
          </el-table-column>
          <el-table-column
            prop="companyname"
            label="服务商名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="admin"
            label="联系方式"
            width="180">
          </el-table-column>
          <el-table-column
            prop="contact"
            label="账户余额"
            width="180">
          </el-table-column>
          <el-table-column
            prop="date"
            label="充值申请时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="state"
            label="充值金额"
            width="180">
          </el-table-column>
          <el-table-column
            label="操作"
            width="180">
            <template scope="scope">
              <el-button type="text" size="small" @click="financialConfirm">确定</el-button>
              <el-button type="text" size="small" @click="financialRefulse">取消</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-box">
        <pagination-comp 
          :totle-page="100" 
          :current-page="1"
          v-on:jumpPage="listenPage"></pagination-comp>
      </div>
      <!-- <el-pagination
        class="pagination-box"
        layout="prev, pager, next"
        @current-change="currentChange"
        :total="1000">
      </el-pagination> -->
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
        tableData: [{
          id: 1001,
          companyname: '合肥亿佰人力有限公司',
          companysize: '49-999',
          address: '上海市普陀区金沙江路 1518 弄',
          corporation: '陶森',
          admin: '程强',
          contact: '17600078922',
          date: '2016-05-02 12:30',
          state: '1000'
        }, {
          id: 1002,
          companyname: '合肥亿佰人力有限公司',
          companysize: '49-999',
          address: '上海市普陀区金沙江路 1517 弄',
          corporation: '陶森',
          admin: '程强',
          contact: '17600078922',
          date: '2016-05-04 12:30',
          state: '1000'
        }, {
          id: 1003,
          companyname: '合肥亿佰人力有限公司',
          companysize: '49-999',
          address: '上海市普陀区金沙江路 1519 弄',
          corporation: '陶森',
          admin: '程强',
          contact: '17600078922',
          date: '2016-05-01 12:30',
          state: '1000'
        }, {
          id: 1004,
          companyname: '合肥亿佰人力有限公司',
          companysize: '49-999',
          address: '上海市普陀区金沙江路 1516 弄',
          corporation: '陶森',
          admin: '程强',
          contact: '17600078922',
          date: '2016-05-03 12:30',
          state: '1000'
        }]
      }
    },
    methods: {
      toggleAccount (index, rows) {
        console.log(index)
        // 可取到当前条目的信息
        console.log(rows[index].id)
        let state = rows[index].state
        let showText = state === '正常' ? '账号停用后该服务商的所有账号都将被停用，确定要停用吗' : '确定要启用该服务商吗'
        let tipsTextOk = state === '正常' ? '账号已停用!' : '账号启用成功!'
        let tipsTextCancel = state === '正常' ? '已取消停用!' : '已取消启用'
        this.$confirm(showText, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: tipsTextOk
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: tipsTextCancel
          })
        })
      },
      financialConfirm () {
        this.$confirm('确定线下已经收到银行转账且金额正确？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 写退出逻辑
          let _this = this
          let logoutApi = '/api/logout'
          this.$http.get(logoutApi).then(function (response) {
            console.log(response)
            if (response.data.code === 0) {
              _this.$message.success('充值成功')
              _this.$router.push('/financialmanagement')
            }
          }).catch(function (error) {
            console.log(error)
          })
        }).catch(() => {
        })
      },
      financialRefulse () {
        this.$prompt(' ', '取消理由', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
          // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          // inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      },
      listenPage (p) {
        console.log(p)
      }
      // 点击页码
      // currentChange (curPage) {
      //   console.log(curPage)
      // }
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
