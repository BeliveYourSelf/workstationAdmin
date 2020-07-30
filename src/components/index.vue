<template>
	<div class="all">
		<el-container>
		  <el-header>
				<div :class="{ headerArea: isTrouble }">
					<div class="web-title">
						<img src="../assets/img/logo.png" alt="">
					</div>
					<div class="user-info">
						<el-dropdown @command="handleCommand">
							<div>
								<div class="personal">
									<img class="user-pic" src="../assets/img/user.png" alt="">
									<p class="user-tip">{{userName}}</p>
								</div>
								<div class="hospital">
									<img class="user-pic" src="../assets/img/hospital.png" alt="">
									<p class="user-tip">河南郑州医科大学附属医院</p>
								</div>
							</div>
							
						  <el-dropdown-menu slot="dropdown">
						    <el-dropdown-item command="a">退出登录</el-dropdown-item>
						  </el-dropdown-menu>
						</el-dropdown>
						
					</div>
				</div>
			</el-header>
		  <el-container>
		    <el-row class="all-row">
		    	<el-col :span='2' class="nav-area">
		    		
		    		<el-menu default-active="1-4-1" 
		    		class="el-menu-vertical-demo my-menu" 
		    		:collapse="isCollapse"
		    		active-text-color="#fff">
							<el-submenu :index="10">
							  <template slot="title">
									<div class="nav-list">
										<!-- <img class="nav-pic" :src="list.icon" alt=""> -->
										<i class="nav-pic el-icon-monitor"></i>
										<p class="nav-text">工作台</p>
									</div>
							  </template>
							  <el-menu-item-group>
							    <el-menu-item 
									 :index="10-1" 
									 @click="goPath('workBench')">工作台</el-menu-item>
								</el-menu-item-group>
							</el-submenu>
						
		    		  <el-submenu :index="list.index" v-for="(list,index) in navList" :key="index" v-show="list.userMenuLevelOneUsed==1">
		    		    <template slot="title">
		    					<div class="nav-list">
		    						<!-- <img class="nav-pic" :src="list.icon" alt=""> -->
		    						<i class="nav-pic" :class="list.icon"></i>
		    						<p class="nav-text">{{list.name}}</p>
		    					</div>
		    		    </template>
		    		    <el-menu-item-group>
		    		      <el-menu-item 
		    					 v-for="(children,childrenIndex) in list.menuLevelTwos" 
		    					 :key="childrenIndex"
		    					 :index="children.index" 
									 v-show="children.userMenuLevelTwoUsed==1"
		    					 @click="goPath(children.url,children,index,childrenIndex)">{{children.name}}</el-menu-item>
		    				</el-menu-item-group>
		    		  </el-submenu>
		    		</el-menu>
		    	</el-col>
		    	<el-col :span='22' class="main-area">
		    		<div style="height: 100%;">
		    			
		    			<el-container direction="vertical">
		    				
		    				<el-main>
		    					<!-- <router-view /> -->
		    					<keep-alive>
		    							<router-view v-if="$route.meta.keepAlive" />
		    					</keep-alive>
		    					
		    					<router-view v-if="!$route.meta.keepAlive" />
		    				</el-main>
		    			</el-container>
		    		</div>
		    		
		    		
		    	</el-col>
		    </el-row>
		  </el-container>
		</el-container>
		
	</div>
</template>

<script>
	import windowNav from '../template/windowNav.vue'
	export default{
		name: 'index',
		components: {windowNav},
		data() {
			return {
				isCollapse: true,
				userId: sessionStorage.getItem('userId'),
				userName: sessionStorage.getItem('userName'),
				navList: [],
				windowList:[],
				isTrouble: false, // true ie11以下
			}
		},
		created() {
			this.isTrouble = this.common.judgeIE();
			this.getMenu();
			// 修改
			// this.$root.ORDERID = "xxxxx"
			// // 引用
			// let orderId = this.$root.ORDERID 
		},
		methods: {
			// 获取菜单权限
			getMenu() {
				let apiurl = this.api.selectUserPermission+'?userId='+this.userId;
				this.common.postAxios(apiurl, {}, this.returnMenu);
			},
			returnMenu(res) {
				console.log(res)
				this.navList = res.data.data.menuLevelOnes;
				sessionStorage.setItem('permissionList', JSON.stringify(res.data.data.menuLevelOnes));
				this.$root.permissionList = res.data.data.menuLevelOnes;
				console.log(this.$root.permissionList)
			},
			//前往页面
			goPath(url,children,index,childrenIndex) {
				console.log(index,childrenIndex);
				let _this = this;
				this.$router.push({path: url, query: {index: index, childrenIndex: childrenIndex}});
			},
			handleCommand(command){
			  if(command=="a"){
					// 退出登录
					sessionStorage.clear();
					localStorage.clear();
					this.$router.push('/');
			  }
			},
		}
	}
