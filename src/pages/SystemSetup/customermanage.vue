<template>
  <div class="customermanage">
  	<el-header>
      <div class="selectAddress">
        收货单位:
        <el-input
          v-model="client"
          placeholder="请输入收货单位"
          @change='filterClients'>
        </el-input>
      </div>
      <div class="buttons">
        <el-button size='medium' type="primary" @click='isShowAddCustom=!isShowAddCustom'>新增</el-button>
        <el-button size='medium' class="output" @click='handleOutput'>导出</el-button>
      </div>
    </el-header>
    <el-main>
      <el-table
        ref="multipleTable"
        :data="filterClients"
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
          prop="purchaser">
        </el-table-column>
        <el-table-column
          prop="address"
          label="收货地址"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="contact"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话"
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
            <span @click='handleEditorCustom(scope.row, scope.$index)'>
              <img src="@/assets/icon/系统管理-商品管理/修改IC.png">
            </span>
            <span @click='handleDelCustom(scope.row, scope.$index)'>
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
    <change-custom
      v-if='isShowAddCustom'
      :type='messageBoxType.add'
      @hideChangeCustom='changeCustom'></change-custom>
    <change-custom
      v-if='isShowEditorCustom'
      :type='messageBoxType.editor'
      :selectClient='selectClient'
      @hideChangeCustom='changeCustom'></change-custom>
    <del-custom
      v-if='isShowDelCustom'
      :type='messageBoxType.del'
      @hideDelCustom='delCustom'
      :selectClient='selectClient'></del-custom>
  </div>
</template>

<script>
import ChangeCustom from '@/components/SystemSetup/customermanage/changecustom'
import DelCustom from '@/components/SystemSetup/customermanage/delcustom'
import outputTable from '@/assets/js/outputTable'
export default {
  data () {
  	return {
      currentPage:4,
      messageBoxType: {
        add: '客户管理>新增',
        del: '客户管理>删除',
        editor: '客户管理>修改'
      },
      client: '',
      clients: [
        {
          address: '四川',
          purchaser: '成都有限公司',
          contact: '于先生',
          phone: '1229383744',
          email: '7899@hh.com'
        },
        {
          address: '四川',
          purchaser: '四川有限公司',
          contact: '于先生',
          phone: '1229383744',
          email: '7899@hh.com'
        }
      ],
      selectClient: {
        index: '',
        client: {}
      },
      isShowDelCustom: false,
      isShowEditorCustom: false,
      isShowAddCustom: false
    }
  },
  computed: {
    //筛选客户
    filterClients () {
      return this.clients.filter(item => {
        return item.purchaser.indexOf(this.client) > -1
      })
    },
  },
  components: {
    ChangeCustom,
    DelCustom
  },
  methods: {
    // 打开删除客户弹窗
    handleDelCustom (row, index) {
      this.selectClient.index = index
      this.selectClient.client = row
      this.isShowDelCustom = true
    },
    // 删除客户
    delCustom (bol) {
      console.log(bol)
      this.isShowDelCustom = false
      if (bol) {
        // this.$http.post(`${config.httpBaseUrl}/man/del_client/`, {
        // this.selectClient.client
        // }).then(res => {
        //   console.log(res)
        //   this.clients = res.data.content
        // })
        // 本地删除
        this.clients.splice(this.selectClient.index, 1)
      }
    },
    // 打开修改客户弹窗
    handleEditorCustom (row, index) {
      this.selectClient.index = index
      this.selectClient.client = row
      this.isShowEditorCustom = true
    },
    // 修改或增加客户
    changeCustom (client, type) {
      this.isShowEditorCustom = false
      this.isShowAddCustom = false
      if (client) {
        // 修改客户
        if (type === 'editor') {
          // 修改客户-本地
          this.clients.splice(this.selectClient.index, 1, client)
        } else if (type === 'add') {
          // 新增客户
          this.clients.push(client)
        }
      }
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    // 导出表格
    handleOutput () {
      outputTable(this.tableData3)
    },
    // 获取客户
    getClient (purchaser, address) {
    // this.$http.post(`${config.httpBaseUrl}/man/get_client/`, {
    // purchaser
    // address
    // }).then(res => {
    //   console.log(res)
    //   this.clients = res.data.content
    // })
    }
  },
  created () {
    // 获取所有客户
    this.getClient()
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  margin: 20px 0 0;
  > div {
    display: inline-block;
  }
  .selectAddress {
    width: 300px;
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
