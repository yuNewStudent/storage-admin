<template>
  <div class="suppliermanagement">
  	<el-header>
      <div class="selectAddress">
        供货地:
        <el-select size='medium' v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="search">
        供货单位:
        <el-input size='medium' placeholder="请输入供货单位"></el-input>
        <el-button size='medium' type="primary">搜索</el-button>
      </div>
      <div class="buttons">
        <el-button size='medium' type="primary" @click='isShowAddSupplier=!isShowAddSupplier'>新增</el-button>
        <el-button size='medium' class="del" @click='handleDelSupplier'>删除</el-button>
        <el-button size='medium' class="output" @click='handleOutput'>导出</el-button>
      </div>
    </el-header>
    <el-main>
      <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        border
        size='mini'
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        
        <el-table-column
          type="index"
          width="55">
        </el-table-column>
        <el-table-column
          label="供货单位"
          prop='suplierPar'>
        </el-table-column>
        <el-table-column
          prop="suplierAddress"
          label="供货位置">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="联系人"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="fox"
          label="联系电话"
          show-overflow-tooltip>
        </el-table-column>
        <!-- <el-table-column
          prop="fox"
          label="传真"
          show-overflow-tooltip> -->
        <!-- </el-table-column> -->
        <!-- <el-table-column
          prop="remarks"
          label="备注"
          show-overflow-tooltip> -->
        </el-table-column>
        <el-table-column
          label="操作"
          align='center'
          width="120">
          <template slot-scope="scope">
            <span @click="handleEditorSupplier">
              <img src="@/assets/icon/系统管理-商品管理/修改IC.png">
            </span>
            <span>
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
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        ></el-pagination>
      </div>
    </el-main>
    <change-supplier
      :type='messageBoxType.add'
      v-if='isShowAddSupplier'
      @hideChangeSupplier='addSupplier'></change-supplier>
    <change-supplier
      :type='messageBoxType.editor'
      v-if='isShowEditorSupplier'
      @hideChangeSupplier='editorSupplier'></change-supplier>
    <del-supplier
      :type='messageBoxType.del'
      v-if='isShowDelSupplier'
      @hideDelSupplier='delSupplier'></del-supplier>
  </div>
</template>

<script>
import ChangeSupplier from '@/components/SystemSetup/suppliermanagement/changesupplier'
import DelSupplier from '@/components/SystemSetup/suppliermanagement/delsupplier'
import outputTable from '@/assets/js/outputTable'
export default {
  data () {
  	return {
       currentPage:4,
      messageBoxType: {
        add: '供应商管理>新增',
        del: '供应商管理>删除',
        editor: '供应商管理>修改'
      },
      isShowAddSupplier: false,
      isShowDelSupplier: false,
      isShowEditorSupplier: false,
      tableData3: [
        {
          suplierPar: '四川某某有限公司',
          suplierAddress: '四川省成都市锦江区XXX',
          userName: '方先生',
          phone: '1820801777',
          fox: '010-223-3-33',
          remarks: ''
        },
        {
          suplierPar: '四川某某有限公司',
          suplierAddress: '四川省成都市锦江区XXX',
          userName: '方先生',
          phone: '1820801777',
          fox: '010-223-3-33',
          remarks: ''
        }
      ],
    }
  },
  components: {
    ChangeSupplier,
    DelSupplier
  },
  methods: {
    delSupplier () {
      this.isShowDelSupplier = false
    },
    addSupplier () {
      this.isShowAddSupplier = false
    },
    handleDelSupplier () {
      this.isShowDelSupplier = true
    },
    handleEditorSupplier () {
      this.isShowEditorSupplier = true
    },
    editorSupplier () {
      this.isShowEditorSupplier = false
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    // 导出表格
    handleOutput () {
      outputTable(tableData3)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  margin: 20px 0 0;
  > div {
    display: inline-block;
  }
  .selectStore {
    width: 250px;
    .el-select {
      width: 150px;
    }
  }
  .search {
    margin-left: 40px;
    width: 400px;
    .el-input {
      width: 200px;
    }
  }
  .buttons {
    font-size: 14px;
    float: right;
    .del,.output {
      background: transparent;
      color: #87baef;
      border: 1px solid #87baef;
    }
  }
}
.el-main {
  padding: 0 20px;
  img {
    vertical-align: middle;
    width: 13px;
    height: 15px;
    margin: 0 5px;
  }
}
</style>
