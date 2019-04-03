<template>
  <message-box
    @closeMessageBox='$emit("hideGoodsCategory")'
    :type='type'
    :btns='btns'>
    <div class="content">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        size='mini'>
        <el-table-column
          prop="商品类别编码"
          label="商品类别编码"
          align='center'>
        </el-table-column>
        <el-table-column
          prop="商品类别"
          label="商品类别"
          align='center'>
        </el-table-column>
        <el-table-column
          label="操作"
          align='center'
          width="150">
          <template slot-scope="scope">
            <span>
              <img src="@/assets/icon/系统管理-商品管理/修改IC.png">
            </span>
            <span>
              <img src="@/assets/icon/系统管理-人员管理/删除IC.png">
            </span>
            <span>
              <img src="@/assets/icon/系统管理-人员管理/插入行.png">
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
          商品类别编码: '001',
          商品类别: '个人防护'
        },
        {
          商品类别编码: '002',
          商品类别: '医用器材'
        },
        {
          商品类别编码: '003',
          商品类别: '医疗急救设备'
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
  line-height: 30px;
  font-size: 16px;
  color: #333;
  margin: 20px 20px;
  img {
    vertical-align: middle;
    width: 13px;
    height: 15px;
    margin: 0 5px;
  }
}
</style>

