<template>
  <div class="tableTemplate">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>基本管理</el-breadcrumb-item>
      <el-breadcrumb-item>员工</el-breadcrumb-item>
      <el-breadcrumb-item>员工编辑</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="title">编辑</div>
    <div class="updateForm">
      <div class="formItem">
        <div class="left">员工号：</div>
        <el-input placeholder="请输入员工号" size="medium"></el-input>
      </div>
      <div class="formItem">
        <div class="left">员工名称：</div>
        <el-input placeholder="请输入员工号" size="medium"></el-input>
      </div>
      <div class="formItem">
        <div class="left">登录账号：</div>
        <el-input placeholder="请输入员工号" size="medium"></el-input>
      </div>
      <div class="formItem">
        <div class="left">职务：</div>
        <el-input placeholder="请输入员工号" size="medium"></el-input>
      </div>
    </div>
    <div class="title">权限列表</div>
    <div class="permissionsTemplate">
      <div class="permissionsItem" v-for="(item,index) in menuList">
        <div class="levelOneItem">
          <div>
            <el-checkbox v-model="checked">{{item.name}}</el-checkbox>
          </div>
          <div class="levelTwoItem" v-for="(twoItem,twoIndex) in item.levelTwo" :class="[twoItem.levelThree?'twoClearFloat':'twoFloat']">
            <div>
              <el-checkbox v-model="checked">{{twoItem.name}}</el-checkbox>
            </div>
           <template v-if="twoItem.levelThree">
              <div class="levelThreeItem float" v-for="(threeItem,threeIndex) in twoItem.levelThree" :class="[threeIndex>=parseInt(twoItem.levelThree.length/5)*5?'':'borderBottom']">
                <el-checkbox v-model="checked">{{threeItem.name}}</el-checkbox>
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
            </template>
            <div class="permissionsType" v-else>
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
  </div>
</template>

<script>
  export default {
    data() {
      return {
        checked: false,
        menuList: [{
            id: 1,
            name: '基本管理',
            check: false,
            levelTwo: [{
                name: '科室',
                id: 1,
                check: false,
              },
              {
                name: '员工',
                id: 2,
                check: false,
              }
            ]
          },
          {
            id: 2,
            name: '审方维护工具',
            check: false,
            levelTwo: [{
                name: '基本维护',
                id: 3,
                check: false,
                levelThree: [{
                  name: '配伍禁忌',
                  id: 1,
                  check: false
                }, {
                  name: '相互作用',
                  id: 2,
                  check: false
                }, {
                  name: '用法用量',
                  id: 3,
                  check: false
                }, {
                  name: '溶媒限制',
                  id: 4,
                  check: false
                }, {
                  name: '浓度限制',
                  id: 5,
                  check: false
                }, {
                  name: '职业禁忌',
                  id: 6,
                  check: false
                }, {
                  name: '特殊禁忌',
                  id: 7,
                  check: false
                }, ]
              },
              {
                name: '自定义维护',
                id: 4,
                check: false,
                levelThree: [{
                    name: '医院自定义',
                    id: 8,
                    check: false
                  },
                  {
                    name: '科室自定义',
                    id: 9,
                    check: false
                  }, {
                    name: '门诊、急诊、住院自定义',
                    id: 10,
                    check: false
                  },
                ]
              }
            ]
          }
        ],
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
        ]
      }
    },
    methods: {

    }
  }
</script>

<style scoped>
  .permissionsTemplate {
  	width: 100%;
  	margin-top: 20px;
  }
  
  .permissionsTemplate .borderBottom {
  	border-bottom: 1px solid #E1E2F6;
  }
  
  .permissionsTemplate .twoClearFloat {
  	overflow: hidden;
  	width: calc(100% - 20px);
  }
  
  .permissionsTemplate .twoFloat {
  	float: left;
  	width: calc(100% / 5);
  }
  
  .permissionsTemplate .permissionsItem {
  	padding: 20px 0;
  	width: 100%;
  	border-bottom: 1px solid #E1E2F6;
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
  	margin-left: 20px;
  	margin-top: 10px;
  }
  
  .permissionsTemplate .permissionsItem .levelOneItem .levelTwoItem .levelThreeItem {
  	margin-left: 20px;
  	width: calc(100% / 5 - 20px);
  	float: left;
  	padding: 8px 0;
  }
  
  .permissionsTemplate .permissionsItem .levelOneItem .levelTwoItem .el-checkbox {
  	color: #010101;
  	font-size: 12px !important;
  	font-weight: normal;
  }
  
  .permissionsTemplate .permissionsItem .levelOneItem .levelTwoItem .el-checkbox .el-checkbox__label {
  	font-size: 12px !important;
  }
  
  .permissionsType .el-checkbox {
  	margin-right: 10px;
  }
  
  .permissionsType .insert,
  .permissionsType >>> .el-checkbox__input.is-checked+.el-checkbox__label {
  	color: #3364AF !important;
  }
 /* .el-checkbox__input.is-checked+.el-checkbox__label {
		color: #3364AF !important;
	} */
  .permissionsType .delete,
  .permissionsType .is-checked+.el-checkbox__label {
  	color: #C05541 !important;
  }
  
  .permissionsType .update,
  .permissionsType .is-checked+.el-checkbox__label {
  	color: #999999 !important;
  }
  
</style>
