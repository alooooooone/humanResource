import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import HireManage from '@/components/HireManage'
import HumanManage from '@/components/HumanManage'
import CheckOnWorkManage from '@/components/CheckOnWorkManage'
import SalaryManage from '@/components/SalaryManage'
import TrainManage from '@/components/TrainManage'
import SystemSetting from '@/components/SystemSetting'
import HrInfo from '@/components/function/hire/HrInfo'
import HrResume from '@/components/function/hire/HrResume'
import HrJob from '@/components/function/hire/HrJob'
import HrArrange from '@/components/function/hire/HrArrange'
import Login from '@/components/login'
import StaffInfo	from	'@/components/function/human/StaffInfo'
import Hr from '@/components/Hr'

Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
    {
    	path: '/welcome',
    	name: 'Welcome',
    	component: Welcome,
    	children: [{
    		path: 'hr',
    		name: 'HireManage',
    		component: HireManage,
    		children: [
    			{path: 'hrinfo',name: 'HrInfo',component: HrInfo},
    			{path: 'resume',name: 'HrResume',component: HrResume},
    			{path: 'job',name: 'HrJob',component: HrJob},
    			{path: 'total',name: 'HrArrange',component: HrArrange}
    		]
    	},{
    		path: 'human',
    		name: 'HumanManage',
    		component: HumanManage,
    		children: [{path:'staffinfo',name: 'StaffInfo',component: StaffInfo}]
    	},{
    		path: 'check',
    		name: 'CheckOnWorkManage',
    		component: CheckOnWorkManage
    	},{
    		path: 'train',
    		name: 'TrainManage',
    		component: TrainManage
    	},{
    		path: 'salary',
    		name: 'SalaryManage',
    		component: SalaryManage
    	},{
    		path: 'setting',
    		name: 'SystemSetting',
    		component: SystemSetting
    	}]
    },
    {
    	path: '/',
   		name: 'Login',
   		component: Login
   	},
   	{
   		path: '/hr',
   		name: 'Hr',
   		component: Hr
   	}
  ]
})
