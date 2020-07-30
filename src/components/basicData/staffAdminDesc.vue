<template>
	<div class="con-area">
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item to="staffAdmin">员工</el-breadcrumb-item>
		  <el-breadcrumb-item>员工编辑</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="width-style">
			<div class="title">编辑</div>
			<div class="updateForm">
				<div class="formItem">
					<span class="left">工号：</span>
					<el-input v-model="userInfo.number" placeholder="请输入员工号" disabled></el-input>
				</div>
				<div class="formItem">
					<span class="left">员工名称：</span>
					<el-input v-model="userInfo.name" placeholder="请输入员工名称" disabled></el-input>
				</div>
				<div class="formItem">
					<span class="left spec">科室：</span>
					<el-select v-model="userInfo.departmentId">
						<el-option
						 v-for="list in departmentList"
						 :value="list.id"
						 :key="list.id"
						 :label="list.departmentName"></el-option>
					</el-select>
				</div>
				<div class="formItem">
					<span class="left speco">职务：</span>
					<el-select v-model="userInfo.roleId">
						<el-option
						 v-for="list in jobList"
						 :value="list.roleId"
						 :key="list.roleId"
						 :label="list.roleName"></el-option>
					</el-select>
				</div>
			</div>
			<div class="title">权限列表</div>
			<div class="permissionsTemplate">
				<div class="permissionsItem" v-for="(item,index) in menuLevelOnes">
					<div class="levelOneItem">
						<div>
							<el-checkbox  @change="doCheckbox('one',index)" v-model="item.used">{{item.name}}</el-checkbox>
						</div>
						<div class="levelTwoItem" v-for="(twoItem,twoIndex) in item.menuLevelTwos" :class="[twoItem.levelThree?'twoClearFloat':'twoFloat']">
							<div>
								<el-checkbox @change="doCheckbox('two',index,twoIndex)" v-model="twoItem.used" :checked="twoItem.used">{{twoItem.name}}</el-checkbox>
							</div>
						 <!-- <template v-if="twoItem.permissions.length!=0"> -->
								<!-- <div class="levelThreeItem flpermissionsoat" v-for="(threeItem,threeIndex) in twoItem.permissions" :class="[threeIndex>=parseInt(twoItem.levelThree.length/5)*5?'':'borderBottom']">
									<el-checkbox v-model="checked">{{threeItem.name}}</el-checkbox> -->
									<div class="permissionsType">
										<template v-for="(threeItem,threeIndex) in twoItem.permissions">
											<el-checkbox @change="doCheckbox('three',index,twoIndex,threeIndex)" v-model="threeItem.used" v-if="threeItem.interfaceProperty=='insert'" class="insert">
												新增
											</el-checkbox>
											<el-checkbox @change="doCheckbox('three',index,twoIndex,threeIndex)" v-model="threeItem.used" v-else-if="threeItem.interfaceProperty=='delete'" class="delete">
												删除
											</el-checkbox>
											<el-checkbox @change="doCheckbox('three',index,twoIndex,threeIndex)" v-model="threeItem.used" v-else-if="threeItem.interfaceProperty=='update'" class="update">
												编辑
											</el-checkbox>
											<el-checkbox @change="doCheckbox('three',index,twoIndex,threeIndex)" v-model="threeItem.used" v-else-if="threeItem.interfaceProperty=='frozen'" class="update">
												冻结
											</el-checkbox>
											<el-checkbox @change="doCheckbox('three',index,twoIndex,threeIndex)" v-model="threeItem.used" v-else-if="threeItem.interfaceProperty=='thaw'">
												解冻
											</el-checkbox>
											<el-checkbox @change="doCheckbox('three',index,twoIndex,threeIndex)" v-model="threeItem.used" v-else-if="threeItem.interfaceProperty=='hide'" class="update">
												隐藏
											</el-checkbox>
											<el-checkbox @change="doCheckbox('three',index,twoIndex,threeIndex)" v-model="threeItem.used" v-else-if="threeItem.interfaceProperty=='display'">
												显示
											</el-checkbox>	
											<el-checkbox @change="doCheckbox('three',index,twoIndex,threeIndex)" v-model="threeItem.used" v-else-if="threeItem.interfaceProperty=='insert_table'" class="insert">
												新增排班表
											</el-checkbox>
										</template>
									</div>
								<!-- </div> -->
							<!-- </template> -->
							<!-- <div class="permissionsType" v-else>
								<template v-for="(item,index) in permissionsList">
									<el-checkbox v-model="item.check" v-if="item.type=='insert'" class="insert">
										新增
									</el-checkbox>
									<el-checkbox v-model="item.check" v-else-if="item.type=='delete'" class="delete">
										删除
									</el-checkbox>
									<el-checkbox v-model="item.check" v-else-if="item.type=='update'" class="update">
										修改
									</el-checkbox>
								</template>
							</div> -->
						</div>
					</div>
					<!-- div class="levelOneItem">
						<el-checkbox v-model="checked">备选项</el-checkbox>
						<div class="levelTwoItem">
							<el-checkbox v-model="checked">备选项</el-checkbox>
							<div class="levelThreeItem">
								<el-checkbox v-model="checked">备选项</el-checkbox>
								<div class="permissionsType">
									<template v-for="(item,index) in permissionsList">
										<el-checkbox v-model="item.check" v-if="item.type=='insert'" class="insert">
											新增
										</el-checkbox>
										<el-checkbox v-model="item.check" v-else-if="item.type=='delete'" class="delete">
											删除
										</el-checkbox>
										<el-checkbox v-model="item.check" v-else-if="item.type=='update'" class="update">
											修改
										</el-checkbox>
									</template>
								</div>
							</div>

						</div>
					</div> -->
				</div>
			</div>
			<div class="footer-btn">
				<el-button type="primary" @click="saveSet">确定</el-button>
				<el-button type="primary" plain>取消</el-button>
			</div>
		</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        checked: false,
				userId: this.$route.query.id,
				userInfo: {},
				menuLevelOnes: [],
        permissionsList: [{
            type: 'insert',
            id: 1
          },
          {
            type: 'delete',
            id: 2
          },
          {
            type: 'update',
            id: 3
          },
        ],
				departmentList: [],
				jobList: [],
      }
    },
		mounted() {
			this.getDepartment();
			this.getJob();
			this.getRoleInfo();
			this.getPermission();
		},
    methods: {
			// 查询科室
			getDepartment() {
				let apiurl = this.api.selectDepartmentListPage+'?page=1&length=1000000';
				this.common.getAxios(apiurl, this.returnDepartment);
			},
			returnDepartment(res) {
				this.departmentList = res.data.data.list;
			},
			// 查询职务
			getJob() {
				let apiurl = this.api.selectRoleListPage+'?page=1&length=1000000';
				this.common.getAxios(apiurl, this.returnJob);
			},
			returnJob(res) {
				this.jobList = res.data.data.list;
			},
			// 获取权限
			getPermission() {
				let apiurl = this.api.selectUserPermission+'?userId='+this.userId;
				let data = {};
				this.common.postAxios(apiurl, data, this.returnPermission);
			},
			returnPermission(res) {
				if(res.data.status) {
					this.menuLevelOnes = res.data.data.menuLevelOnes;
					this.doCheckbox('init');
				} else {
					this.$message.error(res.data.msg);
				}
			},
			// 处理checkbox
			doCheckbox(type, index, twoIndex, threeIndex) {
				console.log(type, index, twoIndex, threeIndex)
				let menuLevelOnes = this.menuLevelOnes;
				if(type == 'init') {
					for(var i in menuLevelOnes) {
						if(menuLevelOnes[i].userMenuLevelOneUsed == 1) {
							menuLevelOnes[i].used = true;
						} else if(menuLevelOnes[i].userMenuLevelOneUsed == 0) {
							menuLevelOnes[i].used = false;
						}
						for(var k in menuLevelOnes[i].menuLevelTwos) {
							if(menuLevelOnes[i].menuLevelTwos[k].userMenuLevelTwoUsed == 1) {
								menuLevelOnes[i].menuLevelTwos[k].used = true;
							} else if(menuLevelOnes[i].menuLevelTwos[k].userMenuLevelTwoUsed == 0) {
								menuLevelOnes[i].menuLevelTwos[k].used = false;
							}
							if(menuLevelOnes[i].menuLevelTwos[k].permissions.length!=0) {
								for(var j in menuLevelOnes[i].menuLevelTwos[k].permissions) {
									if(menuLevelOnes[i].menuLevelTwos[k].permissions[j].used) {
										menuLevelOnes[i].menuLevelTwos[k].used = true;
										menuLevelOnes[i].used = true;
									}
								}
							}
						}
					}
				}
				if(type == 'three') {
					console.log(menuLevelOnes[index].menuLevelTwos)
						menuLevelOnes[index].used = true;
						menuLevelOnes[index].menuLevelTwos[twoIndex].used = true;
					
				}
				if(type == 'two') {
					console.log(menuLevelOnes[index].menuLevelTwos)
					if(menuLevelOnes[index].menuLevelTwos[twoIndex].used) {
						menuLevelOnes[index].used = true;
					} else {
						if(menuLevelOnes[index].menuLevelTwos[twoIndex].permissions.length!=0) {
							for(var j in menuLevelOnes[index].menuLevelTwos[twoIndex].permissions) {
								menuLevelOnes[index].menuLevelTwos[twoIndex].permissions[j].used = false;
							}
						}
					}
				}
				if(type == 'one') {
					if(!menuLevelOnes[index].used) {
						for(var k in menuLevelOnes[index].menuLevelTwos) {
							menuLevelOnes[index].menuLevelTwos[k].used = false;
							if(menuLevelOnes[index].menuLevelTwos[k].permissions.length!=0) {
								for(var j in menuLevelOnes[index].menuLevelTwos[k].permissions) {
									menuLevelOnes[index].menuLevelTwos[k].permissions[j].used = false;
								}
							}
						}
					}
				}
				this.$forceUpdate();//强制刷新
			},
			// 查询角色信息
			getRoleInfo() {
				let apiurl = this.api.selectUserRole+'?id='+this.userId;
				let data = {};
				this.common.postAxios(apiurl, data, this.returnRoleInfo);
			},
			returnRoleInfo(res) {
				if(res.data.status) {
					this.userInfo = res.data.data[0];
				} else {
					this.$message.error(res.data.msg);
				}
			},
			// 确认提交
			saveSet() {
				let menuLevelOnes = this.menuLevelOnes;
				let userMenuLevelOneVoList = [];
				let userMenuLevelTwoVoList = [];
				let userPermissionVoList = [];
				let usedIdNumber = Number(this.userId)
				for (var i in menuLevelOnes) {
					if(menuLevelOnes[i].used==undefined) {
						menuLevelOnes[i].used = false;
					}
					let objOne = {
						menuLevelOneId: menuLevelOnes[i].id,
						userMenuLevelOneUsed: menuLevelOnes[i].used,
						userMenuLevelOneUserId: usedIdNumber
					};
					userMenuLevelOneVoList.push(objOne)
					for(var j in menuLevelOnes[i].menuLevelTwos){
						if(menuLevelOnes[i].menuLevelTwos[j].used==undefined) {
							menuLevelOnes[i].menuLevelTwos[j].used = false;
						}
						let objTwo = {
							menuLevelTwoId: menuLevelOnes[i].menuLevelTwos[j].id,
							userMenuLevelTwoUsed: menuLevelOnes[i].menuLevelTwos[j].used,
							userMenuLevelTwoUserId: usedIdNumber
						};
						userMenuLevelTwoVoList.push(objTwo)
						for(var k in menuLevelOnes[i].menuLevelTwos[j].permissions){
							if(menuLevelOnes[i].menuLevelTwos[j].permissions[k].used==undefined) {
								menuLevelOnes[i].menuLevelTwos[j].permissions[k].used = false;
							}
							let objThree = {
								permissionId: menuLevelOnes[i].menuLevelTwos[j].permissions[k].id,
								userPermissionUsed: menuLevelOnes[i].menuLevelTwos[j].permissions[k].used,
								userPermissionId: usedIdNumber
							};
							userPermissionVoList.push(objThree)
							
						}
					}
				}
				let apiurlRole = this.api.updateUserRole
													+'?userId='+this.userId
													+'&roleId='+this.userInfo.roleId
													+'&departmentId='+this.userInfo.departmentId;
				this.common.putAxios(apiurlRole, {}, this.returnRole);									
				let apiurlPermission = this.api.updateUserPermission;
				let list = {
					userMenuLevelOneVoList: userMenuLevelOneVoList,
					userMenuLevelTwoVoList: userMenuLevelTwoVoList,
					userPermissionVoList: userPermissionVoList,
				}
				this.common.putAxios(apiurlPermission, list, this.returnSavePermission)
			},
			returnRole(res) {
				if(res.data.status) {
					this.$message.success('用户信息修改成功')
				} else {
					this.$message.error(res.data.msg);
				}
			},
			returnSavePermission(res) {
				if(res.data.status) {
					this.$message.success('用户权限修改成功')
				} else {
					this.$message.error(res.data.msg);
				}
			}
    }
  }
