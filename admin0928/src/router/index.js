import Vue from 'vue'
import Router from 'vue-router'
import ServerManagement from '@/components/ServerManagement'
import ServerManageModify from '@/components/ServerManageModify'
import ServerManageModifyTwo from '@/components/ServerManageModifyTwo'
import ServerManageModifyTwoDemo from '@/components/ServerManageModifyTwo_demo'
import ServerManageDetails from '@/components/ServerManageDetails'
import FinancialManagement from '@/components/FinancialManagement'
import FinancialManageBill from '@/components/FinancialManageBill'
import FinancialManageCash from '@/components/FinancialManageCash'
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
      path: '/lnav-1',
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
      path: '/ServerManageModifyTwoDemo',
      name: 'ServerManageModifyTwoDemo',
      component: ServerManageModifyTwoDemo
    },
    {
      path: '/servermanagedetails',
      name: 'ServerManageDetails',
      component: ServerManageDetails
    }, {
      path: '/lnav-10',
      name: 'FinancialManagement',
      component: FinancialManagement
    },
    {
      path: '/lnav-12',
      name: 'FinancialManageCash',
      component: FinancialManageCash
    }, {
      path: '/lnav-11',
      name: 'FinancialManageBill',
      component: FinancialManageBill
    }, {
      path: '/invoicemanagement',
      name: 'InvoiceManagement',
      component: InvoiceManagement
    }, {
      path: '/lnav-16',
      name: 'UserManagement',
      component: UserManagement
    }, {
      path: '/lnav-17',
      name: 'UserCertificate',
      component: UserCertificate
    }, {
      path: '/lnav-4',
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
