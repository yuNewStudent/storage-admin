<template>
  <div class="stockquery">
    <el-header>
      <div class="selectStore">
        仓库选择:
        <el-select
          filterable
          clearable
          v-model="filter.repertory"
          placeholder="请输入仓库名称"
          @change="handleFilter">
          <el-option
            v-for="item in allStorage"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </div>
      <div class="search">
        商品名称:
        <el-input
          v-model="filter.goods_name"
          placeholder="请输入商品名称"
          @change="handleFilter"></el-input>
      </div>
      <div class="search">
        商品状态:
        <el-select
          filterable v-model="filter.status"
          clearable
          placeholder="请选择"
          @change="handleFilter">
          <el-option
            v-for="item in ordersStatus"
            :key="item.value"
            :label="item.label"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <!-- <el-button type="primary" @click="handleFilter">搜索</el-button> -->
      <div class="out_put">
        <el-button type="primary" size="medium" @click="handleOutput">导出</el-button>
      </div>
    </el-header>
    <div class="stockquery_list">
      <el-table size="mini" :data="paginationData" border style="width: 100%">
        <el-table-column type="selection"></el-table-column>
        <el-table-column label='序号' type="index"></el-table-column>
        <el-table-column prop="barcode" label="条形码"></el-table-column>
        <el-table-column prop="category" label="商品类别"></el-table-column>
        <el-table-column prop="name" label="商品名称"></el-table-column>
        <el-table-column prop="medicine_no" label="商品编码"></el-table-column>
        <el-table-column prop="specification" label="规格型号"></el-table-column>
        <el-table-column prop="unit" label="单位"></el-table-column>
        <el-table-column prop="location" label="所在货位"></el-table-column>
        <el-table-column prop="stock_quantity" label="商品库存"></el-table-column>
        <!-- <el-table-column label="商品预警数"
          class-name='warning'>
          <el-table-column prop='goodsMinNum' label="最小值">
          </el-table-column>
          <el-table-column prop='goodsMaxNum' label="最大值">
        </el-table-column>-->
        <el-table-column prop="estimated_price" label="采购单价"></el-table-column>
        <el-table-column prop="in_storage_time" label="购入时间"></el-table-column>
        <el-table-column prop="date_manufacture" label="生产日期"></el-table-column>
        <el-table-column prop="shelf_life" label="保质期"></el-table-column>
        <el-table-column prop="expired_time" label="到期时间"></el-table-column>
        <el-table-column prop="expired_time_warning" label="预警时间"></el-table-column>
        <el-table-column prop="last_in_storage_time" label="上次入库时间"></el-table-column>
        <!-- <el-table-column prop="address" label="库管员"></el-table-column>
        <el-table-column prop="address" label="联系电话"></el-table-column>-->
        <el-table-column prop="status" label="状态"></el-table-column>
      </el-table>
    </div>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      ordersStatus: [
        {
          label: "正常",
          id: 0
        },
        {
          label: "已过期",
          id: 1
        },
        {
          label: "预警状态",
          id: 2
        }
      ],
      orders: [
        // {
        //   category: "医药",
        //   commodity: "阿莫西林",
        //   specifications: "1/23/25",
        //   number: "2",
        //   number1: "1",
        //   unit: "箱",
        //   warehouse: "A区",
        //   Barcode: "12123343344",
        //   agent: "李先生",
        //   outboundthedata: "2019/03/28",
        //   putthedata: "2019/03/30",
        //   procurement: "治疗",
        //   note: "希望尽快发货"
        // }
      ],
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
    }
  },
  components: {},
  mounted() {
    this.inventorylist()
    // 获取所有仓库
    this.$http.post(`${config.httpBaseUrl}/storage/get_all_repertory/`).then(res => {
      if (res.status === 1) {
        this.allStorage = res.content
      }
    })
  },
  methods: {
    // 筛选
    // 筛选条件为空
    handleFilter () {
      const bol = this.filter.repertory || (this.filter.status + '').length || this.filter.goods_name
      if (!bol) {
        this.inventorylist()
      } else {
        const data = {
          all: 0,
          repertory: this.filter.repertory,
          goods_name: this.filter.goods_name,
          status: this.filter.status ? this.filter.status : -1
        }
        console.log(data)
        this.$http.post(`${config.httpBaseUrl}/medicine/query_in_storage/`, data).then(res=>{
          if (res.status === 1) {
            this.orders = res.content
            // 刚打开页面时加载前pageSize项、且自动生成分页数量
            this.getPaginationData(1)
          }
        })
      }
    },
    // 获取库存商品
    inventorylist() {
      const data = {
        all: 1
      }
      this.$http
        .post(`${config.httpBaseUrl}/medicine/query_stock/`, data)
        .then(res => {
          if (res.status == 1) {
            this.orders = res.content
            
          // 刚打开页面时加载前pageSize项、且自动生成分页数量
          this.getPaginationData(this.currentPage)
          } else {
            return;
          }
        });
    },
    // 导出
    handleOutput: function() {},
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
  }
};
</script>
<style lang='scss' scoped>
.stockquery {
  padding: 0 20px;
}
.el-header {
  margin: 20px 0 0;
  padding: 0;
  > div {
    display: inline-block;
  }
  .selectStore {
    width: 250px;
    .el-select {
      width: 150px;
    }
  }
  .select_date {
    margin-left: 100px;
  }
  .search {
    width: 300px;
    .el-input {
      width: 200px;
    }
  }
  .out_put {
    float: right;
  }
}
.goodsmovequery {
  padding: 0 20px;
}
.stockquery_list {
  margin-top: 20px;
}
</style>