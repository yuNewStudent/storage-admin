<template>
  <div class="goodscounting">
    <el-header>
      <div class="selectStore">
        仓库名称:
        <el-select
          size='medium'
          v-model="filter.storage"
          placeholder="请选择" 
          filterable
          clearable
          @change="handleFilter">
          <el-option
            v-for="item in storages"
            :key="item.name"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </div>
      <div class="search">
        商品状态:
        <el-select
          clearable
          v-model="filter.status"
          placeholder="请选择"
          @change="handleFilter">
          <el-option
            v-for="item in ordersStatus"
            :key="item.status"
            :label="item.label"
            :value="item.status">
          </el-option>
        </el-select>
      </div>
      <div class="search">
        商品名称:
        <el-input
          clearable
          v-model="filter.goods_name"
          @change='handleFilter'
          placeholder="请输入商品名称"></el-input>
      </div>
      <el-button type="primary" @click="goodsearch()">搜索</el-button>
      <!-- <el-button type="primary" size="medium" @click="handleOut" class="output">导出</el-button> -->
    </el-header>
    <el-main>
      <el-table
        :data="paginationData"
        border
        size='mini'
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          label='序号'
          width="55">
        </el-table-column>
        <el-table-column label="商品类别" prop='category'>
        </el-table-column>
        <el-table-column label="商品名称" prop='name'>
        </el-table-column>
        <el-table-column label="商品编码" prop='unit'>
        </el-table-column>
        <el-table-column label="所在货位" prop='location'>
        </el-table-column>
        <el-table-column label="商品总库存" prop='stock_quantity'>
        </el-table-column>
        <el-table-column label="商品状态">
          <!-- <span>{{orders.status}}</span> -->
          <template slot-scope="scope">
            <el-tag size='mini' type="success" v-if='scope.row.status=="正常"'>正常</el-tag>
            <el-tag size='mini' type="danger" v-else-if='scope.row.status=="已过期"'>已过期</el-tag>
            <el-tag size='mini' type="warning" v-else-if='scope.row.status=="预警装填"'>预警装填</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size='mini' @click="details(scope.$index, scope.row)">详情</el-button>
          </template>
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
      <h5>商品详情：</h5>
      <el-table size='mini' :data="orderInfo "  @selection-change="handleSelectionChange" border style="width: 100%" :cell-style='warningStyle'>
        <el-table-column type='selection' >
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
        <el-table-column label="盘点库存">
          <template slot-scope="scope">
            <el-input
              v-model="orderInfo[scope.$index].check_stock"></el-input>
          </template>
        </el-table-column>
        <!-- <el-table-column label="商品预警数"
          class-name='warning'>
          <el-table-column prop='waring_quantity_min' label="最小值">
          </el-table-column>
          <el-table-column prop='waring_quantity_max' label="最大值">
          </el-table-column>
        </el-table-column> -->
        <el-table-column prop='estimated_price' label="采购单价">
        </el-table-column>
        <el-table-column prop="in_storage_time" label="购入时间"></el-table-column>
        <el-table-column prop="date_manufacture" label="生产日期"></el-table-column>
        <el-table-column prop="shelf_life" label="保质期"></el-table-column>
        <el-table-column prop="expired_time" label="到期时间"></el-table-column>
        <!-- <el-table-column prop="address" label="预警时间"></el-table-column> -->
        <el-table-column prop="in_storage_time" label="上次入库时间"></el-table-column>
        <!-- <el-table-column prop="address" label="库管员"></el-table-column>
        <el-table-column prop="address" label="联系电话"></el-table-column> -->
        <el-table-column  label="状态">
          <template slot-scope="scope">
            <el-tag type="success" v-if='scope.row.status=="正常"'>正常</el-tag>
            <el-tag type="danger" v-else-if='scope.row.status=="已过期"'>已过期</el-tag>
            <el-tag type="warning" v-else-if='scope.row.status=="预警装填"'>预警装填</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="reason" label="盈亏原因">
          <template slot-scope="scope">
            <el-input v-model="orderInfo[scope.$index].reason"></el-input>
         </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-button
          @click="inventory"
          type='primary'>盘点</el-button>
      </el-row>
    </el-main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      filter: {
        status: '',
        goods_name: '',
        storage: ''
      },
      orders: [
  //      {
  //       "id": "000001",
  //       "category":"商品类别",
  //       "name": "商品名称",
  //       "unit": "单位",
  //       "location": "所在位置",
  //       "stock_quantity": 20, 
  //       "waring_quantity_min": 10,
  //       "waring_quantity_max": 100,
  //       "estimated_price": 2.3,
  //       "comment": "商品备注",
  //       "status": "正常"
  //   },
      ],
      orderInfo : [
    //     {
    //     "barcode":"条形码",
    //     "name":"商品名称",
    //     "category":"商品类别",
    //     "medicine_no":"商品编码",
    //     "specification":"商品规格",
    //     "location": "所在位置",
    //     "stock_quantity":"库存",
    //     "estimated_price":"预估价格",
    //     "date_manufacture":"生产日期",
    //     "shelf_life":"保质期",
    //     "expired_time":"过期时间",
    //     "in_storage_time":"上次入库时间",
    //     "reason":"",
    // }
      ],
      multipleSelection:[],
      ordersStatus: [
        {
          label: '正常',
          status:0,
        },
        {
          label: '已过期',
          status:1,
        },
        {
          label: '预警状态',
          status:2
        }
      ],
      storages: [
        // {
        //   value: "选项1",
        //   label: "A区"
        // }
      ],
      // 分页
      currentPage: 1,
      paginationData: [],
      pageSize: 5
    };
  },
  components: {},
  created () {
    this.getOrders()
    this.getStorages()
  },
  methods: {
    // 获取所有仓库
    getStorages () {
      this.$http.post(`${config.httpBaseUrl}/storage/get_all_repertory/`).then(res=>{
        if(res.status==1){
          this.storages = res.content;
          console.log(this.options)
        }else{
          return
        }
      })
    },
    //详情
    details (index, row) {
      this.$http.post(`${config.httpBaseUrl}/medicine/detail_goods/`, {
        name: row.name
      }).then(res => {
        console.log(res)
        if (res.status == 1) {
          this.orderInfo = res.content
        } else {
          return
        }
      })
    },
    // 筛选盘点订单
    handleFilter(){
      const data = {
        all: 0,
        repertory: this.filter.storage,
        goods_name: this.filter.goods_name,
        status: this.filter.status === '' ? -1 : this.filter.status
      }
      this.$http.post(`${config.httpBaseUrl}/medicine/get_goodsStatus/`, data).then(res=>{
          if(res.status==1){
            this.orders=res.content
            // 刚打开页面时加载前pageSize项、且自动生成分页数量
            this.getPaginationData(1)
          }else{
            return
          }
        })
    },
    //获取所有货物盘点订单
    getOrders () {
      this.$http.post(`${config.httpBaseUrl}/medicine/get_goodsStatus/`,{
        all:1
      }).then(res=>{
        if (res.status == 1) {
          this.orders=res.content
          // 刚打开页面时加载前pageSize项、且自动生成分页数量
          this.getPaginationData(1)
        }else{
          return
        }
      })
    },
    // 盘点
    inventory () {
      const data = []
      this.orderInfo.forEach(v => {
        data.push({
          datetime: this.moment(new Date()).format('YYYY-MM-DD HH'),
          barcode: v.barcode,
          name: v.name,
          check_stock: v.check_stock,
          reason: v.reason,
          person: JSON.parse(this.$cookie.get('user')).name
        })
      })
      this.$http.post(`${config.httpBaseUrl}/medicine/add_inventory/`, data)
      .then(res => {
        console.log(res)
        if(res.status == 1){
          this.$message({
            message: res.content,
            type: 'success'
          })
        }else{
          return
        }
      })
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
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
    // 导出
    handleOut: function() {},
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
  margin: 0 20px 20px;
  padding: 0;
  h5 {
    margin: 70px 0 10px;
  }
  .el-row {
    margin-top: 10px;
    float: right;
  }
}
</style>