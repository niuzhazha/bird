<template>
    <section class="privilege-management">
    	<div class="mian-content">
    		<div class="title-oprate">
    			<span>权限管理</span>
          <router-link :to="{ path: 'privilegemanagemodify' }">
    			<el-button class="fr" type="primary" size="mini">添加账号</el-button>
          </router-link>
    		</div>
    		<div class="server-count">共<span>{{ pageInfo.total }}</span>个服务商</div>
    		<el-table
    			class="table-list"
			    :data="tableData"
			    stripe
			    style="width: 100%;border: 0;color: #666;">
			    <el-table-column
			      prop="name"
			      label="姓名"
			      width="10%">
			    </el-table-column>
			    <el-table-column
			      prop="department"
			      label="部门"
			      width="16%">
			    </el-table-column>
			    <el-table-column
			      prop="title"
			      label="职位"
			      width="16%">
			    </el-table-column>
			    <el-table-column
			      prop="mobile"
			      label="联系方式"
			      width="24%">
			    </el-table-column>
			    <el-table-column
			      prop="openAuthList.name"
			      label="权限"
			      width="30%">
			    </el-table-column>
			    <el-table-column
			      prop="createTime"
			      label="创建时间"
			      width="20%">
			    </el-table-column>
			    <el-table-column
			      prop="state"
			      label="状态"
			      width="10%">
			    </el-table-column>
			    <el-table-column
			      label="操作"
			      width="20%">
			      <template scope="scope">
			        <el-button type="text" size="small">修改</el-button>
			        <!-- <el-button type="text" size="small" @click="togglePrivilege(scope.$index, tableData)">停用</el-button> -->
              <el-button type="text" size="small"
                 @click.native.prevent="togglePrivilege(scope, tableData)"
                 v-loading.fullscreen.lock="fullscreenLoading">
                 停用
                <!-- {{scope.row.status === 0 ? '账号停用' : '账号启用'}} -->
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
        fullscreenLoading: false,
        tableData: [],
        pageInfo: {
          // 记录当前页码
          currentPage: 1
        }
      }
    },
    mounted () {
      this.getPrivilege()
    },
    methods: {
      // 初始化页面数据
      getPrivilege (page = 1, pageSize = 10) {
        // 页面加载时的过渡效果显示
        this.fullscreenLoading = true
        let _this = this
        let providerApi = '/api/centerAuth/list?page=' + page + '&pageSize=' + pageSize
        _this.$http.get(providerApi).then((response) => {
          this.fullscreenLoading = false
          response.data.data.list.forEach((item) => {
            // console.log(item)
            item.state = item.status === 1 ? '已停用' : '正常'
            item.addTime = moment(item.createTime).format('YYYY-MM-DD')
            if (item.name === null) {
              item.name = ''
            } else {
              item.name = item.name
              // item.contact = item.openUser.mobile
            }
          })
          _this.$set(_this.$data, 'tableData', response.data.data.list)
          console.log(_this.tableData)
          _this.$set(_this.pageInfo, 'pages', response.data.data.pages)
          _this.$set(_this.pageInfo, 'total', response.data.data.total)
        }).catch((err) => {
          console.log(err)
        })
      },
      // togglePrivilege (index, rows) {
      //   console.log(index)
      //   // 可取到当前条目的信息
      //   console.log(rows[index].id)
      //   let state = rows[index].state
      //   let tipsTextOk = state === '正常' ? '账号已停用!' : '账号启用成功!'
      //   let tipsTextCancel = state === '正常' ? '已取消停用!' : '已取消启用'
      //   this.$confirm('确定该操作吗？', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     this.$message({
      //       type: 'success',
      //       message: tipsTextOk
      //     })
      //   }).catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: tipsTextCancel
      //     })
      //   })
      // },
      togglePrivilege (scope, rows) {
        // 可取到当前条目的信息
        let _this = this
        let status = scope.row.status
        console.log(status)

        // 提示语
        let tipsTextOk = '账号已停用!'
        let tipsTextCancel = '已取消停用!'

        // 要变成什么状态
        let changeStatus = status === 0 ? 1 : 0

        // 启用、停用接口地址
        let togglePrivilegeApi = '/api/centerAuth/updateStatus?id=' + scope.row.id + '&status=' + changeStatus
        this.$confirm('确定该操作吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 页面加载时的过渡效果显示
          this.fullscreenLoading = true
          // 调用停用、启用接口
          _this.$http.get(togglePrivilegeApi).then((response) => {
            // 页面加载时的过渡效果隐藏
            this.fullscreenLoading = false
            if (response.data.code === 0) {
              // 修改成功后，重新渲染页面。
              _this.getPrivilege(this.pageInfo.currentPage)
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
      },
      logout () {
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
              _this.$message.success('退出成功')
              _this.$router.push('/loginpage')
            }
          }).catch(function (error) {
            console.log(error)
          })
        }).catch(() => {
        })
      },
      // 点击页码
      listenPage (p) {
        this.getPrivilege(p, 10)
        // 翻页时，记录翻到了第几页
        this.$set(this.pageInfo, 'currentPage', p)
        // localStorage.setItem('currentPage', p)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	.privilege-management {

	}
	.mian-content {
		background-color: #FFF;
	}
  .el-table__header,.el-table__body {width: 100%!important;}
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
  .el-table td, .el-table th.is-leaf {border-bottom: 1px solid #fff!important;}
  td {border-bottom: 0;}
  /*.el-table td {border-bottom: none!important;}*/
  .el-table td, .el-table th.is-leaf {border-bottom: 1px solid #fff!important;}
  .el-pager li {border-radius: 50%!important;margin: 0 5px;}
</style>
