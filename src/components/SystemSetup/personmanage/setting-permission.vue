<template>
	<message-box
    @closeMessageBox='$emit("hidesetPermission")'
    :type='type'
    :btns='btns'>
		<div class="setDepartment_wrapper">
      <el-table :data="permissionData">
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
      </el-table>
    </div>
	</message-box>
</template>

<script>
import MessageBox from '@/components/MessageBox'
export default {
	props: ['type'],
	components: {
		MessageBox
	},
	data () {
		return {
			permissionData: [
        {
          功能: '入库单',
          操作: ['新增','修改','删除','导出','审核','反审核','合同删除','合同上传']
        },
        {
          功能: '采购单',
          部门名称: ['查询','新增','修改','删除','审核','反审核','采购明细表']
        },
        {
          功能:'商品管理',
          部门名称: ['库存预警','库存商品明细表','商品收发明细表','采购汇总表','商品收发汇总表']
        },
        {
          功能:'调拨单',
          部门名称: ['查询','新增','修改','删除','审核','反审核','导出']
        },
        {
          功能:'出库单',
          部门名称: ['新增','查询','修改','删除','审核','反审核','导出','出库明细表','出库汇总表']
        },
        {
          功能:'仓库管理',
          部门名称: ['查看','修改','删除','新增']
        },
        {
          功能:'供应商管理',
          部门名称: ['新增','查询','修改','删除','禁用','启用']
        },
        {
          功能:'客户管理',
          部门名称: ['查询','修改','新增','删除','启用','禁用']
        },
        {
          功能:'单位',
          部门名称: ['删除','修改','新增']
        },
        {
          功能:'操作日志',
          部门名称: ['查看']
        },
        {
          功能:'人员管理',
          部门名称: ['新增','修改','查看','权限设置','删除']
        }
      ],
      btns: {
        cancel: '取消', 
        comfirm: '确定'
      }
		}
	}
}
</script>