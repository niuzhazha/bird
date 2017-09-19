import Vue from 'vue'
import Router from 'vue-router'
import ServerManagement from '@/components/ServerManagement'
import ServerManageModify from '@/components/ServerManageModify'
import ServerManageModifyTwo from '@/components/ServerManageModifyTwo'
// import ServerManageModifyTwo from '@/components/ServerManageModifyTwo_demo'
import ServerManageDetails from '@/components/ServerManageDetails'
import FinancialManagement from '@/components/FinancialManagement'
import FinancialManageBill from '@/components/FinancialManageBill'
import InvoiceManagement from '@/components/InvoiceManagement'
import UserManagement from '@/components/UserManagement'
import UserCertificate from '@/components/UserCertificate'
import PrivilegeManagement from '@/components/PrivilegeManagement'
import Login from '@/components/Login'
import ModifyPassword from '@/components/ModifyPassword'
import privilegemanageModify from '@/components/privilegemanageModify'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: {
        name: 'Login'
      }
    }, {
      path: '/loginpage',
      name: 'Login',
      component: Login
    }, {
      path: '/servermanagement',
      name: 'ServerManagement',
      component: ServerManagement
    }, {
      path: '/servermanagemodify/:type/:id',
      name: 'ServerManageModify',
      component: ServerManageModify
    },
    {
      path: '/servermanagemodifytwo/:type/:id',
      name: 'ServerManageModifyTwo',
      component: ServerManageModifyTwo
    },
    {
      path: '/servermanagedetails',
      name: 'ServerManageDetails',
      component: ServerManageDetails
    }, {
      path: '/financialmanagement',
      name: 'FinancialManagement',
      component: FinancialManagement
    }, {
      path: '/financialmanagebill',
      name: 'FinancialManageBill',
      component: FinancialManageBill
    }, {
      path: '/invoicemanagement',
      name: 'InvoiceManagement',
      component: InvoiceManagement
    }, {
      path: '/usermanagement',
      name: 'UserManagement',
      component: UserManagement
    }, {
      path: '/usercertificate',
      name: 'UserCertificate',
      component: UserCertificate
    }, {
      path: '/privilegemanagement',
      name: 'PrivilegeManagement',
      component: PrivilegeManagement
    }, {
      path: '/modifypassword',
      name: 'ModifyPassword',
      component: ModifyPassword
    }, {
      path: '/privilegemanagemodify',
      name: 'privilegemanageModify',
      component: privilegemanageModify
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})
