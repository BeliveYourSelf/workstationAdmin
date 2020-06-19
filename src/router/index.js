import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login' //登录
import index from '@/components/index' //首页
import workBench from '@/components/workBench/workBench.vue' //工作台-工作台
import hospitalDepartmentAdmin from '@/components/basicData/hospitalDepartmentAdmin.vue' //基本数据管理-科室
import staffAdmin from '@/components/basicData/staffAdmin.vue' //基本数据管理-员工
import drugAdmin from '@/components/basicData/drugAdmin.vue' //基本数据管理-药品
import trialRuleAdmin from '@/components/basicData/trialRuleAdmin.vue' //基本数据管理-审方规则
import workload from '@/components/searchAdmin/workload.vue' //查询-工作量
import unreasonableMedication from '@/components/searchAdmin/unreasonableMedication.vue' //查询-不合理用药
import roundupRecords from '@/components/searchAdmin/roundupRecords.vue' //查询-查房记录
import prescription from '@/components/searchAdmin/prescription.vue' //查询-处方
import guardianshipRecord from '@/components/searchAdmin/guardianshipRecord.vue' //查询-监护记录
import ADRtestRecords from '@/components/searchAdmin/ADRtestRecords.vue' //查询-ADR检测记录
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
			meta: {
				title: '登录'
			}
    },
		{
		  path: '/index',
      redirect: "index/workBench",
		  name: 'index',
		  component: index,
			meta: {
				title: '登录'
			},
			children: [{
				path: 'workBench',
				component: workBench,
				meta: {
					title: '工作台'
				}
			},{
				path: 'hospitalDepartmentAdmin',
				component: hospitalDepartmentAdmin,
				meta: {
					title: '医院科室'
				}
			},{
				path: 'staffAdmin',
				component: staffAdmin,
				meta: {
					title: '人员'
				}
			},{
				path: 'drugAdmin',
				component: drugAdmin,
				meta: {
					title: '药品'
				}
			},{
				path: 'trialRuleAdmin',
				component: trialRuleAdmin,
				meta: {
					title: '审方规则'
				}
			},{
				path: 'unreasonableMedication',
				component: unreasonableMedication,
				meta: {
					title: '不合理用药'
				}
			},{
				path: 'workload',
				component: workload,
				meta: {
					title: '工作量'
				}
			},{
				path: 'roundupRecords',
				component: roundupRecords,
				meta: {
					title: '查房记录'
				}
			},{
				path: 'prescription',
				component: prescription,
				meta: {
					title: '处方'
				}
			},{
				path: 'guardianshipRecord',
				component: guardianshipRecord,
				meta: {
					title: '监护记录'
				}
			},{
				path: 'ADRtestRecords',
				component: ADRtestRecords,
				meta: {
					title: 'ADR检测记录'
				}
			},],
			
     
		},
  ]
})
