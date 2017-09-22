<template>
    <section class="user-management">
      <div class="main-content">
        <div class="title-oprate">
          <span>用户管理</span>
        </div>
        <div class="server-count">共<span>1000</span>个用户</div>
        <el-table
          class="table-list"
          :data="tableData"
          stripe
          style="width: 100%;border: 0;color: #666;">
          <el-table-column
            fixed
            prop="id"
            label="ID"
            width="70">
          </el-table-column>
          <el-table-column
            prop="companyname"
            label="姓名"
            width="80">
          </el-table-column>
          <el-table-column
            prop="companysize"
            label="性别"
            width="95">
          </el-table-column>
          <el-table-column
            prop="address"
            label="出生日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="corporation"
            label="是否学生"
            width="95">
          </el-table-column>
          <el-table-column
            prop="admin"
            label="认证状态"
            width="95">
          </el-table-column>
          <el-table-column
            prop="contact"
            label="信用分"
            width="140">
          </el-table-column>
          <el-table-column
            prop="date"
            label="评价"
            width="160">
          </el-table-column>
          <el-table-column
            prop="state"
            label="注册时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="state"
            label="手机号"
            width="80">
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
          companyname: '舒克',
          companysize: '49-999',
          address: '上海市普陀区金沙江路 1518 弄',
          corporation: '陶森',
          admin: '程强',
          contact: '17600078922',
          date: '2016-05-02 12:30',
          state: '正常'
        }, {
          id: 1002,
          companyname: '舒克',
          companysize: '49-999',
          address: '上海市普陀区金沙江路 1517 弄',
          corporation: '陶森',
          admin: '程强',
          contact: '17600078922',
          date: '2016-05-04 12:30',
          state: '已停用'
        }, {
          id: 1003,
          companyname: '舒克',
          companysize: '49-999',
          address: '上海市普陀区金沙江路 1519 弄',
          corporation: '陶森',
          admin: '程强',
          contact: '17600078922',
          date: '2016-05-01 12:30',
          state: '已停用'
        }, {
          id: 1004,
          companyname: '舒克',
          companysize: '49-999',
          address: '上海市普陀区金沙江路 1516 弄',
          corporation: '陶森',
          admin: '程强',
          contact: '17600078922',
          date: '2016-05-03 12:30',
          state: '正常'
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
  .user-management {
    
  }
  .server-list {color: #999;}
  .el-table {
    border: 0;
  }
  /*.th {color: #999;}*/
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