</script>

<style>
	.all{
		height: 100%!important;
	}
	.all-row{
		height: 100%;
		width: 100%;
	}
	.nav-area{
		height: calc(100% - 7rem);
		position: fixed;
		top: 7rem;
		left: 0;
	}
	.main-area{
		position: absolute;
		right: 0;
		top: 0;
		height: 100%;
	}
	/* 导航 */
	.el-menu{
		border-right-width: 0rem;
	}
	.web-title{
		font-size: 1.5rem;
		font-weight: bold;
		text-align: center;
		margin-left: 1.4rem;
		letter-spacing: 0.1rem;
		height: 7rem;
    display: inline-block;
	}
	.my-menu{
		background: transparent;
	}
	.el-menu--collapse{
		width: 100%;
		height: 100%;
	}
	.single-menu, .el-submenu__title{
		height: 7.5rem;
	}
	.el-submenu__title,.single-menu{
		padding: 0rem!important;
	}
	.nav-list{
		padding-top: 1.3rem;
		height: 6.5rem;
		width: 8.7rem;
		background: #fff;
		border-radius: 1rem;
		text-align: center;
	}
	.el-submenu,.single-menu{
		margin: 0 auto;
		margin-bottom: 1rem;
		width: 8.7rem;
		padding-left: 0;    
		overflow: hidden;
    padding-bottom: 1.3rem;
		border-radius: 1rem;
	}
	.nav-pic{
		margin-top: 2rem;
		margin: 0 auto;
		display: block;
		font-size: 2.4rem;
	}
	.nav-text{
		font-size: 1.2rem;
		color: #333;
		line-height: 1.7rem;
		margin-top: 1rem;
		margin-bottom: 0;
	}
	.el-menu--popup-right-start{
		border-radius: 1rem;
		padding: 0;
		margin-left: 0.5rem;
		margin-right: 0;
		overflow: hidden;
	}
	.el-menu--popup{
		min-width: 13rem;
	}
	.el-menu-item-group__title{
		padding: 0rem !important;
	}
	.el-menu-item-group .el-menu-item{
		padding: 0rem 0rem 0rem 3.2rem!important;
		text-align: left;
		height: 3.8rem;
		line-height: 3.8rem;
	}
	.single-menu:active .nav-list {
		background: #6791E5;
	}
	.single-menu:active .nav-text{
		color: #fff;
	}
	.el-submenu.is-opened .el-submenu__title i{
		color: #fff;
	}
	.el-submenu.is-opened .nav-list{
		background: #6791E5;
		color: #fff;
	}
	.el-submenu.is-opened .nav-text{
		background: #6791E5;
		color: #fff;
	}
	.el-menu-item:hover{
	  background: #6791E5 !important;
		color: #fff;
	}
	.el-submenu__title:hover {
	  background: #6791E5 !important;
		border-radius: 1rem;
		color: #fff;
	}
	.el-menu-item.is-active {
	  background: #6791E5 !important;
	}
	.el-submenu__title.is-active {
	  background: #6791E5 !important;
		border-radius: 1rem;
	}
	/* 头部 */
	.el-header{
		padding: 0rem !important;
		height: 7rem!important;
		line-height: 4rem;
	}
	/* 个人信息 */
	.user-pic{
		display: inline-block;
		vertical-align: middle;
	}
	.user-tip{
		font-size: 1.6rem;
		font-weight: bold;
		color: #000;
		display: inline-block;
		vertical-align: middle;
		margin-left: 1.2rem;
	}
	.user-info>div{
		display: inline-block;
	}
	.hospital{
		margin-left: 1.5rem;
	}
	.user-info{
		position: absolute;
		right: 4rem;
		display: inline-block;
	}
	.headerArea{
		position: fixed;
		width: 100%;
		height: 7rem;
		top: 0;
		z-index: 1;
		background: #F3F3F3;
	}
	.el-table__header{ width: 100% !important; } .el-table__body{ width: 100% !important; }
	.personal, .hospital{
		display: inline-block;
	}
	.el-dropdown-menu{
		width: 30rem;
		margin-top: 0;
	}
	/* .window-nav{
		
	} */
</style>
