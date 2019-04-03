<template>
  <message-box
    @closeMessageBox='$emit("hideSetmeasurement")'
    :type='type'
    :btns='btns'
    :right='60'>
    <div class="content">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        size='mini'>
        <el-table-column
          prop="单位编号"
          label="单位编号"
          align='center'>
        </el-table-column>
        <el-table-column
          prop="单位"
          label="单位"
          align='center'>
        </el-table-column>
        <el-table-column
          label="操作"
          align='center'
          width="150">
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
      tableData: [
        {
          单位编号: '001',
          单位: '箱'
        },
        {
          单位编号: '002',
          单位: '盒'
        },
        {
          单位编号: '003',
          单位: '件'
        }
      ],
      btns: {
        comfirm: '确定'
      }
    }
  },
  components: {
    MessageBox
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin: 40px 60px 20px;
  img {
    vertical-align: middle;
    width: 13px;
    height: 15px;
    margin: 0 5px;
  }
}
</style>


