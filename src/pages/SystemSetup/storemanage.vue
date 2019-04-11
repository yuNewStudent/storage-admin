<template>
  <div class="storemanage">
  	<p>
      <el-button type="primary" size='medium' @click="isShowAddStorage=!isShowAddStorage">新增</el-button>
    </p>
    <el-table
      :data="tableData3"
      border
      size='small'
      :span-method="arraySpanMethod">
      <el-table-column
        prop="仓库编号"
        label="仓库编号"
        align='center'>
      </el-table-column>
      <el-table-column
        align='center'
        prop="仓库名称"
        label="仓库名称">
      </el-table-column>
      <el-table-column
        align='center'
        prop="仓库货位"
        label="仓库货位">
      </el-table-column>
      <el-table-column
        align='center'
        label="操作">
        <template slot-scope="scope">
          <span @click="handleEditorStorage">
            <img src="@/assets/icon/系统管理-商品管理/修改IC.png">
          </span>
          <span @click="handleDelStorage">
            <img src="@/assets/icon/系统管理-人员管理/删除IC.png">
          </span>
        </template>
      </el-table-column>
    </el-table>
    <del-storage
      :type='messageBoxType.del'
      v-if='isShowDelStorage'
      @hideDelStorage='delStorage'></del-storage>
  <change-storage
    :type='messageBoxType.add'
    v-if='isShowAddStorage'
    @hideChangeStorage='AddStorage'></change-storage>
  <change-storage
  :type='messageBoxType.editorStorage'
  v-if='isShowEditorStorage'
  @hideChangeStorage='editorStorage'></change-storage>
  </div>
</template>

<script>
import DelStorage from '@/components/SystemSetup/storemanage/delstorage.vue'
import ChangeStorage from '@/components/SystemSetup/storemanage/changestorage.vue'
export default {
  data () {
  	return {
      tableData3: [
        {
          仓库编号: '001',
          仓库名称: 'A区',
          仓库货位: 'A区1-1'
        },
        {
          仓库编号: '001',
          仓库名称: 'A区',
          仓库货位: 'A区1-2'
        },
        {
          仓库编号: '001',
          仓库名称: 'A区',
          仓库货位: 'A区2-1'
        },
        {
          仓库编号: '002',
          仓库名称: 'B区',
          仓库货位: 'B区1-1'
        },
        {
          仓库编号: '002',
          仓库名称: 'B区',
          仓库货位: 'B区1-2'
        },
        {
          仓库编号: '002',
          仓库名称: 'B区',
          仓库货位: 'B区2-1'
        },
        {
          仓库编号: '003',
          仓库名称: 'C区',
          仓库货位: 'C区1-1'
        },
        {
          仓库编号: '003',
          仓库名称: 'C区',
          仓库货位: 'C区1-2'
        },
        {
          仓库编号: '003',
          仓库名称: 'C区',
          仓库货位: 'C区1-3'
        }
      ],
      messageBoxType: {
        add: '仓库管理>新增',
        del: '仓库管理>删除',
        editorStorage: '仓库管理>修改'
      },
      isShowDelStorage: false,
      isShowAddStorage: false,
      isShowEditorStorage: false
    }
  },
  components: {
    DelStorage,
    ChangeStorage
  },
  methods: {
    delStorage () {
      this.isShowDelStorage = false
    },
    handleDelStorage () {
      this.isShowDelStorage = true
    },
    AddStorage () {
      this.isShowAddStorage = false
    },
    handleEditorStorage () {
      this.isShowEditorStorage = true
    },
    editorStorage () {
      this.isShowEditorStorage = false
    },
    // 列合并
    // arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
    //   if (columnIndex === 0) {
    //     if (row['仓库名称'] === 'A区') {
          
    //       if (rowIndex === 0) {
            
    //       }
    //     }
    //   } 
    // }
  }
}
</script>

<style lang="scss" scoped>
.storemanage {
  margin: 20px 30px;
  width: 400px;
  > p {
    margin-bottom: 20px;
    text-align: right;
  }
  img {
    vertical-align: middle;
    width: 13px;
    height: 15px;
    margin: 0 5px;
  }
}
</style>
