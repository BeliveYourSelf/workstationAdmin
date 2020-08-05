<template>
  <div id="app">
    <!-- <router-view/> -->
		<router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
	provide () {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。                                             
		return {
			reload: this.reload                                              
		}
	},
	data() {
		return{
			isRouterAlive: true                    //控制视图是否显示的变量
		}
	},
	methods: {
		reload () {
			this.isRouterAlive = false;            //先关闭，
			this.$nextTick(function () {
					this.isRouterAlive = true;         //再打开
			}) 
		}
	},
}
</script>

<style>
	body,
	html,
	#app,
	.el-container{
	  height: 100%!important;
	  margin: 0 !important;
		padding: 0!important;
		font-size: 62.5%;
		background: #F3F3F3!important;
	}
	#app{
		font-size: 1.2rem;
	}
	ul li{
		list-style: none;
	}
	.con-area{
		min-height: calc(100% - 5rem);
		/* height: calc(100% - 5rem); */
		background: #fff;
		border-radius: 3rem;
		width: 100%;
		padding-top: 1.5rem;
		padding-bottom:1.5rem;
		z-index: 1;
	}
	.el-main{
		/* min-height: calc(100% - 4rem)!important; */
		padding-left: 0rem;
		padding-top: 0rem;
	}
	.page-area{
		margin-top: 3rem;
		text-align: center;
	}
	.table-tip{
		color: #333;
		font-size: 1.6rem;
		font-weight: bold;
		margin: 3rem 0 0 2.5rem;
		letter-spacing: 0.1rem;
	}
	/* 隐藏表格横向边框 */
	.el-table td,
	.el-table th.is-leaf,
	.el-table--border,
	.el-table--group {
		border: none;
		cursor: pointer;
	}
	.el-table::before {
		height: 0;
	}
	.el-table__fixed-right::before, .el-table__fixed::before{
		height: 0;
	}
	
	.test-main{
		box-shadow:0rem 0.1rem 1rem 0rem rgba(4,0,0,0.1);
		border-radius:3rem;
		padding-bottom: 1.5rem;
		margin-top: 2rem;
	}
	.main-table{
		border-radius: 3rem 3rem 0 0;
		font-size: 1.2rem;
	}
	.text-default{
		color: #CD5541;
	}
	.text-my-gray{
		color: #999999;
	}
	.text-orange{
		color: #ED7206;
	}
	.textPrimary{
		color: #66b1ff;
	}
	.width-style{
		width: 95%;
		margin: 0 auto;
	}
	.el-table .warning-row {
		background: oldlace;
	}
	
	.el-table .success-row {
		background: #FAFBFC;
	}
	.el-table td{
		padding: 0.2rem 0px;
	}
	.el-table th{
		padding: 0.8rem 0px;
		font-size: 14px;
	}
	/* 搜索区域 */
	.search-btn-area{
		text-align: right;
	}
	.input-width{
		width: 17.7rem;
	}
	.el-input__inner{
		height: 3rem;
		line-height: 3rem;
	}
	.input-tip{
		font-size: 1.4rem;
		color: #333;
	}
	/* 表单 */
	.el-form-item__content{
		line-height: 3rem;
	}
	.el-input{
		font-size: 1.2rem;
	}
	.el-input .el-input__icon{
		line-height: 3rem;
	}
	.el-form-item__label{
		line-height: 3rem;
		font-size: 1.2rem;
	}
	.el-form-item{
		margin-bottom: 1.8rem;
	}
	.el-dialog__footer{
		text-align: center;
	}
	.el-select-dropdown__item{
		height: 3rem;
		line-height: 3rem;
	}
	/* .el-select{
		width: 100%;
	} */
	/* 按钮 */
	.el-button{
		padding: 0.9rem 2rem;
		font-size: 1.2rem;
	}
	.el-button--text{
		padding: 0.9rem 0;
	}
	
	.el-breadcrumb{
		margin-bottom: 1.5rem;
		margin-left: 2rem;
	}
	.right-col{
		text-align: right;
	}
	.left-col{
		text-align: left;
	}
	.left-col .el-button{
		padding: 0.9rem 1rem;
	}
	.margin-left{
		margin-left: 1rem;
	}
</style>
