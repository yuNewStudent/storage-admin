<template>
	<message-box
    @closeMessageBox='$emit("hidesetPermission")'
    :type='type'
    :btns='btns'>
		<div class="setDepartment_wrapper">
      <!-- <el-table :data="permissionData">
        <el-table-column
          align='center' 
          prop="功能"
          label="功能">
        </el-table-column>
        <el-table-column
          align='center' 
          prop="操作"
          label="操作">
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
      </el-table> -->
      <el-tree
        :data="permissionData"
        show-checkbox
        ref='tree'>
      </el-tree>
    </div>
	</message-box>
</template>

<script>
import MessageBox from '@/components/MessageBox'
import getPermissions from '@/assets/js/permission'
export default {
	props: ['type'],
	components: {
		MessageBox
	},
	data () {
		return {
			permissionData: [
        // {
        //   id: 1,
        //   label: '入库单',
        //   children: [
        //     { id: 33, label: '新增' },
        //     {id: 44, label: '修改'}
        //   ]
        // },
        // {
        //   id: 2,
        //   label: '入库单',
        //   children: [
        //     { id: 36, label: 'kankan' },
        //     {id: 17, label: 'quni'}
        //   ]
        // },
        // {
        //   id: 3,
        //   label: '入库单',
        //   children: [
        //     { id: 8, label: 'shezhi' },
        //     {id: 9, label: 'haah'}
        //   ]
        // }
      ],
      btns: {
        cancel: '取消', 
        comfirm: '确定'
      }
    }
	},
  methods: {
    hidesetPermission () {
      const checkedNodes = this.$refs.tree.getCheckedNodes(true)
      console.log(checkedNodes)
      this.$emit("hidesetPermission", checkedNodes)
    }
  },
  created () {
    this.permissionData = getPermissions()
    console.log(this.permissionData)
  }
}
</script>

<style lang="scss" scoped>
.setDepartment_wrapper {
  height: 310px;
  overflow-y: auto;
  .el-tree {
    width: 30%;
    margin: 10px auto;
  }
}
</style>
