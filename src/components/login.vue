<template>
  <div class="login-area">
		<img class="login-pic" src="../assets/img/loginImg.png"></img>
		<div class="login-form">
			<p class="login-tip">登录</p>
		  <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
		    <el-form-item prop="number">
		      <el-input placeholder="工号" v-model="ruleForm.number" class="login-input">
		        <i slot="prefix" class="el-input__icon el-icon-user"></i>
		      </el-input>
		    </el-form-item>
		    <el-form-item prop="password">
		      <el-input placeholder="密码" v-model="ruleForm.password" class="login-input" type="password" @keyup.enter.native="userLogin('ruleForm')">
		        <i slot="prefix" class="el-input__icon el-icon-key"></i>
		      </el-input>
		    </el-form-item>
		    <div class="login-submit" @click="userLogin('ruleForm')">登录</div>
		  </el-form>
		</div>
	</div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      ruleForm: {
        number: '', //用户名,
        password: '', //密码
      },
      rules: {
        number: [{
          required: true,
          message: '请输入工号',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      }
    }
  },
	methods: {
		//前往首页
		userLogin(formName) {
			let _this = this;
		  this.$refs[formName].validate((valid) => {
		    if (valid) {
		      let data = _this.ruleForm;
					let apiurl = _this.api.login;
					_this.common.postAxios(apiurl, data, _this.reutrnLogin)
					
		    } else {
		      console.log('error submit!!');
		      return false;
		    }
		  });
		},
		reutrnLogin(res) {
			if(res.data.status) {
				let userId = res.data.data.id;
				let name = res.data.data.name;
				sessionStorage.setItem('userId', userId);
				sessionStorage.setItem('userName', name);
				this.$message({
				  message: '登录成功',
				  type: 'success'
				});
				this.$router.push('index');
			} else {
				this.$message.error(res.data.msg);
			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.login-area{
		width:89.4rem;
		height:51.4rem;
		background:rgba(255,255,255,1);
		box-shadow:0rem 0.3rem 2.7rem 1rem rgba(52,124,238,0.15);
		border-radius:1rem;
		position: absolute;
		top: 50%;
		margin-top: -25.7rem;
		left: 50%;
		margin-left: -44.7rem;
	}
	.login-pic{
		width: 38.9rem;
		height: 33.6rem;
		margin-top: 8.9rem;
		margin-left: 5.6rem;
	}
	.login-tip{
		font-size: 2.6rem;
		color: #333;
		font-weight: bold;
	}
	.login-form{
		display: inline-block;
		margin-top: 11.2rem;
		margin-left: 11rem;
		vertical-align: top;
	}
	.login-input >>> .el-input__inner{
		border-width: 0rem;
		border-bottom: 0.1rem solid #eee;
		border-radius: 0;
	}
	.login-submit{
		width: 100%;
		height: 4rem;
		line-height: 4rem;
		background-color: #6791E5;
		border-radius: 1rem;
		color: #fff;
		font-size: 1.9rem;
		text-align: center;
		margin-top: 5rem;
	}
</style>
