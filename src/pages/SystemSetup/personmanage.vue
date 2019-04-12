<template>
  <div class="PersonManage">
  	<div class="header">
      <div class="search">
        <input type="text" placeholder="请输入姓名" v-model='userQuery'>
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
        :data="usersFilter"
        size='small'
        width='100%'
        border>
        <el-table-column
          v-for='(value, key) in usersFilter[0]'
          :key='key'
          align='center' 
          :prop="key"
          :label="key"
          width="140">
        </el-table-column>
        <el-table-column label="操作"
          align='center'>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handlePermission(scope.$index, scope.row)">权限设置</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
       <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        ></el-pagination>
      </div>
    </div>
    <change-person
      :type='messageBoxType.add'
      v-if='isShowAdd'
      @hideChangePerson='addPerson'>
    </change-person>
    <change-person
      :type='messageBoxType.editor'
      v-if='isShowEditor'
      @hideChangePerson='editorPerson'
      :selectUser='selectUser'>
    </change-person>
    <set-department
      :type='messageBoxType.setDepartment'
      v-if='isShowSetDepartment'
      @hideSetDepartment='isShowSetDepartment=!isShowSetDepartment'>
    </set-department>
    <del-user
      :type='messageBoxType.del'
      v-if='isShowDelUser'
      @hideDelPerson='delUser'
      :selectUser='selectUser'>
    </del-user>
    <setting-permission
      :type='messageBoxType.setAuthority'
      v-if='isShowSettingPermission'
      @hidesetPermission='isShowSettingPermission=!isShowSettingPermission'
    ></setting-permission>
  </div>
</template>

<script>
import MessageBox from '@/components/MessageBox'
import SetDepartment from '@/components/SystemSetup/personmanage/setdepartment.vue'
import ChangePerson from '@/components/SystemSetup/personmanage/change-person.vue'
import DelUser from '@/components/SystemSetup/personmanage/del-user.vue'
import SettingPermission from '@/components/SystemSetup/personmanage/setting-permission.vue'

export default {
  data () {
  	return {
      currentPage:4,
      users: [
        {
          序号: '1',
          姓名: '苏轼',
          所属部门: '设计部',
          联系电话: '188882999',
          邮箱: '896666@sss.com',
          是否为负责人: '是'
        }, {
          序号: '1',
          姓名: '李贺',
          所属部门: '设计部',
          联系电话: '188882999',
          邮箱: '896666@sss.com',
          是否为负责人: '是'
        }, {
          序号: '1',
          姓名: '李白',
          所属部门: '设计部',
          联系电话: '188882999',
          邮箱: '896666@sss.com',
          是否为负责人: '是'
        }, {
          序号: '1',
          姓名: '杜甫',
          所属部门: '设计部',
          联系电话: '188882999',
          邮箱: '896666@sss.com',
          是否为负责人: '是'
        },
      ],
      userQuery: '',
      selectUser: {
        index: '',
        userInfo: []
      },
      isShowAdd: false,
      isShowEditor: false,
      isShowSetDepartment: false,
      isShowDelUser: false,
      isShowSettingPermission: false,
      
      messageBoxType: {
        add: '人员管理>新增',
        editor: '人员管理>修改',
        del: '人员管理>删除',
        setDepartment: '人员管理>部门设置',
        setAuthority: '人员管理>权限设置'
      }
    }
  },
  components: {
    MessageBox,
    SetDepartment,
    ChangePerson,
    DelUser,
    SettingPermission
  },
  computed: {
    // 按照搜索框内容进行筛选
    usersFilter () {
      return this.users.filter(item => {
        return item['姓名'].indexOf(this.userQuery) > -1
      })
    }
  },
  methods: {
    handleAdd () {
      this.isShowAdd = true
    },
    addPerson (userInfo) {
      this.isShowAdd = false
      // 确定添加
      if (userInfo) {
      }
    },
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    handleEdit (index, row) {
      console.log(index, row)
      this.selectUser.index = index
      this.selectUser.userInfo = row
      this.isShowEditor = true
    },
    editorPerson (userInfo) {
      this.isShowEditor = false
      // 确定修改
      if (userInfo) {
      }
    },
    handleSetDepartment () {
      this.isShowSetDepartment = true
    },
    handleDelete (index, row) {
      this.selectUser.index = index
      this.selectUser.userInfo = row
      this.isShowDelUser = true
    },
    delUser (bol) {
      this.isShowDelUser= false
      // 确定删除
      if (bol) {}
    },
    handlePermission () {
      console.log(1)
      this.isShowSettingPermission = true
    },
  }
}
</script>

<style lang="scss" scoped>
.PersonManage {
  margin: 20px;
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
        .el-button {
          margin-left: 20px;
        }
  }
}
</style>
