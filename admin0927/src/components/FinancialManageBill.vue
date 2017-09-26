<template>
    <section class="financial-management">
      <div class="main-content">
        <div class="title-oprate">
          <nav class="charge-nav">
            <a class="active" href="#">待充值</a>
            <a href="#">已处理</a>
          </nav>
        </div>
        <div class="server-count">共<span>1000</span>条</div>
        <el-table
          class="table-list"
          :data="tableData"
          stripe
          style="width: 100%;border: 0;color: #666;">
          <el-table-column
            prop="id"
            label="申请时间"
            width="120">
          </el-table-column>
          <el-table-column
            prop="companyname"
            label="发票抬头"
            width="180">
          </el-table-column>
          <el-table-column
            prop="taxnum"
            label="企业税号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="contact"
            label="开票金额"
            width="180">
          </el-table-column>
          <el-table-column
            prop="getperson"
            label="收件人"
            width="180">
          </el-table-column>
          <el-table-column
            prop="state"
            label="联系方式"
            width="180">
          </el-table-column>
          <el-table-column
            label="操作"
            width="180">
            <template scope="scope">
              <el-button type="text" size="small" @click="delivepost">寄出</el-button>
              <el-button type="text" size="small" @click="showBillDialog">查看详情</el-button>
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
      <div class="mask-wrapper" v-show="billdialog">
        <div class="bill-dialog" @click="hideBillDialog">
          <div class="bill-dialog-header">
            <span>发票管理详情</span>
            <a class="close-dialog" href="javascript:;" @cilck=""><img src="../assets/images/close-dialog.png"></a>
          </div>
          <ul class="bill-item">
            <li>
              <span class="item-left">处理时间：</span>
              <span class="item-right">2017-08-22 13:00:23</span>
            </li>
            <li>
              <span class="item-left">操作人：</span>
              <span class="item-right">姜灵通</span>
            </li>
            <li>
              <span class="item-left">运单号：</span>
              <span class="item-right">487588867655554</span>
            </li>
          </ul>
          <ul class="bill-item">
            <li>
              <span class="item-left">收件人：</span>
              <span class="item-right">舒克</span>
            </li>
            <li>
              <span class="item-left">联系方式：</span>
              <span class="item-right">17732843325</span>
            </li>
            <li>
              <span class="item-left">收货地址：</span>
              <span class="item-right">北京市朝阳望京soho</span>
            </li>
            <li>
              <span class="item-left">邮编：</span>
              <span class="item-right">052460</span>
            </li>
          </ul>
        </div>
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
        billdialog: false,
        tableData: [{
          id: 1001,
          companyname: '合肥亿佰人力有限公司',
          taxnum: '49-999',
          address: '上海市普陀区金沙江路 1518 弄',
          corporation: '陶森',
          admin: '程强',
          contact: '17600078922',
          getperson: '舒克',
          state: '1000'
        }, {
          id: 1002,
          companyname: '合肥亿佰人力有限公司',
          taxnum: '49-999',
          address: '上海市普陀区金沙江路 1517 弄',
          corporation: '陶森',
          admin: '程强',
          contact: '17600078922',
          getperson: '舒克',
          state: '1000'
        }, {
          id: 1003,
          companyname: '合肥亿佰人力有限公司',
          taxnum: '49-999',
          address: '上海市普陀区金沙江路 1519 弄',
          corporation: '陶森',
          admin: '程强',
          contact: '17600078922',
          getperson: '舒克',
          state: '1000'
        }, {
          id: 1004,
          companyname: '合肥亿佰人力有限公司',
          taxnum: '49-999',
          address: '上海市普陀区金沙江路 1516 弄',
          corporation: '陶森',
          admin: '程强',
          contact: '17600078922',
          getperson: '舒克',
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
      showBillDialog () {
        if (this.billdialog === false) {
          this.billdialog = true
        } else {
          // this.billdialog = !this.billdialog
          this.billdialog = false
        }
      },
      hideBillDialog () {
        if (this.billdialog === true) {
          this.billdialog = false
        } else {
          this.billdialog = true
        }
      },
      // financialConfirm () {
      //   this.$confirm('确定线下已经收到银行转账且金额正确？', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     // 写退出逻辑
      //     let _this = this
      //     let logoutApi = '/api/logout'
      //     this.$http.get(logoutApi).then(function (response) {
      //       console.log(response)
      //       if (response.data.code === 0) {
      //         _this.$message.success('充值成功')
      //         // _this.$router.push('/financialmanagement')
      //       }
      //     }).catch(function (error) {
      //       console.log(error)
      //     })
      //   }).catch(() => {
      //   })
      // },
      delivepost () {
        this.$prompt(' ', '运单号', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          let _this = this
          if (value) {
            _this.$message.success('已寄出')
          } else {
            _this.$message.error('运单号为空')
          }
          // this.$message({
          //   type: 'success',
          //   message: ': ' + value
          // })
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
  .mask-wrapper{background: rgba(0,0,0,.5);position: fixed;top: 0;left: 0;right: 0;bottom: 0;z-index: 2000;}
  .bill-dialog{position: absolute;top: 15%;left: 40%;width: 20%;background: #fff;border-radius: 2px;}
  .bill-dialog-header{background: #89b2f2;font-size: 14px;color: #fff;padding: 20px 22px 16px 22px;}
  .close-dialog{float: right;}
  .bill-item{padding: 30px 24px 2px 24px;}
  .bill-item:nth-child(odd){background: #f7faff;}
  .bill-item li{padding-bottom: 22px;}
  .item-left{font-size: 14px;color: #999;float: left;width: 80px;text-align: right;}
  .item-right{font-size: 14px;color: #666;}
</style>
