<template>
  <div>
    <message-box
      @closeMessageBox='hideSetDepartment'
      :type='type'
      :btns='btns'>
      <div
        class="setDepartment_wrapper">
        <el-table
          size='mini'
          :data="departmentData"
          border>
          <el-table-column
            align='center' 
            prop="id"
            label="部门编号">
          </el-table-column>
          <el-table-column
            align='center' 
            prop="name"
            label="部门名称">
          </el-table-column>
          <el-table-column
            align='center'
            label='操作'>
            <template slot-scope="scope">
              <span @click='addPartment'>
                <img src="@/assets/icon/系统管理-人员管理/插入行.png">
              </span>
              <span @click='delPartment(scope.row, scope.$index)'>
                <img src="@/assets/icon/系统管理-人员管理/删除IC.png">
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </message-box>
  </div>
</template>

<script>
import MessageBox from '@/components/MessageBox'
export default {
  props: ['type'],
  data () {
    return {
      departmentData: [
        // {
        //   id: 1,
        //   name: '行政部'
        // },{
        //   id: 2,
        //   name: '财务部'
        // },{
        //   id: 3,
        //   name: '设计部'
        // }
      ],
      btns: {
        cancel: '取消', 
        comfirm: '确定'
      },
      messageBoxType: [
        { del: '人员管理>部门设置>删除' },
        { add: '人员管理>部门设置>新增' }
      ],
      isShowAddDepartement: false
    }
  },
  components: {
    MessageBox
  },
  methods: {
    // 删除当前部门
    delPartment (row, index) {
      this.$confirm(`此操作将删除${row.name}, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 向后台发送删除部门
          const loginUser = JSON.parse(this.$cookie.get('user'))
          this.$http.post(`${config.httpBaseUrl}/man/del_department/`, {
            // login_name: loginUser.name,
            // login_email:loginUser.email,
            name: row.name
          }).then(res => {
            if (res.status === 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              // 删除本地部门
              this.departmentData.splice(index, 1)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })      
        })
    },
    // 新增部门
    addPartment () {
      this.$prompt('请输入部门名称', '新增部门', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({value}) => {
        if (!value) {return}
        // 向后台发送新增部门
        const loginUser = JSON.parse(this.$cookie.get('user'))
        const data = {
          name: value,
          // login_name: loginUser.name,
          // login_email: loginUser.email
        }
        this.$http.post(`${config.httpBaseUrl}/man/add_department/`, data)
        .then(res => {
          if (res.status == 1) {
            this.$message({
              type: 'success',
              message: '部门新增成功'
            })
            this.getDepartmentData()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消新增部门'
        })
      })
    },
    // 关闭部门设置窗口
    hideSetDepartment (bol) {
      this.$emit('hideSetDepartment')
    },
    // 获取部门列表
    getDepartmentData () {
      this.$http.get(`${config.httpBaseUrl}/man/get_department/`).then(res => {
        this.departmentData = res.content
      })
    }
  },
  created () {
    this.getDepartmentData()
  }
}
</script>

<style lang="scss" scoped>
.setDepartment_wrapper {
  margin: 30px;
  img {
    vertical-align: middle;
    width: 13px;
    height: 15px;
    margin: 0 5px;
  }
}
</style>

