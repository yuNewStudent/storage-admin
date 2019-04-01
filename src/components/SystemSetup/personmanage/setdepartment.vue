<template>
  <message-box
    @closeMessageBox='$emit("hideSetDepartment")'
    :type='type'
    :btns='btns'>
    <div class="setDepartment_wrapper">
      <el-table :data="departmentData">
        <el-table-column
          align='center' 
          prop="部门编号"
          label="部门编号">
        </el-table-column>
        <el-table-column
          align='center' 
          prop="部门名称"
          label="部门名称">
        </el-table-column>
        <el-table-column
          align='center' >
          <template slot-scope="scope">
            <span>
              <img src="@/assets/icon/系统管理-人员管理/插入行.png">
            </span>
            <span>
              <img src="@/assets/icon/系统管理-人员管理/删除IC.png">
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </message-box>
</template>

<script>
import MessageBox from '@/components/MessageBox'
export default {
  props: ['type'],
  data () {
    return {
      departmentData: [
        {
          部门编号: 1,
          部门名称: '行政部'
        },{
          部门编号: 2,
          部门名称: '财务部'
        },{
          部门编号: 3,
          部门名称: '设计部'
        }
      ],
      btns: {
        cancel: '取消', 
        comfirm: '确定'
      },
    }
  },
  components: {
    MessageBox
  }
}
</script>
