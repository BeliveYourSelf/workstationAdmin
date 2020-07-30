<template>
	<!-- 123 交班完退出登录 重新登陆需要接班人二次登录，接班页面 职务职称名字，不取消页面不可编辑，取消直接回到登录页面 -->
	<div class="con-area my-area">
		<img class="relief-pic" src="../../assets/img/reliefImg.png" alt="">
		<p class="tip">上班啦！开启活力满满的一天，请接班~</p>
		<el-form ref="infoForm" :model="infoForm" :rules="infoFormRules" label-width="60px" class="relief-form">
			<el-form-item label="工号:">
				<el-input v-model="infoForm.number" disabled></el-input>
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
			<el-form-item label="交班:">
				<el-select v-model="infoForm.id" filterable placeholder="请选择" disabled>
				    <el-option
				      v-for="item in staffList"
				      :key="item.id"
				      :label="item.name"
				      :value="item.id">
				    </el-option>
				  </el-select>
			</el-form-item>
			<el-form-item class="foot-btn">
				<el-button type="primary" @click="toWork('infoForm')">确认</el-button>
				<el-button type="primary" plain @click="goLogin">取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				changeType: 'offWork', //offWork交班，toWork接班
				infoForm: {
					number: '',
					name: '',
					departmentName: '',
					job: '',
					password: '',
					id: ''
				},
				infoFormRules: {
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' },
					],
				},
				staffList: []
			}
		},
		mounted() {
			this.infoForm = JSON.parse(localStorage.getItem('toWorkInfo'));
			this.infoForm.password = '';
			this.getStaff();
		},
		methods: {
			// 获取员工列表
			getStaff() {
				let apiurl = this.api.selectUserListFront;
				this.common.getAxios(apiurl, this.returnStaff);
			},
			returnStaff(res) {
				this.staffList = res.data.data;
			},
			// 上班确认
			toWork(formName) {
				let _this = this;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let apiurl = _this.api.shiftHandoverStartWork;
						let user = _this.infoForm;
						_this.common.postAxios(apiurl, user, _this.returnToWork);
					} else {
						return false;
					}
				});
			},
			returnToWork(res) {
				if(res.data.status) {
					this.changeType = 'toWork';
					localStorage.setItem('toWorkInfo','');
					this.$message.success('上班成功');
					this.$router.push('index');
				} else {
					this.$message.error(res.data.msg);
				}
			},
			goLogin() {
				this.$confirm('是否确定取消接班?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$router.push('/');
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});          
				});
			}
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
