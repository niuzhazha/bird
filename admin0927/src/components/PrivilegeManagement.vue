<template>
    <section class="privilege-management">
    	<div class="mian-content">
    		<div class="title-oprate">
    			<span>权限管理</span>
          <router-link :to="{ path: 'privilegemanagemodify' }">
    			<el-button class="fr" type="primary" size="mini">添加账号</el-button>
          </router-link>
    		</div>
    		<div class="server-count">共<span>10</span>个服务商</div>
    		<el-table
    			class="table-list"
			    :data="tableData"
			    stripe
			    style="width: 100%">
			    <el-table-column
			      prop="name"
			      label="姓名"
			      width="70">
			    </el-table-column>
			    <el-table-column
			      prop="companyname"
			      label="部门"
			      width="120">
			    </el-table-column>
			    <el-table-column
			      prop="job"
			      label="职位"
			      width="95">
			    </el-table-column>
			    <el-table-column
			      prop="tele"
			      label="联系方式"
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="root"
			      label="权限"
			      width="140">
			    </el-table-column>
			    <el-table-column
			      prop="createtime"
			      label="创建时间"
			      width="180">
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
			        <el-button type="text" size="small">修改</el-button>
			        <el-button type="text" size="small" @click="togglePrivilege(scope.$index, tableData)">停用</el-button>
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
          name: '舒克',
          companyname: '产品部',
          job: '产品经理',
          tele: '17732843325',
          root: '服务商管理',
          createtime: '2017-9-03 13:48',
          contact: '17600078922',
          state: '正常'
        }, {
          name: '舒克',
          companyname: '产品部',
          job: '产品经理',
          tele: '17732843325',
          root: '服务商管理',
          createtime: '2017-9-03 13:48',
          contact: '17600078922',
          state: '正常'
        }, {
          name: '舒克',
          companyname: '产品部',
          job: '产品经理',
          tele: '17732843325',
          root: '服务商管理',
          createtime: '2017-9-03 13:48',
          contact: '17600078922',
          state: '正常'
        }, {
          name: '舒克',
          companyname: '产品部',
          job: '产品经理',
          tele: '17732843325',
          root: '服务商管理',
          createtime: '2017-9-03 13:48',
          contact: '17600078922',
          state: '正常'
        }]
      }
    },
    methods: {
      togglePrivilege (index, rows) {
        console.log(index)
        // 可取到当前条目的信息
        console.log(rows[index].id)
        let state = rows[index].state
        let tipsTextOk = state === '正常' ? '账号已停用!' : '账号启用成功!'
        let tipsTextCancel = state === '正常' ? '已取消停用!' : '已取消启用'
        this.$confirm('确定该操作吗？', '提示', {
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
      // currentChange (curPage) {
      //   console.log(curPage)
      // }
      listenPage (p) {
        console.log(p)
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
