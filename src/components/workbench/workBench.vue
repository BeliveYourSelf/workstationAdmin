<template>
	<div class="con-area">
		<!-- 监护病人数量统计 -->
		<div class="patient-count">
			<div class="patient-item" v-for="item in patientNumList" :style="{backgroundColor: item.backgroundColor}">
				<p class="patient-tip">{{item.tip}}</p>
				<div class="patient-div">
					<img class="patient-pic" :src="item.icon" alt="">
					<span class="patient-num">{{item.num}}</span>
					<span class="patient-unit">人</span>
				</div>
			</div>
			<div class="patient-echarts">
				<div class="pie-echarts">
					<div class="echart" id="pieEcharts" style="width:100%;height:30rem;" ref="pieEcharts"></div>
				</div>
				<div class="line-echarts">
					<div class="echart" id="lineEcharts" style="windth:100%;height:30rem" ref="lineEcharts"></div>
				</div>
			</div>
			<div class="table-tip">我的患者</div>
			<div class="test-main">
				<el-table
						class="main-table"
						:data="tableData"
						style="width: 100%"
						:row-class-name="tableRowClassName"
						:header-cell-style="{background:'#F5F6FA',color:'#000',fontWeight:'bold'}">
						<el-table-column fixed type="index" :index="indexMethod" label="序号" width="100" align="center">
						</el-table-column>
						<el-table-column prop="type" label="类型" align="center"></el-table-column>
						<el-table-column prop="docAdviceDetailId" label="处方号" align="center"></el-table-column>
						<el-table-column prop="drugA" label="药品" align="center" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="drugB" label="作用药品" align="center" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="description" label="描述" align="center" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="origin" label="来源" align="center" :show-overflow-tooltip="true"></el-table-column>
						
				 </el-table>
				 </div>
			</div>
		</div>
		<!-- 监护病人数量统计 -->
	</div>
</template>

