<template>
  <header class="g-header">
  	<img class="inner-logo" src="../../assets/images/birdwork-logo-inner.png">
  	<a href="javascript:;" class="role-box">
  		<span class="role-icon"></span>
  		<span class="role-text">管理员</span>
  		<span class="el-icon-arrow-down"></span>
  		<nav>
  			<router-link
  				class="nav-item" 
  				:to="{ path: 'modifypassword' }">
  				<span class="icon password-icon"></span>
  				<span class="nav-text">修改密码</span>
  			</router-link>
  			<a class="nav-item" href="javascript:;" @click="logout">
  				<span class="icon logout-icon"></span>
  				<span class="nav-text">退出</span>
  			</a>
  		</nav>
  	</a>
  </header>
</template>
<script>
  export default {
    data () {
      return {
        navToggle: false,
        dialogVisible: false
      }
    },
    methods: {
      logout () {
        this.$confirm('确定要退出吗？', '提示', {
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
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.g-header {
		height: 54px;
		width: 100%;
		border-bottom: 1px solid #dcdcdc;
		background-color: #FFF;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9;
	}
	.inner-logo {
		margin-top: 10px;
		margin-left: 24px;
	}
	.role-box {
		float: right;
		min-width: 80px;
		height: 25px;
		border-radius: 25px;
		background-color: #f2f2f2;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 10px;
		margin-top: 14px;
		margin-right: 38px;
		position: relative;
	}
	.role-icon {
		display: inline-block;
		width: 11px;
		height: 14px;
		vertical-align: middle;
		background: url('../../assets/images/role-icon.png') center center no-repeat;
	}
	.el-icon-arrow-down {
		color: #999;
	}
	.role-text {
		font-size: 14px;
		color: #999;
		margin: 0 10px;
	}
	nav { 
		display: none;
		/*display: inline-block;*/
		width: 160px;
		position: absolute; 
		top: 40px;
		right: 0;
		background-color: #FFF;
		border: 1px solid #eee;
		position: absolute;
	}
	nav:before, nav:after {
		content: " ";
		display: inline-block;
		width: 0;
    height: 0;
    position: absolute;
		right: 30px;
    border-left: 11px solid transparent;
    border-right: 11px solid transparent;
	}
	nav:before { 
    border-bottom: 16px solid #eee;
		top: -17px;
	}
	nav:after { 
    border-bottom: 16px solid #FFF;
    top: -16px;
	}
	nav a {
		display: inline-block;
		padding: 20px 40px;
		width: 80px;
		font-size: 0;
	}
	nav a .nav-text {
		font-size: 14px;
		color: #999;
	}
	nav a:first-child {
		border-bottom: 1px solid #eee;
	}
	nav a .icon {
		display: inline-block;
		font-size: 0;
		vertical-align: -1px;
		margin-right: 10px;
	}
	.role-box:hover nav {
		display: inline-block;
	}
	nav a:hover {
		background-color: #eee;
	}
	.password-icon {
		background: url('../../assets/images/lock-grey.png') center center no-repeat;
		width: 14px; height: 14px;
		background-size: 12px 14px;
	}
	.logout-icon {
		background: url('../../assets/images/logout-icon.png') center center no-repeat;
		width: 14px; height: 14px;
		background-size: 12px 14px;
	}
</style>
