<template>
  <div class="storemanage">
  	<p>
      <el-button type="primary" size='medium' @click="isShowAddStorage=!isShowAddStorage">新增</el-button>
    </p>
    <el-table
      :data="tableData3"
      border
      size='small'>
      <el-table-column
        prop="仓库编号"
        label="仓库编号"
        align='center'
        width="150">
      </el-table-column>
      <el-table-column
        align='center'
        prop="仓库名称"
        label="仓库名称"
        width="150">
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
      currentPage:4,
      tableData3: [
        {
          仓库编号: '001',
          仓库名称: 'A区'
        },
        {
          仓库编号: '002',
          仓库名称: 'B区'
        },
        {
          仓库编号: '003',
          仓库名称: 'C区'
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
