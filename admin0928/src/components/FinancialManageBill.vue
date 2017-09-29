<template>
    <section class="financial-management">
      <div class="main-content">
        <div class="title-oprate">
          <nav class="charge-nav">
            <a :class="{'active': toggleFlag === 0}" href="javascript:;" @click="changeNav(0)">待处理</a>
            <a :class="{'active': toggleFlag === 1}" href="javascript:;" @click="changeNav(1)">已处理</a>
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
                prop="createTime"
                label="申请时间"
                width="30%">
              </el-table-column>
              <el-table-column
                prop="extra.companyName"
                label="公司名称"
                width="20%">
              </el-table-column>
              <el-table-column
                prop="extra.taxNo"
                label="公司税号"
                width="26%">
              </el-table-column>
              <el-table-column
                prop="amount"
                label="开票金额"
                width="16%">
              </el-table-column>
              <el-table-column
                prop="extra.typeDesc"
                label="发票类型"
                width="26%">
              </el-table-column>
              <el-table-column
                prop="info.name"
                label="收件人"
                width="16%">
              </el-table-column>
              <el-table-column
                prop="info.mobile"
                label="联系方式"
                width="25%">
              </el-table-column>
              <el-table-column
                label="操作"
                width="20%">
                <template scope="scope">
                  <el-button type="text" size="small" @click="delivepost(scope, 4)">寄出</el-button>
                  <el-button type="text" size="small" @click="showBillDialog(scope)">查看详情</el-button>
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
              prop="createTime"
              label="申请时间"
              width="30%">
            </el-table-column>
            <el-table-column
              prop="expressTime"
              label="处理时间"
              width="20%">
            </el-table-column>
            <el-table-column
              prop="extra.companyName"
              label="公司名称"
              width="20%">
            </el-table-column>
            <el-table-column
              prop="extra.typeDesc"
              label="发票类型"
              width="26%">
            </el-table-column>
            <el-table-column
              prop="amount"
              label="开票金额"
              width="16%">
            </el-table-column>
            <el-table-column
              prop="expressNo"
              label="运单号"
              width="16%">
            </el-table-column>
            <el-table-column
              prop="info.name"
              label="操作人"
              width="25%">
            </el-table-column>
            <el-table-column
              label="操作"
              width="20%">
              <template scope="scope">
                <el-button type="text" size="small" @click="showBillDialog(scope)">查看详情</el-button>
              </template>
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
      <el-dialog title="发票管理详情" :visible.sync="billVisible.toggle">
        <ul class="bill-item">
            <li>
              <span class="item-left">申请时间：</span>
              <span class="item-right">{{ billVisible.createTime }}</span>
            </li>
            <li>
              <span class="item-left">开票金额：</span>
              <span class="item-right">{{ (billVisible.amount/100).toFixed(2) }}</span>
            </li>
            <li>
              <span class="item-left">税费：</span>
              <span class="item-right">{{ billVisible.taxAmount }}</span>
            </li>
        </ul>
        <!-- <ul class="bill-item">
          <li>
            <span class="item-left">发票类型：</span>
            <span class="item-right" v-text="billVisible.extra.typeDesc"></span>
          </li>
          <li>
            <span class="item-left">公司全称：</span>
            <span class="item-right" v-text="billVisible.extra.companyName"></span>
          </li>
          <li>
            <span class="item-left">企业税号：</span>
            <span class="item-right" v-text="billVisible.extra.taxNo"></span>
          </li>
          <li>
            <span class="item-left">公司地址：</span>
            <span class="item-right" v-text="billVisible.extra.companyAddr"></span>
          </li>
          <li>
            <span class="item-left">企业电话：</span>
            <span class="item-right" v-text="billVisible.extra.telephone"></span>
          </li><li>
            <span class="item-left">开户行：</span>
            <span class="item-right" v-text="billVisible.extra.bankName"></span>
          </li>
          <li>
            <span class="item-left">银行账号：</span>
            <span class="item-right" v-text="billVisible.extra.bankNo"></span>
          </li>
        </ul>
        <ul class="bill-item">
          <li>
            <span class="item-left">收件人：</span>
            <span class="item-right" v-text="billVisible.info.name"></span>
          </li>
          <li>
            <span class="item-left">联系方式：</span>
            <span class="item-right" v-text="billVisible.info.mobile">17732843325</span>
          </li>
          <li>
            <span class="item-left">收件地址：</span>
            <span class="item-right" v-text="billVisible.info.addr"></span>
          </li>
          <li>
            <span class="item-left">邮编：</span>
            <span class="item-right" v-text="billVisible.info.zipCode"></span>
          </li>
        </ul> -->
      </el-dialog>
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
        // billdialog: false,
        // billVisible: false,
        toggleFlag: 0,
        tableData: [],
        pageInfo: {
          // 记录当前页码
          currentPage: 1,
          status: 1
        },
        billVisible: {
          toggle: false,
          createTime: '',
          amount: '',
          taxAmount: '',
          extra: [],
          info: []
        }
      }
    },
    mounted () {
      this.getOpenBill()
    },
    methods: {
      getOpenBill (page = 1, pageSize = 10, status = 3) {
        // 页面加载时的过渡效果显示
        this.fullscreenLoading = true
        let _this = this
        let openbillApi = '/api/openBill/billListByStatus?page=' + page + '&pageSize=' + pageSize + '&status=' + status
        _this.$http.get(openbillApi).then((response) => {
          this.fullscreenLoading = false
          // response.data.data.forEach((item) => {
            // item.createTime = moment(item.createTime).format('YYYY-MM-DD')
            // item.student = item.type === 2 ? '是' : '否'
            // if (item.user === null) {
            //   item.name = ''
            // } else {
            //   item.name = item.user.name
            // }
          // })
          // console.log(response.data.data.list)
          _this.$set(_this.$data, 'tableData', response.data.data.list)
          _this.$set(_this.pageInfo, 'pages', response.data.data.pages)
          _this.$set(_this.pageInfo, 'total', response.data.data.total)
        }).catch((err) => {
          console.log(err)
        })
      },
      delivepost (scope, type) {
        let _this = this
        this.$prompt(' ', '运单号', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          if (value != null) {
            _this.$set(_this.tableData, 'expressNo', value)
            // console.log(expressNo)
            // console.log(scope.row)
            let sendBillApi = '/api/openBill/sendHandle?id=' + scope.row.id + '&status=' + type +'&expressNo=' + value
            _this.$http.get(sendBillApi).then(function (response) {
            if (response.data.code === 0) {
              console.log(sendBillApi)
              _this.$message.success('寄出')
              _this.getOpenBill(_this.pageInfo.currentPage)
            }
          })
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
        this.getOpenBill(1, 10, this.pageInfo.status)
      },
      showBillDialog (scope) {
        let _this = this
        // console.log(typeof(scope.row.id))
        let billDetailApi = '/api/openBill/getBillById?id=' + scope.row.id
        _this.$http.get(billDetailApi).then((response) => {
          _this.$set(_this.billVisible, 'toggle', true)
          console.log(2,response.data.data)
          console.log(3, _this.$data)
        //   this.$set(this.bigImg, 'up', pic1)
        // this.$set(this.bigImg, 'down', pic2)
          _this.$set(_this.$data, 'billVisible', response.data.data)
          console.log(1,_this.billVisible)
        }).catch((err) => {
          console.log(err)
        })
      },
      hidePicDialog () {
        this.$set(this.billVisible, 'toggle', false)
      },
      // 点击页码
      listenPage (p) {
        this.getOpenBill(p, 10)
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
