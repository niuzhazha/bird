<template>
    <section class="server-list">
      <div class="main-content">
        <div class="title-oprate">
          <span>服务商管理</span>
          <!-- 路由跳转，携带type参数 -->
          <router-link :to="{ name: 'ServerManageModify', params: { type: 'add', id: 0 } }">
            <el-button class="fr" style="color:#fff;font-size:14px;" type="primary" size="mini">添加客户</el-button>   
          </router-link>
        </div>
        <div class="server-count">共<span>{{ pageInfo.total }}</span>个服务商</div>
        <el-table
          class="table-list"
          :data="tableData"
          stripe
          style="width: 100%;border: 0;color: #666;">
          <el-table-column
            prop="id"
            label="ID"
            width="70">
          </el-table-column>
          <el-table-column
            prop="companyName"
            label="公司名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="scale"
            label="公司规模"
            width="95">
          </el-table-column>
          <el-table-column
            prop="addr"
            label="公司地址"
            width="180">
          </el-table-column>
          <el-table-column
            prop="legalPerson"
            label="公司法人"
            width="95">
          </el-table-column>
          <el-table-column
            prop="admin"
            label="管理员"
            width="95">
          </el-table-column>
          <el-table-column
            prop="contact"
            label="联系方式"
            width="140">
          </el-table-column>
          <el-table-column
            prop="addTime"
            label="添加时间"
            width="160">
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            width="80">
          </el-table-column>
          <el-table-column
            label="操作"
            width="180">
            <template scope="scope">
              <router-link :to="{ path: 'servermanagedetails'}">
                <el-button type="text" size="small">查看详情</el-button>
              </router-link>
              <el-button type="text" size="small"
                 @click.native.prevent="toggleAccount(scope, tableData)">
                {{tableData[scope.$index].state === '正常' ? '账号停用' : '账号启用'}}
              </el-button>
            </template>
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
        tableData: [],
        pageInfo: {}
      }
    },
    mounted () {
      this.getProvider()
    },
    methods: {
      // 初始化页面数据
      getProvider (page = 1, pageSize = 10) {
        let _this = this
        let providerApi = 'api/provider/list?page=' + page + '&pageSize=' + pageSize
        _this.$http.get(providerApi).then((response) => {
          response.data.data.list.forEach((item) => {
            item.addTime = moment(item.createTime).format('YYYY-MM-DD')
          })
          _this.$set(_this.$data, 'tableData', response.data.data.list)
          _this.$set(_this.pageInfo, 'pages', response.data.data.pages)
          _this.$set(_this.pageInfo, 'total', response.data.data.total)
        }).catch((err) => {
          console.log(err)
        })
      },
      toggleAccount (scope, rows) {
        // 可取到当前条目的信息
        // let _this = this
        // 启用、停用接口地址
        // let toggleAccountApi = 'api/provider/toggleAccount'
        console.log(scope)
        let state = scope.row.state
        let showText = state === '正常' ? '账号停用后该服务商的所有账号都将被停用，确定要停用吗' : '确定要启用该服务商吗'
        let tipsTextOk = state === '正常' ? '账号已停用!' : '账号启用成功!'
        let tipsTextCancel = state === '正常' ? '已取消停用!' : '已取消启用'
        this.$confirm(showText, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 调用停用、启用接口
          // _this.$http.post(toggleAccountApi, {
          //   id: scope.id
          // }).then((response) => {
          //   response.data.data.list.forEach((item) => {
          //     item.addTime = moment(item.createTime).format('YYYY-MM-DD')
          //   })
          //   _this.$set(_this.$data, 'tableData', response.data.data.list)
          //   _this.$set(_this.pageInfo, 'total', response.data.data.pages)
          // }).catch((err) => {
          //   console.log(err)
          // })

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
      // 点击页码
      listenPage (p) {
        this.getProvider(p, 10)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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
