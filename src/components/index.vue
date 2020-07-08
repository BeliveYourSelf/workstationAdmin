<template>
	<div class="all">
		<el-container>
		  <el-header>
				<div class="header-area">
					<div class="web-title">
						<img src="../assets/img/logo.png" alt="">
					</div>
					<div class="user-info">
						<div class="personal">
							<img class="user-pic" src="../assets/img/user.png" alt="">
							<p class="user-tip">李医生</p>
						</div>
						<div class="hospital">
							<img class="user-pic" src="../assets/img/hospital.png" alt="">
							<p class="user-tip">河南郑州医科大学附属医院</p>
						</div>
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
		    		  <el-submenu :index="list.index" v-for="(list,index) in navList">
		    		    <template slot="title">
		    					<div class="nav-list">
		    						<!-- <img class="nav-pic" :src="list.icon" alt=""> -->
		    						<i class="nav-pic" :class="list.icon"></i>
		    						<p class="nav-text">{{list.name}}</p>
		    					</div>
		    		    </template>
		    		    <el-menu-item-group>
		    		      <el-menu-item 
		    					 v-for="(children,childrenIndex) in list.children" 
		    					 :key="childrenIndex"
		    					 :index="children.index" 
		    					 @click="goPath(children.path,children)">{{children.name}}</el-menu-item>
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
				navList: [{
					name: '工作台',
					index: '1',
					icon: 'el-icon-monitor',
					iconPath: require('../assets/img/icon1.png'),
					iconActive: require('../assets/img/icon11.png'),
					children: [{
						name: '工作台',
						index: '1-1',
						path: 'workBench'
					}]
				},{
					name: '基本数据管理',
					index: '2',
					icon: 'el-icon-setting',
					iconPath: require('../assets/img/icon2.png'),
					iconActive: require('../assets/img/icon22.png'),
					children: [{
						name: '科室',
						index: '2-1',
						path: 'hospitalDepartmentAdmin'
					},{
						name: '员工',
						index: '2-2',
						path: 'staffAdmin'
					},{
						name: '药品',
						index: '2-3',
						path: 'drugAdmin'
					},{
						name: '审方规则',
						index: '2-4',
						path: 'trialRuleAdmin'
					}]
				},{
					name: '查询',
					index: '3',
					icon: 'el-icon-search',
					children: [{
						name: '处方',
						index: '3-1',
						path: 'prescription'
					},{
						name: '工作量',
						index: '3-2',
						path: 'workload'
					},{
						name: '不合理用药',
						index: '3-3',
						path: 'unreasonableMedication'
					},{
						name: '查房记录',
						index: '3-4',
						path: 'roundupRecords'
					},{
						name: '监护记录',
						index: '3-5',
						path: 'guardianshipRecord'
					},{
						name: 'ADR检测记录',
						index: '3-6',
						path: 'ADRtestRecords'
					}]
				},{
					name: '日常管理',
					index: '4',
					icon: 'el-icon-tickets',
					children: [{
						name: '排班',
						index: '4-1',
						path: 'shiftAdmin'
					},{
						name: '监护等级',
						index: '4-2',
						path: 'lavelAdmin'
					}]
				},{
					name: '药学交班',
					index: '5',
					icon: 'el-icon-tickets',
					children: [
					// 	{
					// 	name: '排班表',
					// 	index: '5-1',
					// 	path: 'scheduleAdmin'
					// },
					{
						name: '交班',
						index: '5-2',
						path: 'reliefAdmin'
					}]
				}
					     
				],
				windowList:[]
			}
		},
		methods: {
			//前往页面
			goPath(path,children) {
				let _this = this;
				this.$router.push(path);
				// let windowList = _this.windowList;
				// windowList.map((item)=>{
				// 	item.active='window-item window-no';
				// })
				// children.active='window-item';
				// if(windowList.length != 0) {
				// 	let isExit = windowList.find((list) => list.path==path)
				// 	if(isExit == undefined) {
				// 		_this.windowList.push(children)
				// 	} else {
				// 		console.log(isExit)
				// 		windowList.forEach((item)=>{
				// 			if(item.path == path) {
				// 				item.active='window-item';
				// 			}
				// 			// console.log(item)
				// 		})
				// 		_this.windowList = windowList;
				// 	}
				// } else {
				// 	this.windowList.push(children)
				// }
				// console.log('windowList',_this.windowList)
			}
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
		padding: 0rem !important;
		text-align: center;
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
	.header-area{
	}
	/* .window-nav{
		
	} */
</style>
