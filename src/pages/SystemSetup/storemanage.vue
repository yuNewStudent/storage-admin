<template>
  <div class="storemanage">
  	<p>
      <el-button type="primary" size='medium' @click="isShowAddStorage=!isShowAddStorage">新增</el-button>
    </p>
    <el-table
      :data="paginationData"
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
          <!-- <span @click="handleEditorStorage(scope.$index, scope.row)">
            <img src="@/assets/icon/系统管理-商品管理/修改IC.png">
          </span> -->
          <span @click="handleDelStorage(scope.$index, scope.row)">
            <img src="@/assets/icon/系统管理-人员管理/删除IC.png">
          </span>
        </template>
      </el-table-column>
    </el-table>
     <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-count='tableData3.length/pageSize'
          :page-size='pageSize'
          layout="total, prev, pager, next, jumper"
          :total="tableData3.length"
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
import { setTimeout } from 'timers';
export default {
  data () {
  	return {
      // 分页
      currentPage: 1,
      paginationData: [],
      pageSize: 5,

      Deltor:{},
      editor:{},
      tableData3: [
        // {
        //   id: '001',
        //   name: 'A区',
        //   starge_rack: 'A区1-1'
        // }
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
  mounted(){
    this.Warehouse();
  },
  methods: {
    //仓库管理
    Warehouse(){
      this.$http
        .post(`${config.httpBaseUrl}/storage/get_repertory/`)
        .then(res => {
          if (res.status == 1) {
            this.tableData3 = res.content
            // 刚打开页面时加载前pageSize项、且自动生成分页数量
            this.getPaginationData(1)
          } else {
            return
          }
      })
    },
    delStorage () {
      this.isShowDelStorage = false
      this.Warehouse()
    },
    handleDelStorage (index,row) {
      this.Deltor=row
      this.isShowDelStorage = true
    },
    AddStorage () {
      this.isShowAddStorage = false
      setTimeout(() => {
        this.Warehouse()
      }, 500)
    },
    handleEditorStorage (index,row) {
      this.editor=row
      this.isShowEditorStorage = true
    },
    editorStorage () {
      this.isShowEditorStorage = false
      this.Warehouse()
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
    // 分页
    getPaginationData (pageIndex) {
      const start = (pageIndex - 1) * this.pageSize
      const end = pageIndex * this.pageSize
      this.paginationData = this.tableData3.slice(start, end)
    },
    // 跳转至对应分页
    handleCurrentChange(val) {
      this.getPaginationData(val)
    }
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
