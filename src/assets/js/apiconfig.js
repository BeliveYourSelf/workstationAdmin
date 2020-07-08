// 配置API接口地址
var root = process.env.API_ROOT

export default({
	// 查询员工列表list
	selectUserList: root + 'userManagementController/selectUserList',
	// 查看用户根据用户信息
	getUserByUserCondition: root + 'userManagementController/getUserByUserCondition',
	// 后台交班:上班
	shiftHandoverStartWork: root + 'userManagementController/shiftHandoverStartWork',
	// 后台交班:下班
	shiftHandover: root + 'userManagementController/shiftHandover',
	// 查看科室list
	selectDepartmentListPage: root + 'managementDepartmentController/selectDepartmentListPage',
	// 更新科室信息
	updateDepartment: root + 'managementDepartmentController/updateDepartment',
	// 查看部门组别集合
	selectDepartmentGroupList: root + 'managementDepartmentController/selectDepartmentGroupList',
	// 冻结/解冻科室
	freezeDepartment: root + 'managementDepartmentController/freezeDepartment',
	// 查询监护等级list
	selectMonitorLevelDetailsManagementList: root + 'monitorLevelDetailsManagementController/selectMonitorLevelDetailsManagementList',
	// 新增监护等级
	insertMonitorLevelDetailsManagement: root + 'monitorLevelDetailsManagementController/insertMonitorLevelDetailsManagement',
	// 删除监护等级
	deleteMonitorLevelDetailsById: root + 'monitorLevelDetailsManagementController/deleteMonitorLevelDetailsById',
	// 查看排班表名称list
	getSchedulingCategory: root + 'schedulingCategoryManagementController/getSchedulingCategory',
	// 查看排班表明细
	getSchedulingCategoryAndDetailsLastTime: root + 'schedulingCategoryManagementController/getSchedulingCategoryAndDetailsLastTime',
	// 新增排班大类
	insertSchedulingCategory: root + 'schedulingCategoryManagementController/insertSchedulingCategory',
	// 处方查询list
	selectDocAdviceDetailsList: root + 'managementQueryController/selectDocAdviceDetailsList',
	// 处方查询不分页
	selectDocAdviceDetailsListPrint: root + 'managementQueryController/selectDocAdviceDetailsListPrint',
	// 处方查询详情
	selectDocAdviceDetailsListOther: root + 'managementQueryController/selectDocAdviceDetailsListOther',
	// 监护记录查询list
	selectMonitorRecordList: root + 'managementQueryController/selectMonitorRecordList',
	// 不合理用药查询list
	selectDocAdviceStatistics: root + 'managementQueryController/selectDocAdviceStatistics',
	// 不合理用药查询不分页
	selectDocAdviceStatisticsPrint: root + 'managementQueryController/selectDocAdviceStatisticsPrint',
})