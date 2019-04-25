<template>
  <div class="customermanage">
  	<el-header>
      <div class="selectAddress">
        收货单位:
        <el-input
          v-model="purchaser"
          placeholder="请输入收货单位"
          @change='filterClients'>
        </el-input>
      </div>
      <el-button size='medium' type="primary" @click="filterClients">搜索</el-button>
      <div class="buttons">
        <el-button size='medium' type="primary" @click='isShowAddCustom=!isShowAddCustom'>新增</el-button>
        <el-button size='medium' class="output" @click='handleOutput'>导出</el-button>
      </div>
    </el-header>
    <el-main>
      <el-table
        ref="multipleTable"
        :data="paginationData"
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
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-count='clients.length/pageSize'
          :page-size='pageSize'
          layout="total, prev, pager, next, jumper"
          :total="clients.length"
        ></el-pagination>
      </div>
    </el-main>
    <change-custom
      v-if='isShowAddCustom'
      :type='messageBoxType.add'
      @hideChangeCustom='addCustom'></change-custom>
    <change-custom
      v-if='isShowEditorCustom'
      :type='messageBoxType.editor'
      :selectClient='selectClient'
      @hideChangeCustom='editorCustom'></change-custom>
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
      messageBoxType: {
        add: '客户管理>新增',
        del: '客户管理>删除',
        editor: '客户管理>修改'
      },
      client: '',
      address:"",
      purchaser:"",
      clients: [
        // {
        //   address: '四川',
        //   purchaser: '成都有限公司',
        //   contact: '于先生',
        //   phone: '1229383744',
        //   email: '7899@hh.com'
        // },
        // {
        //   address: '四川',
        //   purchaser: '四川有限公司',
        //   contact: '于先生',
        //   phone: '1229383744',
        //   email: '7899@hh.com'
        // }
      ],
      selectClient: {
        index: '',
        client: {}
      },
      isShowDelCustom: false,
      isShowEditorCustom: false,
      isShowAddCustom: false,
      // 分页
      currentPage: 1,
      paginationData: [],
      pageSize: 5,
    }
  },
  computed: {
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
        const data = []
        data.push(this.selectClient.client)
        this.$http.post(`${config.httpBaseUrl}/man/del_client/`, 
          data
        ).then(res => {
          if (res.status === 1) {
            this.$message({
              message: '成功删除客户',
              type: 'success'
            })
          }
          this.getClient();
        })
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
    // 增加客户
    addCustom () {
      // if (client) {
      //   // 增加客户-本地
      //   this.clients.unshift(client)
      // }
      this.isShowAddCustom = false;
       this.getClient();
    },
    // 修改客户
    editorCustom (client) {
      if (client) {
        // 修改客户-本地
        this.clients.splice(this.selectClient.index, 1, client)
      }
      this.isShowEditorCustom = false
    },
    // 导出表格
    handleOutput () {
      outputTable(this.tableData3)
    },
    // 获取客户
    getClient (purchaser, address) {
      this.$http.post(`${config.httpBaseUrl}/man/get_client/`, {
        purchaser:this.purchaser,
        address:this.address,
      }).then(res => {
        this.clients = res.content
        // 刚打开页面时加载前pageSize项、且自动生成分页数量
        this.getPaginationData(this.currentPage)
      })
    },
    // 选中项改变
    handleSelectionChange () {},
    
    //筛选客户
    filterClients () {
      this.$http.post(`${config.httpBaseUrl}/man/get_client/`, {
          purchaser:this.purchaser,
          address:this.address

      }).then(res => {
        this.clients = res.content
        // 刚打开页面时加载前pageSize项、且自动生成分页数量
        this.getPaginationData(this.currentPage)
      })
    },
    // 分页
    getPaginationData (pageIndex) {
      const start = (pageIndex - 1) * this.pageSize
      const end = pageIndex * this.pageSize
      this.paginationData = this.clients.slice(start, end)
    },
    // 跳转至对应分页
    handleCurrentChange(val) {
      this.getPaginationData(val)
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
