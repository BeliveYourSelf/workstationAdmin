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
						<el-table-column type="index" :index="indexMethod" label="序号" width="100" align="center">
						</el-table-column>
						<el-table-column prop="lavel" label="监护等级" align="center"></el-table-column>
						<el-table-column prop="bed" label="床位" align="center"></el-table-column>
						<el-table-column prop="name" label="姓名" align="center"></el-table-column>
						<el-table-column prop="sex" label="性别" align="center"></el-table-column>
						<el-table-column prop="age" label="年龄" align="center"></el-table-column>
						<el-table-column prop="diagnosis" label="入院诊断" align="center"></el-table-column>
						<el-table-column prop="dayNum" label="入院天数" align="center"></el-table-column>
						<el-table-column fixed="right" label="操作" width="120" align="center">
							<template slot-scope="scope">
								<el-button
									@click.native.prevent="deleteRow(scope.$index, tableData)"
									type="text"
									size="small">
									<span v-if="scope.row.status == 1" class="text-my-gray">冻结</span>
									<span v-else-if="scope.row.status == 2" class="text-orange">解冻</span>
								</el-button>
							</template>
						</el-table-column>
				 </el-table>
				 <div class="block page-area">
					 <el-pagination
						 @size-change="handleSizeChange"
						 @current-change="handleCurrentChange"
						 :current-page="currentPage"
						 :page-sizes="[15, 20, 50, 100]"
						 :page-size="length"
						 layout="total, sizes, prev, pager, next, jumper"
						 :total="total">
					 </el-pagination>
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
					{tip: '新增病人',num: 4,backgroundColor: '#FF863D',icon: require('../../assets/img/workPer.png'),},
					{tip: '一级监护',num: 44,backgroundColor: '#A660D2',icon: require('../../assets/img/work1.png'),},
					{tip: '二级监护',num: 43,backgroundColor: '#5ADC9C',icon: require('../../assets/img/work2.png'),},
					{tip: '三级监护',num: 100,backgroundColor: '#72BEFF',icon: require('../../assets/img/work3.png'),},
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
					{lavel:'一级',bed:'z-678',name:'沈燕燕',sex:'女',age:67,diagnosis:'过敏皮炎',dayNum:'10',status:1},
					{lavel:'一级',bed:'z-678',name:'沈燕燕',sex:'女',age:67,diagnosis:'过敏皮炎',dayNum:'10',status:1},
					{lavel:'一级',bed:'z-678',name:'沈燕燕',sex:'女',age:67,diagnosis:'过敏皮炎',dayNum:'10',status:2},
					{lavel:'一级',bed:'z-678',name:'沈燕燕',sex:'女',age:67,diagnosis:'过敏皮炎',dayNum:'10',status:1},
				]
			}
		},
		mounted() {
			this.drawPie();
			this.drawLine();
		},
		methods: {
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
		margin-top: 2.8rem;
	}
	.pie-echarts{
		width: 40.2rem;
	}
	.line-echarts{
		width: calc(100% - 43rem);
		margin-left: 1.8rem;
	}
	
	
	
	
</style>
