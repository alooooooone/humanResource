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
import addNewStaff from '@/components/function/human/addNewStaff'
import allUser from '@/components/function/setting/allUser'
import changePs from '@/components/function/setting/changepassword'
import talent from '@/components/function/hire/talent'
import trainInfo from '@/components/function/train/trainInfo'
import staffPage from '@/components/staffPage/staffPage'
import personalInfo from '@/components/staffPage/personalInfo'
import personalTrain from '@/components/staffPage/personalTrain'
import safeSetting from '@/components/staffPage/safeSetting'
import allTrainInfo from '@/components/function/train/allTrainInfo'
import checkin from '@/components/staffPage/checkin'
import checkManage from '@/components/function/check/checkManage'
import staffCheck from '@/components/function/check/staffCheck'
import salaryManage from '@/components/function/salary/salaryManage'

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
          {path: 'arrange',name: 'HrArrange',component: HrArrange},
    			{path: 'talent',name: 'talent',component: talent}
    		]
    	},{
    		path: 'human',
    		name: 'HumanManage',
    		component: HumanManage,
    		children: [
          {path:'staffinfo',name: 'StaffInfo',component: StaffInfo},
          {path:'addnewstaff',name: 'addNewStaff',component: addNewStaff}
        ]
    	},{
    		path: 'check',
    		name: 'CheckOnWorkManage',
    		component: CheckOnWorkManage,
        children: [
          {path:'checkManage',name: 'checkManage',component: checkManage},
          {path:'staffCheck',name: 'staffCheck',component: staffCheck}
        ]
    	},{
    		path: 'train',
    		name: 'TrainManage',
    		component: TrainManage,
        children: [
          {path:'traininfo',name: 'trainInfo',component: trainInfo},
          {path:'alltraininfo',name: 'allTrainInfo',component: allTrainInfo}
        ]
    	},{
    		path: 'salary',
    		name: 'SalaryManage',
    		component: SalaryManage,
        children: [
          {path:'salaryManage',name: 'salaryManage',component: salaryManage}
        ]
    	},{
    		path: 'setting',
    		name: 'SystemSetting',
    		component: SystemSetting,
        children: [
          {path:'alluser',name:'AllUser',component:allUser},
          {path:'changeps',name:'changePS',component:changePs}
        ]
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
   	},
    {
      path: '/staff',
      name: 'staff',
      component: staffPage,
      children: [
        {path:'personalInfo',name:'personalInfo',component:personalInfo},
        {path:'personalTrain',name:'personalTrain',component:personalTrain},
        {path:'safeSetting',name:'safeSetting',component:safeSetting},
        {path:'personalCheck',name:'checkin',component:checkin},
      ]
    }
  ]
})
