<template>
  <el-row class="left-nav">
    <el-col :span="24">
      <el-menu :default-active="'lnav-1'"
        class="el-menu-vertical-demo"
        router
        @open="handleOpen" @close="handleClose" @select="handleSelect">
        
        <template v-for="menu in menus">
          <el-menu-item
            :index="'/lnav-' + menu.id"
            v-if="typeof(menu.children) === 'undefined'"
            :key="menu.id">
            <i class="el-icon-menu"></i>{{menu.menuName}}
          </el-menu-item>

          <el-submenu
            :index="'/lnav-' + menu.id"
            :key="menu.id"
            v-else>
            <template slot="title">
              <i class="el-icon-menu"></i>{{menu.menuName}}
            </template>
            <el-menu-item
              :index="'/lnav-' + submenu.id"
              v-for="submenu in menu.children"
              :key="submenu.id">{{submenu.menuName}}
            </el-menu-item>
          </el-submenu>
        </template>
        
        <!-- <el-submenu index="/financialmanagement">
          <template slot="title"><i class="el-icon-message"></i>财务管理</template>
          <el-menu-item index="/financialmanagement">服务商提交管理</el-menu-item>
          <el-menu-item index="/invoicemanagement">发票管理</el-menu-item>
        </el-submenu>
        <el-menu-item index="/usermanagement"><i class="el-icon-menu"></i>用户管理</el-menu-item>
        <el-menu-item index="/privilegemanagement"><i class="el-icon-setting"></i>权限管理</el-menu-item> -->
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      menus: []
    }
  },
  mounted () {
    let _this = this
    let menuApi = '/api/menu'
    this.$http.get(menuApi).then(function (response) {
      // console.log(response)
      if (response.data.code === 0) {
        _this.$set(_this.$data, 'menus', response.data.data)
      }
    }).catch(function (error) {
      console.log(error)
    })
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect (index) {
      console.log(index)
    }
  }
}
</script>

<style scoped>
  .left-nav {
    position: fixed;
    left: 0;
    top: 55px;
    width: 200px;
    height: 100%;
    background-color: #FFF;
  }
  .el-menu-vertical-demo {
    padding-top: 20px;
    background-color: #FFF;
  }
</style>
