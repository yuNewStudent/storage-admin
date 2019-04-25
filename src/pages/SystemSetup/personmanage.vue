<template>
  <div class="PersonManage">
  	<div class="header">
      <div class="search">
        <input type="text" @change='handleFilterUsers' placeholder="请输入姓名" v-model='userQuery'>
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
        :data="paginationData"
        size='small'
        width='100%'
        border>
        <el-table-column
          align='center' 
          prop="name"
          label="姓名"
          width='150'>
        </el-table-column>
        <el-table-column
          align='center' 
          prop="department"
          label="所属部门"
          width='120'>
        </el-table-column>
        <el-table-column
          align='center' 
          prop="email"
          label="邮箱"
          width='150'>
        </el-table-column>
        <el-table-column
          align='center' 
          prop="phone"
          label="联系电话"
          width='150'>
        </el-table-column>
        <el-table-column
          align='center'
          label="是否为部门负责人"
          width='150'>
          <template slot-scope="scope">
            <span>{{scope.row.is_leader ? '是' : '否'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
          align='center'>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEditPerson(scope.$index, scope.row)">修改</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handlePermission(scope.$index, scope.row)">权限设置</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleDeletePerson(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
       <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-count='users.length/pageSize'
          :page-size='pageSize'
          layout="total, prev, pager, next, jumper"
          :total="users.length"
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
      @hideSetDepartment='setDepartment'>
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
      users: [
        // {
        //   name: '苏轼',
        //   department: '设计部',
        //   phone: '188882999',
        //   email: '896666@sss.com',
        //   is_leader: '1'
        // }
      ],
      userQuery: '',
      selectUser: {
        index: '',
        userInfo: ''
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
      },
      // 分页
      currentPage: 1,
      paginationData: [],
      pageSize: 5
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
  },
  methods: {
    // 筛选
    handleFilterUsers () {
      if (!this.userQuery) {
        return this.getUsers()
      }
      // 获取人员列表
      this.$http.post(`${config.httpBaseUrl}/man/query_employee/`, {
        name: this.userQuery
      }).then(res => {
        this.users = res.content
        // 刚打开页面时加载前pageSize项、且自动生成分页数量
        this.getPaginationData(this.currentPage)
      })
    },
    // 新增人员
    handleAdd () {
      this.isShowAdd = true
    },
    addPerson (userInfo) {
      this.isShowAdd = false
      // 确定添加
      console.log(userInfo)
      if (userInfo) {
        this.users.push(userInfo)
        // 刚打开页面时加载前pageSize项、且自动生成分页数量
        this.getPaginationData(1)
      }
    },

    // 展示删除人员页面
    handleDeletePerson (index, row) {
      this.selectUser.index = index
      this.selectUser.userInfo = this.users[index]
      this.isShowDelUser = true
    },
    // 删除人员
    delUser (bol) {
      this.isShowDelUser= false
      // 确定删除
      if (bol) {
        // 服务器删除
        const data = {
          name: this.selectUser.userInfo.name,
          email: this.selectUser.userInfo.email
        }
        this.$http.post(`${config.httpBaseUrl}/man/del_employee/`, data).then(res => {
          
        // console.log(res)  
          // if (res.status === 1) {
            // 本地删除
            this.users.splice(this.selectUser.index, 1)
            // 刚打开页面时加载前pageSize项、且自动生成分页数量
            this.getPaginationData(1)
            this.$message({
              message: '人员删除成功',
              type: 'success'
            })
          // }
        })
      }
    },

    // 展示修改人缘页面
    handleEditPerson (index, row) {
      console.log(row)
      delete row.function
      this.selectUser.index = index
      this.selectUser.userInfo = row
      this.isShowEditor = true
    },
    // 修改人员信息
    editorPerson (userInfo) {
      this.isShowEditor = false
      // 确定修改
      if (userInfo) {
        this.users[this.selectUser.index] = userInfo
      }
    },

    // 部门设置
    handleSetDepartment () {
      this.isShowSetDepartment = true
    },
    setDepartment () {
      this.isShowSetDepartment = false
    },

    // 权限操作
    handlePermission () {
      this.isShowSettingPermission = true
    },
    // 分页
    getPaginationData (pageIndex) {
      const start = (pageIndex - 1) * this.pageSize
      const end = pageIndex * this.pageSize
      this.paginationData = this.users.slice(start, end)
    },
    // 跳转至对应分页
    handleCurrentChange(val) {
      this.currentPage = val
      this.getPaginationData(val)
    },
    getUsers () {
      this.$http.post(`${config.httpBaseUrl}/man/get_employee/`).then(res => {
        this.users = res.content
        // 刚打开页面时加载前pageSize项、且自动生成分页数量
        this.getPaginationData(this.currentPage)
      })
    }
  },
  created () {
    // 获取人员列表
    this.getUsers()
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
