<template>
  <div class="goodscounting">
    <el-header>
      <div class="selectStore">
        仓库名称:
        <el-select
          size='medium'
          v-model="filter.repertory"
          placeholder="请选择"
          clearable
          @change='handleFilter'>
          <el-option
            v-for="item in allStorage"
            :key="item.id"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </div>
      <div class="search">
        商品名称:
        <el-input
          v-model="filter.goods_name"
          placeholder="请输入商品名称"
          @change='handleFilter'></el-input>
      </div>
      <div class="search">
        商品状态:
        <el-select
          v-model="filter.status"
          clearable
          placeholder="请选择"
          @change='handleFilter'>
          <el-option
            v-for="item in ordersStatus"
            :key="item.id"
            :label="item.label"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <!-- <el-button type="primary" @click="handleFilter">搜索</el-button> -->
      <el-button type="primary" size="medium" @click="buttonaudit" class="output">导出</el-button>
    </el-header>
    <el-main>
      <el-table size='mini' :data="paginationData" @selection-change="handleSelectionChange" border style="width: 100%" :cell-style='warningStyle'>
        <el-table-column type='selection'>
        </el-table-column>
        <el-table-column prop='barcode' label="条形码">
        </el-table-column>
        <el-table-column prop='category' label="商品类别">
        </el-table-column>
        <el-table-column prop='name' label="商品名称">
        </el-table-column>
        <el-table-column prop='medicine_no' label="商品编码">
        </el-table-column>
        <el-table-column prop='specification' label="规格型号">
        </el-table-column>
        <el-table-column prop='unit' label="单位">
        </el-table-column>
        <el-table-column prop='location' label="所在货位">
        </el-table-column>
        <el-table-column prop='stock_quantity' label="当前库存">
        </el-table-column>
         <el-table-column prop="check_stock" label="盘点库存">
         </el-table-column>
        <el-table-column prop='estimated_price' label="采购单价">
        </el-table-column>
        <el-table-column prop="in_storage_time" label="购入时间"></el-table-column>
        <el-table-column prop="date_manufacture" label="生产日期"></el-table-column>
        <el-table-column prop="shelf_life" label="保质期"></el-table-column>
        <el-table-column prop="expired_time" label="到期时间"></el-table-column>
        <!-- <el-table-column prop="expired_time_warning" label="预警时间"></el-table-column> -->
        <el-table-column prop="last_in_storage_time" label="上次入库时间"></el-table-column>
        <!-- <el-table-column prop="address" label="库管员"></el-table-column>
        <el-table-column prop="address" label="联系电话"></el-table-column> -->
        <el-table-column prop="status" label="状态">
        </el-table-column>
        <el-table-column prop="datetime" label="盘点时间">
        </el-table-column>
        <el-table-column prop="reason" label="盈亏原因">
        </el-table-column>
      </el-table>
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-count='orders.length/pageSize'
          :page-size='pageSize'
          layout="total, prev, pager, next, jumper"
          :total="orders.length"
        ></el-pagination>
      </div>
    </el-main>
  </div>
</template>
<script>
import outputTable from '@/assets/js/outputTable'
export default {
  data() {
    return {
      orders: [],
      ordersStatus: [
        {
          label: '正常',
          id: 0
        },
        {
          label: '已过期',
          id: 1
        },
        {
          label: '预警状态',
          id: 2
        }
      ],
       goodsmalist:[],
      filter: {
        repertory: '',
        goods_name: '',
        status: ''
      },
      // 仓库
      allStorage: [
        // "仓库1",
        // "仓库2"
      ],
      // 分页
      currentPage: 1,
      paginationData: [],
      pageSize: 5
    };
  },
  components: {},
  created(){
    this.getOrders()
    // 获取所有仓库
    this.$http.post(`${config.httpBaseUrl}/storage/get_all_repertory/`).then(res => {
      if (res.status === 1) {
        this.allStorage = res.content
      }
    })
  },
  methods: {
    // 获取所有盘点订单
    getOrders(){
      const data = {
        all: 1
      }
      this.$http.post(`${config.httpBaseUrl}/medicine/query_inventory/`,data).then(res => {
        if(res.statuscode==1){
          this.orders = res.result
          // 刚打开页面时加载前pageSize项、且自动生成分页数量
          this.getPaginationData(this.currentPage)
        }else{
          return
        }
      })
    },
     handleSelectionChange (val) {
      this.goodsmalist=val;
    },
    // 筛选
    handleFilter () {
      const bol = this.filter.repertory || this.filter.goods_name ||  (this.filter.status + '').length
      if (!bol) {
        this.getOrders()
      } else {
        const data = {
          all: 0,
          repertory: this.filter.repertory,
          goods_name: this.filter.goods_name,
          status: this.filter.status !== '' ? this.filter.status : -1
        }
        this.$http.post(`${config.httpBaseUrl}/medicine/query_inventory/`, data)
        .then(res=>{
          
          console.log(res)
          if (res.statuscode === 1) {
            this.orders = res.result
            // 刚打开页面时加载前pageSize项、且自动生成分页数量
            this.getPaginationData(1)
          }
        })
      }
    },
    // 分页
    getPaginationData (pageIndex) {
      const start = (pageIndex - 1) * this.pageSize
      const end = pageIndex * this.pageSize
      this.paginationData = this.orders.slice(start, end)
    },
    // 跳转至对应分页
    handleCurrentChange(val) {
      this.currentPage = val
      this.getPaginationData(val)
    },
    buttonsave: function() {},
    buttonaudit: function() {
        var title="盘点查询.cvs";
      var name=[
        {value:"条形码"},
        {value:"商品名称"},
        {value:"当前库存"},
        {value:"盘点库存"},
        // {value:"规格型号"},
        {value:"购入时间"},
        {value:"所在货位"},
        {value:"商品类别"},
        {value:"商品编码"},
        {value:"规格型号"},
        {value:"单位"},
        {value:"盘点原因"},
        {value:"采购单价"},
        {value:"购入日期"},
        {value:"生产日期"},
        {value:"保质期"},
        {value:"到期时间"},
        {value:"上次入库时间"},
         {value:"盘点时间"},
         {value:"状态"},
      ]
      outputTable(this.goodsmalist,name,title)
    },
    warningStyle (row, column, rowIndex, columnIndex) {
      if (row.column.label === '最小值' || row.column.label === '最大值' ||row.column.label === '预警时间') {
        return 'background: pink' 
      }
    }
  }
};
</script>
<style lang='scss' scoped>
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
    width: 300px;
    .el-input {
      width: 200px;
    }
  }
  .output {
    float: right;
  }
}
.el-main {
  margin: 0 20px;
  padding: 0;
  
    h5 {
      margin: 30px 0 10px;
    }
}
</style>