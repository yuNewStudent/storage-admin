<template>
  <div class="customermanage">
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
        <el-input size='medium' placeholder="请输入供货单位"></el-input>
        <el-button size='medium' type="primary">搜索</el-button>
      </div>
      <div class="buttons">
        <el-button size='medium' type="primary" @click='isShowAddCustom=!isShowAddCustom'>新增</el-button>
        <el-button size='medium' class="del" @click='handleDelCustom'>删除</el-button>
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
          width="50">
        </el-table-column>
        <el-table-column
          label="收货单位"
          prop="company">
        </el-table-column>
        <el-table-column
          prop="address"
          label="收货地址"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="fox"
          label="传真"
          width="120">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱">
        </el-table-column>
        <el-table-column
          label="操作"
          align='center'>
          <template slot-scope="scope">
            <span @click="handleEditorCustom">
              <img src="@/assets/icon/系统管理-商品管理/修改IC.png">
            </span>
            <span>
              <img src="@/assets/icon/系统管理-人员管理/删除IC.png">
            </span>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <change-custom
      v-if='isShowAddCustom'
      :type='messageBoxType.add'
      @hideChangeCustom='addCustom'></change-custom>
    <change-custom
      v-if='isShowEditorCustom'
      :type='messageBoxType.editor'
      @hideChangeCustom='editorCustom'></change-custom>
    <del-custom
      v-if='isShowDelCustom'
      :type='messageBoxType.del'
      @hideDelCustom='delCustom'></del-custom>
  </div>
</template>

<script>
import ChangeCustom from '@/components/SystemSetup/customermanage/changecustom'
import DelCustom from '@/components/SystemSetup/customermanage/delcustom'
import outputTable from '@/assets/js/outputTable'
export default {
  data () {
  	return {
      messageBoxType: {
        add: '客户管理>新增',
        del: '客户管理>删除',
        editor: '客户管理>修改'
      },
      tableData3: [
        {
          address: '四川',
          company: '有限公司',
          fox: '099-223-2',
          userName: '于先生',
          phone: '1229383744',
          email: '7899@hh.com'
        },
        {
          address: '四川',
          company: '有限公司',
          fox: '099-223-2',
          userName: '于先生',
          phone: '1229383744',
          email: '7899@hh.com'
        }
      ],
      isShowDelCustom: false,
      isShowEditorCustom: false,
      isShowAddCustom: false
    }
  },
  components: {
    ChangeCustom,
    DelCustom
  },
  methods: {
    delCustom () {
      this.isShowDelCustom = false
    },
    addCustom () {
      this.isShowAddCustom = false
    },
    handleDelCustom () {
      this.isShowDelCustom = true
    },
    handleEditorCustom () {
      this.isShowEditorCustom = true
    },
    editorCustom () {
      this.isShowEditorCustom = false
    },
    // 导出表格
    handleOutput () {
      outputTable(this.tableData3)
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
    float: right;
    font-size: 14px;
    .del,.output {
      background: transparent;
      color: #87baef;
      border: 1px solid #87baef;
    }
  }
}
.el-main {
  padding: 0 20px;
  margin: 0;
  img {
    vertical-align: middle;
    width: 13px;
    height: 15px;
    margin: 0 5px;
  }
}
</style>