</script>

<style scoped>
  .permissionsTemplate {
  	width: 100%;
  	/* margin-top: 2rem; */
  }
  
  .permissionsTemplate .borderBottom {
  	border-bottom: 0.1rem solid #E1E2F6;
  }
  
  .permissionsTemplate .twoClearFloat {
  	overflow: hidden;
  	width: calc(100% - 2rem);
  }
  
  .permissionsTemplate .twoFloat {
  	float: left;
  	width: calc(100% / 5);
  }
  
  .permissionsTemplate .permissionsItem {
  	padding: 2rem 0;
  	width: 100%;
  	border-bottom: 0.1rem solid #E1E2F6;
  }
  
  .permissionsTemplate .permissionsItem .levelOneItem {
  	width: 100%;
  	overflow: hidden;
  }
  
  .permissionsTemplate .permissionsItem .levelOneItem .el-checkbox {
  	color: #010101;
  	font-weight: normal;
  }
  
  .permissionsTemplate .permissionsItem .levelOneItem .levelTwoItem {
  	margin-left: 2rem;
  	margin-top: 1rem;
  }
  
  .permissionsTemplate .permissionsItem .levelOneItem .levelTwoItem .levelThreeItem {
  	margin-left: 2rem;
  	width: calc(100% / 5 - 2rem);
  	float: left;
  	padding: 0.8rem 0;
  }
  
  .permissionsTemplate .permissionsItem .levelOneItem .levelTwoItem .el-checkbox {
  	color: #010101;
  	font-size: 1.2rem !important;
  	font-weight: normal;
  }
  
  .permissionsTemplate .permissionsItem .levelOneItem .levelTwoItem .el-checkbox .el-checkbox__label {
  	font-size: 1.2rem !important;
  }
  
  .permissionsType .el-checkbox {
  	margin-right: 1rem;
  }
  
  .permissionsType >>> .insert,
  .permissionsType >>> .insert .is-checked+.el-checkbox__label {
  	color: #3364AF !important;
  }
  .permissionsType >>> .insert .el-checkbox__input.is-checked .el-checkbox__inner, 
	.permissionsType >>> .insert .el-checkbox__input.is-indeterminate .el-checkbox__inner {
		background-color: #3364AF;
		border-color: #3364AF;
	}
  .permissionsType >>> .delete,
  .permissionsType >>> .delete .is-checked+.el-checkbox__label {
  	color: #C05541 !important;
  }
  .permissionsType >>> .delete .el-checkbox__input.is-checked .el-checkbox__inner,
  .permissionsType >>> .delete .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  	background-color: #C05541;
  	border-color: #C05541;
  }
  .permissionsType >>> .update,
  .permissionsType >>> .update .is-checked+.el-checkbox__label {
  	color: #999999 !important;
  }
	.permissionsType >>> .update .el-checkbox__input.is-checked .el-checkbox__inner,
	.permissionsType >>> .update .el-checkbox__input.is-indeterminate .el-checkbox__inner {
		background-color: #999999;
		border-color: #999999;
	}
	.formItem{
		display: inline-block;
		width: calc(100%/4 - 2rem);
	}
  .formItem >>> .el-input{
		width: 17.7rem;
	}
	.formItem >>> .el-input .el-input__inner{
		line-height: 3rem;
		height: 3rem;
	}
	.formItem >>> .el-select{
		width: 17.7rem;
	}
	.formItem .spec{
		margin-left: 2rem;
	}
	.formItem .speco{
		margin-left: 1rem;
	}
	.title{
		/* margin-bottom: 2rem; */
	}
	.title:not(:first-child){
		margin-top: 2rem;
	}
	.footer-btn{
		margin-top: 2rem;
	}
</style>
