<template>
  <div class="suppliermanagement">
  	<el-header>
      <div class="search">
        供货单位:
        <el-input size='medium' v-model="supplier" placeholder="请输入供货单位"></el-input>
        <el-button size='medium' type="primary" @click="searchbutton(supplier)">搜索</el-button>
      </div>
      <!-- <div class="selectAddress">
        供货单位:
        <el-select size='medium' v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div> -->
      <!-- <div class="search">
        供货单位:
        <el-input size='medium' placeholder="请输入供货单位"></el-input>
        <el-button size='medium' type="primary">搜索</el-button>
      </div> -->
      <div class="buttons">
        <el-button size='medium' type="primary" @click='isShowAddSupplier=!isShowAddSupplier'>新增</el-button>
        <!-- <el-button size='medium' class="del" @click='handleDelSupplier'>删除</el-button> -->
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
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          width="55">
        </el-table-column>
        <el-table-column
          label="供货单位"
          prop='supplier'>
        </el-table-column>
        <el-table-column
          prop="address"
          label="供货位置">
        </el-table-column>
        <el-table-column
          prop="contact"
          label="联系人"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="phone"
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
        <el-table-column
          label="操作"
          align='center'
          width="120">
          <template slot-scope="scope">
            <span @click="handleEditorSupplier(scope.$index, scope.row)">
              <img src="@/assets/icon/系统管理-商品管理/修改IC.png">
            </span>
            <span @click="handleDelSuppli(scope.$index, scope.row)">
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
    </el-main>
    <change-supplier
      :type='messageBoxType.add'
      v-if='isShowAddSupplier'
      @hideChangeSupplier='addSupplier'></change-supplier>
    <change-supplier
      :type='messageBoxType.editor'
      v-if='isShowEditorSupplier'
      @hideChangeSupplier='editorSupplier' :ediore="ediore"></change-supplier>
    <del-supplier
      :type='messageBoxType.del'
      v-if='isShowDelSupplier'
      @hideDelSupplier='delSupplier' :multiple="multiple"></del-supplier>
  </div>
</template>

<script>
import ChangeSupplier from '@/components/SystemSetup/suppliermanagement/changesupplier'
import DelSupplier from '@/components/SystemSetup/suppliermanagement/delsupplier'
import outputTable from '@/assets/js/outputTable'
export default {
  data () {
  	return {
      multipleSelection:{},
      multiple:{},
      ediore:{},
      messageBoxType: {
        add: '供应商管理>新增',
        del: '供应商管理>删除',
        editor: '供应商管理>修改'
      },
      isShowAddSupplier: false,
      isShowDelSupplier: false,
      isShowEditorSupplier: false,
      supplier:"",
      tableData3: [
        // {
        //   purchaser: '四川某某有限公司',
        //   address: '四川省成都市锦江区XXX',
        //   contact: '方先生',
        //   phone: '1820801777',
        // }
      ],
      
      // 分页
      currentPage: 1,
      paginationData: [],
      pageSize: 5,
    }
  },
  components: {
    ChangeSupplier,
    DelSupplier
  },
  mounted(){
    this.Warehouse();
  },
  methods: {
    Warehouse(){
      this.$http
        .post(`${config.httpBaseUrl}/man/get_supplier/`,{
          supplier:"",
          address:"",
        })
        .then(res => {
          if (res.status == 1) {
            this.tableData3 = res.content
            // 刚打开页面时加载前pageSize项、且自动生成分页数量
            this.getPaginationData(this.currentPage)
          } else {
            return;
          }
        })
    },
    searchbutton(supplier){
       this.$htttp.post(`${config.httpBaseUrl}/man/get_supplier/`, {
                  supplier: supplier,
                })
                .then(res => {
                  this.tableData3=res.status
                });
        },
    //选中
    handleSelectionChange(val){
    this.multipleSelection = val;
    },
    delSupplier (bol) {
      this.isShowDelSupplier = false
      this.Warehouse()
    },
    addSupplier (bol){
      this.isShowAddSupplier = false;
      this.Warehouse();
    },
    // handleDelSupplier (tableData3) {
    //   // this.multipleSelection = val;
    //   this.isShowDelSupplier = true;
    // },
    handleDelSuppli(index,row){
      this.isShowDelSupplier = true;
      this.multiple= row;
    },
    handleEditorSupplier (index,row) {
      this.ediore=row;
      this.isShowEditorSupplier = true
    },
    editorSupplier (bol) {
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
