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
        <button class="set_department" @click='handleSetDepartment'>部门设置</button>
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
              @click="handlePermission(scope.$index, scope.row)">权限设置</el-button>
            <el-button
              size="small"
              type="primary"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <change-person
      :type='messageBoxType.add'
      v-if='isShowAdd'
      @hideChangePerson='isShowAdd=!isShowAdd'>
    </change-person>
    <change-person
      :type='messageBoxType.editor'
      v-if='isShowEditor'
      @hideChangePerson='isShowEditor=!isShowEditor'>
    </change-person>
    <set-department
      :type='messageBoxType.setDepartment'
      v-if='isShowSetDepartment'
      @hideSetDepartment='isShowSetDepartment=!isShowSetDepartment'>
    </set-department>
    <del-user
      :type='messageBoxType.del'
      v-if='isShowDelUser'
      @hideDelPerson='isShowDelUser=!isShowDelUser'>
    </del-user>
  </div>
</template>

<script>
import MessageBox from '@/components/MessageBox'
import SetDepartment from '@/components/SystemSetup/personmanage/setdepartment.vue'
import ChangePerson from '@/components/SystemSetup/personmanage/change-person.vue'
import DelUser from '@/components/SystemSetup/personmanage/del-user.vue'

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
      isShowAdd: false,
      isShowEditor: false,
      isShowSetDepartment: false,
      isShowDelUser: false,
      messageBoxType: {
        add: '新增',
        editor: '修改',
        del: '删除',
        setDepartment: '部门设置',
        setAuthority: '权限设置'
      }
    }
  },
  components: {
    MessageBox,
    SetDepartment,
    ChangePerson,
    DelUser
  },
  methods: {
    handleAdd () {
      this.isShowAdd = true
    },
    handleEdit (index, row) {
      this.isShowEditor = true
      console.log(index, row)
    },
    handleSetDepartment () {
      this.isShowSetDepartment = true
    },
    handleDelete () {
      console.log(1)
      this.isShowDelUser = true
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
}
</style>
