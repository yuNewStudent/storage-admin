<template>
  <div class="suppliermanagement">
  	<el-header>
      <div class="selectAddress">
        供货地:
        <el-select v-model="value" placeholder="请选择">
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
        <el-input placeholder="请输入供货单位"></el-input>
        <el-button type="primary">搜索</el-button>
      </div>
      <div class="buttons">
        <el-button type="primary" @click='isShowAddSupplier=!isShowAddSupplier'>新增</el-button>
        <el-button class="del" @click='handleDelSupplier'>删除</el-button>
        <el-button class="output">导出</el-button>
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
          label="日期"
          width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          align='center'
          width="150">
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
export default {
  data () {
  	return {
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
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
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
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  margin: 30px 0 0;
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
    .del,.output {
      background: transparent;
      color: #87baef;
      border: 1px solid #87baef;
    }
  }
}
.el-main {
  img {
    vertical-align: middle;
    width: 13px;
    height: 15px;
    margin: 0 5px;
  }
}
</style>
