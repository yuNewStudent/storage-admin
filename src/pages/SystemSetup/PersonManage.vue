<template>
  <div class="PersonManage">
  	<div class="header">
      <div class="search">
        <input type="text" placeholder="请输入姓名">
        <span class="serch_btn">
          <img src="@/assets/icon/搜索ic.png" alt="">
        </span>
      </div>
      <div class="operate_wrapper">
        <button class="set_department">部门设置</button>
        <button class="add_person"><img src="@/assets/icon/新增IC.png" alt="">新增</button>
      </div>
    </div>
    <div class="content">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          align='center' 
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          align='center' 
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          align='center' 
          label="地址">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button
              size="small"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">权限设置</el-button>
            <el-button
              size="small"
              type="primary"
              disabled
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="add_user_wrapper">
      <p class="header">系统管理/人员设置/新增</p>  
      <div class="user_name">
        <label for="">姓名</label>
        <el-input></el-input>
        <label for="">部门</label>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <label for="">登录账户</label>
        <el-input></el-input>
        <label for="">电话</label>
        <el-input></el-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
  	return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
.PersonManage {
  margin: 30px 50px;
  .header {
    height: 40px;
    .search {
      height: 40px;
      float: left;
      border-radius: 4px;
      border: 1px solid #dedede;
      background: white;
      overflow: hidden;
      input {
        width: 300px;
        font-size: 13px;
        height: 40px;
        padding-left: 10px; 
        outline: none;
      }
      .serch_btn {
        vertical-align: top;
        display: inline-block;
        width: 70px;
        height: 40px;
        line-height: 40px;
        background: #4499f2;
        text-align: center;
        img {
          width: 17px;
          height: 15px;
        }
      }
    }
    .operate_wrapper {
      float: right;
      button {
        display: inline-block;
        height: 40px;
        line-height: 40px;
        outline: none;
        border: none;
        width: 90px;
        background: #4499f2;
        border-radius: 5px;
        letter-spacing: 1px;
        font-size: 16px;
        margin-left: 5px;
        color: white;
        img {
          vertical-align: top;
          margin-top: 11px;
          margin-right: 5px;
          width: 16px;
          height: 16px;
        }
      }
    }
  }
  .content {
    margin-top: 30px;
  }
}
</style>
'>

</style>
