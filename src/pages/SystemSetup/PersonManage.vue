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
        <button class="add_person" @click='handleAdd'>
          <img src="@/assets/icon/新增IC.png" alt="">新增</button>
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
    <message-box
      v-if='isShowAdd'
      @closeMessageBox='isShowAdd=!isShowAdd'>
      <div class="user_name">
        <label for="name">姓名:</label>
        <el-input id='name' size='small'></el-input>
        <label for="">部门</label>
        <el-select
          v-model="value"
          placeholder="请选择"
          size='small'>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <label for="">登录账户:</label>
        <el-input
          size='small'></el-input>
        <label for="">电话:</label>
        <el-input
          size='small'></el-input>
        <el-row>
          <span>是否为部门负责人:</span>
          <el-radio v-model="radio" label="1">是</el-radio>
          <el-radio v-model="radio" label="2">否</el-radio>
        </el-row>
      </div>
    </message-box>
  </div>
</template>

<script>
import MessageBox from '@/components/MessageBox'
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
      ],
      isShowAdd: false
    }
  },
  components: {
    MessageBox
  },
  methods: {
    handleAdd () {
      this.isShowAdd = true
    }
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
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.5);
    .add_user_wrapper {
      width: 40%;
      hieght: 500px;
      margin: 60px auto 0;
      background: white;
      .header {
        background: rgb(240,240,240);
        font-size: 14px;
        line-height: 40px;
        padding: 0 10px;
      }
      .user_name {
        margin: 0 30px;
        label {
          font-size: 12px;
          margin: 15px 0 10px;
          display: inline-block;
        }
        .el-select {
          display: block;
        }
      }
      .footer {
        text-align: right;
        padding: 20px 20px;
      }
    }
    .close {
      text-align: center;
      span {
        display: inline-block;
        border-radius: 50%;
        width: 20px;
        line-height: 20px;
        background: white;
        margin-top: 10px;
      }
    }
  }
}
</style>
