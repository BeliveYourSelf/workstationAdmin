<template>
	<!-- 123 交班完退出登录 重新登陆需要接班人二次登录，接班页面 职务职称名字，不取消页面不可编辑，取消直接回到登录页面 -->
	<div class="con-area my-area">
		<img class="relief-pic" src="../../assets/img/reliefImg.png" alt="">
		<p class="tip" v-if="changeType=='deliver'">下班啦，您辛苦啦！请交班~</p>
		<p class="tip" v-else>上班啦！开启活力满满的一天，请接班~</p>
		<el-form ref="infoForm" :model="infoForm" label-width="40px" class="relief-form">
			<el-form-item label="工号:">
				<el-input v-model="infoForm.jobNumber"></el-input>
			</el-form-item>
			<el-form-item label="职务:">
				<el-input v-model="infoForm.post"></el-input>
			</el-form-item>
			<el-form-item label="科室:">
				<el-input v-model="infoForm.jobTitle"></el-input>
			</el-form-item>
			<el-form-item label="密码:">
				<el-input v-model="infoForm.password" show-password></el-input>
			</el-form-item>
			<el-form-item label="交班:">
				<el-input v-model="infoForm.operator"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary">登录</el-button>
				<el-button type="primary" plain>取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				changeType: 'deliver', //deliver交班，get接班
				infoForm: {
					jobNumber: '',
					password: '',
					operator: '',
					post: '',
					jobTitle: ''
				}
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
</style>
