// 配置API接口地址
var root = process.env.API_ROOT

export default({
	// 登录
	login: root + 'userController/login',
	// 查询员工列表list
	selectUserList: root + 'userManagementController/selectUserList',
	// 查询用户角色信息
	selectUserRole: root + 'userController/selectUserRole',
	// 修改用户角色信息
	updateUserRole: root + 'userController/updateUserRole',
	// 查询用户角色和权限信息
	selectUserPermission: root + 'userController/selectUserPermission',
	// 修改用户权限信息
	updateUserPermission: root + 'userController/updateUserPermission',
	// 编辑员工信息
	updateUser: root + 'userManagementController/updateUser',
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
	// 处方-组别不分页
	slelectDepartmentGroup: root + 'departmentGroupController/slelectDepartmentGroup',
	// 处方-组别查科室
	slelectDepartment: root + 'departmentController/slelectDepartment',
	// 处方查询list
	selectDocAdviceDetailsList: root + 'managementQueryController/selectDocAdviceDetailsList',
	// 处方查询不分页
	selectDocAdviceDetailsListPrint: root + 'managementQueryController/selectDocAdviceDetailsListPrint',
	// 处方查询详情
	selectDocAdviceDetailsListOther: root + 'managementQueryController/selectDocAdviceDetailsListOther',
	// 监护记录查询list
	selectMonitorRecordList: root + 'managementQueryController/selectMonitorRecordList',
	// 查房记录查询list
	selectWardRoundRecord: root + 'managementQueryController/selectWardRoundRecord',
	// 不合理用药查询list
	selectDocAdviceStatistics: root + 'managementQueryController/selectDocAdviceStatistics',
	// 不合理用药查询不分页
	selectDocAdviceStatisticsPrint: root + 'managementQueryController/selectDocAdviceStatisticsPrint',
	// 不合理用药详情查看
	selectDocAdviceDetailsStatistics: root + 'managementQueryController/selectDocAdviceDetailsStatistics',
	// 工作台新增病人和监护等级显示
	newlyAddedPatientsAndMonitorLevel: root + 'managementWorkBenchController/newlyAddedPatientsAndMonitorLevel',
	// 基本数据管理-药品-分页
	selectDrugListPage: root + 'drugController/selectDrugListPage',
	// 基本数据管理-药品-冻结-解冻
	updateStatus: root + 'drugController/updateStatus',
	// 基本数据管理-药品-明细-查看
	selectDrugDetails: root + 'drugController/selectDrugDetails',
	// 基本数据管理-药品-明细-显示优先级
	displayPriority: root + 'drugController/displayPriority',
	// 基本数据管理-药品-明细-附加条件
	selectAddCondition: root+ 'drugController/selectAddCondition',
	// 基本数据管理-药品-明细-限药时间间隔
	selectDrugRestrictionInterval: root + 'drugController/selectDrugRestrictionInterval',
	// 基本数据管理-药品-明细-包装换算、存放位置分类
	selectStorageLocationClassify: root + 'drugController/selectStorageLocationClassify',
	// 基本数据管理-药品-明细-匹配-单位制剂
	selectUnitPreparation: root + 'drugController/selectUnitPreparation',
	// 基本数据管理-药品-明细-匹配-单位制剂-分页
	selectUnitPreparationPage: root + 'drugController/selectUnitPreparationPage',
	// 基本数据管理-药品-明细-匹配—单位制剂大类
	selectUnitPreparationCategory: root + 'drugController/selectUnitPreparationCategory',
	// 基本数据管理-药品-明细-最小包装剂量单位
	smallPackageDoseUnit: root + 'drugController/smallPackageDoseUnit',
	// 基本数据管理-药品-明细-附加条件
	selectAddCondition: root + 'drugController/selectAddCondition',
	// 基本数据管理-药品-明细-附加条件-新增
	insertAddCondition: root + 'managementAddConditionController/insertAddCondition',
	// 基本数据管理-药品-明细-附加条件-修改
	updateAddCondition: root + 'managementAddConditionController/updateAddCondition',
	// 基本数据管理-药品-明细-附加条件-删除
	deleteAddCondition: root + 'managementAddConditionController/deleteAddCondition',
	// 编辑药品
	updateDrug: root + 'drugController/updateDrug',
	// 查房常用语查询list
	selectUsuallyLanguageListPage: root + 'managementUsuallyLanguageController/selectUsuallyLanguageListPage',
	// 查房常用语新增
	insertUsuallyLanguage: root + 'managementUsuallyLanguageController/insertUsuallyLanguage',
	// 查房常用语修改
	updateUsuallyLanguage: root + 'managementUsuallyLanguageController/updateUsuallyLanguage',
	// 查房常用语删除
	deleteUsuallyLanguage: root + 'managementUsuallyLanguageController/deleteUsuallyLanguage',
	// 日常管理-ADR监测-分页
	selectADRMonitorListPage: root + 'adrMonitorController/selectADRMonitorListPage',
	// 日常管理-ADR监测类型-不分页
	selectADRMonitorTypeList: root + 'patientsBasicController/selectADRMonitorTypeListPage',
	// 日常管理-ADR监测类型-分页
	selectADRMonitorTypeListPage: root + 'managementADRMonitorTypeController/selectADRMonitorTypeListPage',
	// 日常管理-ADR监测类型-新增
	insertADRMonitorType: root + 'managementADRMonitorTypeController/insertADRMonitorType',
	// 日常管理-ADR监测类型-编辑
	updateADRMonitorType: root + 'managementADRMonitorTypeController/updateADRMonitorType',
	// 日常管理-ADR监测类型-删除
	deleteADRMonitorType: root + 'managementADRMonitorTypeController/deleteADRMonitorType',
	// 交班-查看用户根据用户信息
	getUserByUserCondition: root + 'userManagementController/getUserByUserCondition',
	// 交班-移动端-查看员工列表-无分页
	selectUserListFront: root + 'userManagementController/selectUserListFront',
	// 后台交班：下班
	shiftHandover: root + 'userManagementController/shiftHandover',
	// 后台交班：上班
	shiftHandoverStartWork: root + 'userManagementController/shiftHandoverStartWork',
	// 职务查询list
	selectRoleListPage: root + 'roleController/selectRoleListPage',
	// 职务新增
	insertRole: root + 'roleController/insertRole',
	// 职务修改
	updateRole: root + 'roleController/updateRole',
	// 职务删除
	deleteRole: root + 'roleController/deleteRole',
})
