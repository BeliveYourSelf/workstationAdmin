<template>
	<!-- 123 交班完退出登录 重新登陆需要接班人二次登录，接班页面 职务职称名字，不取消页面不可编辑，取消直接回到登录页面 -->
	<div class="con-area my-area">
		<img class="relief-pic" src="../../assets/img/reliefImg.png" alt="">
		<p class="tip">下班啦，您辛苦啦！请交班~</p>
		<el-form ref="infoForm" :model="infoForm" :rules="infoFormRules" label-width="60px" class="relief-form">
			<el-form-item label="工号:" prop="number">
				<el-input v-model="infoForm.number" @change='getStaffInfo'></el-input>
			</el-form-item>
			<el-form-item label="姓名:">
				<el-input v-model="infoForm.name" disabled></el-input>
			</el-form-item>
			<el-form-item label="科室:">
				<el-input v-model="infoForm.departmentName" disabled></el-input>
			</el-form-item>
			<el-form-item label="职务:">
				<el-input v-model="infoForm.job" disabled></el-input>
			</el-form-item>
			<el-form-item label="密码:" prop="password">
				<el-input v-model="infoForm.password" show-password></el-input>
			</el-form-item>
			<el-form-item label="交班:" prop="id">
				<el-select v-model="infoForm.id" filterable placeholder="请选择">
				    <el-option
				      v-for="item in staffList"
				      :key="item.id"
				      :label="item.name"
				      :value="item.id">
				    </el-option>
				  </el-select>
			</el-form-item>
			<el-form-item class="foot-btn">
				<el-button type="primary" @click="offWork('infoForm')">确认</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				infoForm: {
					number: '',
					name: '',
					departmentName: '',
					job: '',
					password: '',
					id: ''
				},
				infoFormRules: {
					number: [
						{ required: true, message: '请输入工号', trigger: 'blur' },
					],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' },
					],
					id: [
						{ required: true, message: '请选择接班人', trigger: 'change' }
					],
				},
				staffList: []
			}
		},
		mounted() {
			this.getStaff();
		},
		methods: {
			// 查看用户根据工号
			getStaffInfo() {
				let apiurl = this.api.getUserByUserCondition;
				let data = {
					number: this.infoForm.number
				};
				this.common.postAxios(apiurl, data, this.returnStaffInfo);
			},
			returnStaffInfo(res) {
				if(res.data.status) {
					this.infoForm.number = res.data.data.number;
					this.infoForm.name = res.data.data.name;
					this.infoForm.departmentName = res.data.data.departmentName;
					this.infoForm.job = res.data.data.job;
				} else {
					this.$message.error(res.data.msg);
				}
			},
			// 获取员工列表
			getStaff() {
				let apiurl = this.api.selectUserListFront;
				this.common.getAxios(apiurl, this.returnStaff);
			},
			returnStaff(res) {
				this.staffList = res.data.data;
			},
			// 下班确认
			offWork(formName) {
				let _this = this;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let apiurl = _this.api.shiftHandover;
						let user = _this.infoForm;
						_this.common.postAxios(apiurl, user, _this.returnOffWork);
					} else {
						return false;
					}
				});
			},
			returnOffWork(res) {
				if(res.data.status) {
					localStorage.setItem('toWorkInfo',JSON.stringify(res.data.data));
					this.$message.success('交班成功');
					this.$router.push('/toWorkAdmin')
				} else {
					this.$message.error(res.data.msg);
				}
			},
		}
	}
</script>

<style scoped>
	.my-area{
		text-align: center;
	}
	.relief-pic{
		width: 39.3rem;
		/* height: 14.7rem; */
	}
	.relief-form{
		width: 29.3rem;
		margin: 0 auto;
	}
	.tip{
		font-size: 1.4rem;
		line-height: 2.5rem;
		font-weight: bold;
	}
	.foot-btn .el-button{
		width: 80%;
		margin-left: 0;
		margin-bottom: 1.5rem;
	}
	.el-select{
		width: 100%;
	}
</style>