<script>
	import echarts from 'echarts'
	export default {
		data() {
			return {
				page: 1,
        currentPage: 1,
				length: 15,
				total: 400,
				// 病人数量信息统计
				patientNumList: [
					// {tip: '新增病人',num: 4,backgroundColor: '#FF863D',icon: require('../../assets/img/workPer.png'),},
					// {tip: '一级监护',num: 44,backgroundColor: '#A660D2',icon: require('../../assets/img/work1.png'),},
					// {tip: '二级监护',num: 43,backgroundColor: '#5ADC9C',icon: require('../../assets/img/work2.png'),},
					// {tip: '三级监护',num: 100,backgroundColor: '#72BEFF',icon: require('../../assets/img/work3.png'),},
				],
				// 待完成任务数据
				pieData: [{
					name: '用药教育',
					value: 170
				}, {
					name: '医嘱干预信',
					value: 68
				}, {
					name: '日常监护记录',
					value: 48
				}],
				// 工作情况数据
				lineData: [70, 68, 48, 12, 45, 30],
				tableData: [
					{lavel:'系统审方不合理用药',bed:'配伍禁忌',name:'345678',sex:'水溶性维生素针',age:'葡萄糖酸钙针',diagnosis:'出现理化、药理、药动学及药效',dayNum:'出现理化、药理、药动学及药效',status:1},
					{lavel:'系统审方不合理用药',bed:'配伍禁忌',name:'345678',sex:'水溶性维生素针',age:'葡萄糖酸钙针',diagnosis:'禁忌原因不明',dayNum:'出现理化、药理、药动学及药效',status:1},
					{lavel:'系统审方不合理用药',bed:'配伍禁忌',name:'345678',sex:'水溶性维生素针',age:'葡萄糖酸钙针',diagnosis:'禁忌原因不明',dayNum:'出现理化、药理、药动学及药效',status:2},
					{lavel:'系统审方不合理用药',bed:'配伍禁忌',name:'345678',sex:'水溶性维生素针',age:'葡萄糖酸钙针',diagnosis:'出现理化、药理、药动学及药效',dayNum:'出现理化、药理、药动学及药效',status:1},
				]
			}
		},
		mounted() {
			this.getTop();
			this.drawPie();
			this.drawLine();
		},
		methods: {
			// 新增病人和监护等级显示
			getTop() {
				let apiurl = this.api.newlyAddedPatientsAndMonitorLevel;
				this.common.getAxios(apiurl, this.returnTop);
			},
			returnTop(res) {
				this.tableData = res.data.data.irrationalDrugUseVOList;
				this.patientNumList[0] = {
					tip: '新增病人',
					num: res.data.data.newlyAddedPatientCount,
					icon: require('../../assets/img/workPer.png'),
				}
				let list = res.data.data.monitorLevelCountList;
				for(var i in list) {
					var icon = '';
					if(i%4 == 1) {
						icon = require('../../assets/img/work2.png');
					} else if(i%4 == 2) {
						icon = require('../../assets/img/work3.png');
					} if(i%4 == 3) {
						icon = require('../../assets/img/workPer.png');
					} if(i%4 == 0) {
						icon = require('../../assets/img/work1.png');
					}
					let obj = {
						tip: list[i].name,
						num: list[i].monitorCount,
						icon: icon
					}
					this.patientNumList.push(obj);
				}
					console.log(this.patientNumList)
			},
			// 表格隔行颜色设置
			tableRowClassName({row, rowIndex}) {
        if (rowIndex%2 == 0) {
          // return 'warning-row';
        } else if (rowIndex%2 == 1) {
          return 'success-row';
        }
        return '';
      },
			// 序号设置
      indexMethod(index) {
        return (this.page - 1) * 10 + index + 1;
      },
			// 数据size改变
			handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
			// 页数改变
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			// 冻结or解冻
			deleteRow(index,rows) {
				let _this = this;
				let tableData = _this.tableData;
				if(tableData[index].status == 1) {
					_this.tableData[index].status = 2;
				} else if(tableData[index].status == 2) {
					_this.tableData[index].status = 1;
				}
			},
			// 绘制echarts饼状图
			drawPie() {
				let _this = this;
				// 基于准备好的dom，初始化echarts实例
				let myChart = echarts.init(document.getElementById('pieEcharts'));
				// 绘制图表
				myChart.setOption({
					title: {
						text: '待完成任务',
						top: 20,
						left: 25,
						textStyle: {
							fontSize: 16,
						}
					},
					legend: {
						orient: 'horizontal',
						top: 240,
						left: 20,
						width: 200
					},
					series: [{
						top: -20,
						name: '待完成任务',
						type: 'pie',
						radius: ['30%', '50%'],
						avoidLabelOverlap: false,
						label: {
							show: false,
							position: 'outer',
							alignTo: 'labelLine',
							bleedMargin: 9
						},
						emphasis: {
							label: {
								show: true,
								fontSize: '12',
								// fontWeight: 'bold'
							}
						},
						labelLine: {
							show: true
						},
						data: _this.pieData,
						itemStyle: {
							normal: {
								color: function(params) {
									//自定义颜色
									let colorList = [
									'#6791E5', '#FF7977', '#FFD75C'
									];
									return colorList[params.dataIndex]
								}
							}
						}
					}]
				});
			},
			// 绘制echarts折线图
			drawLine() {
				let _this = this;
				// 基于准备好的dom，初始化echarts实例
				let myChart = echarts.init(document.getElementById('lineEcharts'));
				// 绘制图表
				myChart.setOption({
					title: {
						text: '工作情况',
						top: 20,
						left: 25,
						textStyle: {
							fontSize: 16,
						}
					},
					grid: {
						bottom: 30
					},
					// x轴设置
					xAxis: {
						type: 'category',
						data: ['用药教育', '药学会诊', '医嘱干预信', '日常监护', '药学查房', '合理用药'],
						/*改变x轴颜色*/
						axisLine: {
							lineStyle: {
								color: '#6791E5',
								width: 1, //这里是为了突出显示加上的  
							}
						},
						/*改变x轴刻度标签颜色*/
						axisLabel: {
							show: true,
							textStyle: {
								color:'#333333' //这里用参数代替了
							}
						},
					},
					// y轴设置
					yAxis: {
						type: 'value',
						splitLine: {show: false},
						/*改变y轴颜色*/
						axisLine: {
							lineStyle: {
								color: '#6791E5',
								width: 1, //这里是为了突出显示加上的  
							}
						},
						/*改变y轴刻度标签颜色*/
						axisLabel: {
							show: true,
							textStyle: {
								color:'#333333' //这里用参数代替了
							}
						},
					},
					series: [{
						itemStyle: {
							normal: {
								color: '#6791E5', //改变折线点的颜色
								lineStyle: {
									color: '#6791E5' //改变折线颜色
								}
							}
						},
						data: _this.lineData,
						type: 'line'
					}]
				});
			}
		}
	}
</script>

<style>
	.patient-count{
		width: 95%;
		margin: 0 auto;
	}
	.patient-item{
		display: inline-block;
		width: calc((100% - 6rem)/4);
		height: 10.05rem;
		border-radius: 0.3rem;
		color: #fff;
		margin-bottom: 1rem;
	}
	.patient-item:not(:first-child) {
		margin-left: 2rem;
	}
	.patient-tip{
		font-size: 1.4rem;
		margin-top: 0.8rem;
		margin-left: 2rem;
	}
	.patient-div{
		text-align: center;
	}
	.patient-pic{
		display: inline-block;
		vertical-align: middle;
		margin-right: 1.5rem;
		height: 2.2rem;
		width: 2.2rem;
	}
	.patient-num{
		font-size: 2.6rem;
		font-weight: bold;
		vertical-align: middle;
	}
	.patient-unit{
		font-size: 1.2rem;
		vertical-align: -webkit-baseline-middle;
	}
	.patient-echarts>div{
		display: inline-block;
		height: 30.6rem;
		background: #fff;
		border-radius: 3rem;
		box-shadow: 0rem 0.1rem 1rem 0rem rgba(4,0,0,0.1);
		margin-top: 1.8rem;
	}
	.pie-echarts{
		width: 40.2rem;
	}
	.line-echarts{
		width: calc(100% - 43rem);
		margin-left: 1.8rem;
	}
	.patient-item:nth-child(n){
		background-color: #FF863D;
		margin-left: 0;
	}
	.patient-item:nth-child(2n){
		background-color: #A660D2;
		margin-left: 2rem;
	}
	.patient-item:nth-child(3n){
		background-color: #5ADC9C;
		margin-left: 2rem;
	}
	.patient-item:nth-child(4n){
		background-color: #72BEFF;
		margin-left: 2rem;
	}
	
</style>