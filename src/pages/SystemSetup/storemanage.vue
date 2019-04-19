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
        prop="id"
        label="仓库编号"
        align='center'>
      </el-table-column>
      <el-table-column
        align='center'
        prop="name"
        label="仓库名称">
      </el-table-column>
      <el-table-column
        align='center'
        prop="starge_rack"
        label="仓库货位">
      </el-table-column>
      <el-table-column
        align='center'
        label="操作">
        <template slot-scope="scope">
          <span @click="handleEditorStorage(scope.$index, scope.row)">
            <img src="@/assets/icon/系统管理-商品管理/修改IC.png">
          </span>
          <span @click="handleDelStorage(scope.$index, scope.row)">
            <img src="@/assets/icon/系统管理-人员管理/删除IC.png">
          </span>
        </template>
      </el-table-column>
    </el-table>
     <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="200"
          layout="total, sizes, prev, pager, next, jumper"
          :total="20"
        ></el-pagination>
      </div>
    <del-storage
      :type='messageBoxType.del'
      v-if='isShowDelStorage'
      @hideDelStorage='delStorage' :Deltor="Deltor"></del-storage>
  <change-storage
    :type='messageBoxType.add'
    v-if='isShowAddStorage'
    @hideChangeStorage='AddStorage'></change-storage>
  <change-storage
  :type='messageBoxType.editorStorage'
  v-if='isShowEditorStorage'
  @hideChangeStorage='editorStorage'
  :editor="editor"></change-storage>
  </div>
</template>

<script>
import DelStorage from '@/components/SystemSetup/storemanage/delstorage.vue'
import ChangeStorage from '@/components/SystemSetup/storemanage/changestorage.vue'
export default {
  data () {
  	return {
      currentPage:4,
      Deltor:{

      },
      editor:{

      },
      tableData3: [
        {
          id: '001',
          name: 'A区',
          starge_rack: 'A区1-1'
        },
        {
          id: '002',
          name: 'A区',
          starge_rack: 'A区1-1'
        },
        {
          id: '003',
          name: 'A区',
          starge_rack: 'A区1-1'
        },
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
    handleDelStorage (index,row) {
      this.Deltor=row;
      this.isShowDelStorage = true
    },
    AddStorage (tableData3) {
      this.tableData3=tableData3;
      this.isShowAddStorage = false
    },
    handleEditorStorage (index,row) {
      this.editor=row;
      this.isShowEditorStorage = true
    },
    editorStorage () {
      this.isShowEditorStorage = false
    },
    // 列合并
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (row['仓库名称'] === 'A区') {
          
          if (rowIndex === 0) {
            
          }
        }
      } 
    },
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
  }
}
</script>

<style lang="scss" scoped>
.storemanage {
  margin: 20px 30px;
  width: 600px;
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
