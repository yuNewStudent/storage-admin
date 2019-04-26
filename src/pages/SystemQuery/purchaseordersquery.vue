<template>
  <div class="purchaseordersquery">
    <el-header>
      <div class="selectStore">
        订单号:
        <el-input
          @change='handleFilter'
          v-model="filter.receipt_no"
          placeholder="请输入订单号">
        </el-input>
      </div>
      <div class="search">
        申请人:
        <el-input
          @change='handleFilter'
          placeholder="请输入申请人"
          v-model="filter.applicant"></el-input>
      </div>
      <div class="select_date">
        日期选择:
        <el-date-picker
          v-model="filter.apply_datetime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change='handleFilter'>
        </el-date-picker>
      </div>
      <!-- <el-button
        @click='handleFilter'
        type="primary">搜索</el-button> -->
      <div class="out_put">
        <el-button type="primary" size="medium" @click="buttonaudit">导出</el-button>
      </div>
    </el-header>
    <div class="purchaseordersquery_list">
      <el-table
        :data="paginationData"
        border
        size='small'
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label='序号'
          type="index"
          width="55">
        </el-table-column>
        <el-table-column prop="receipt_no" label="采购订单号"></el-table-column>
         <el-table-column prop="applicant" label="申请人"></el-table-column>
        <el-table-column prop="supplier" label="供应商"></el-table-column>
        <el-table-column prop="category" label="商品类别"></el-table-column>
        <el-table-column prop="name" label="商品名称"></el-table-column>
        <el-table-column prop="specification" label="商品规格"></el-table-column>
        <el-table-column prop="unit" label="单位"></el-table-column>
        <el-table-column prop="location" label="所在仓库"></el-table-column>
        <el-table-column prop="barcode" label="条形码"></el-table-column>
        <el-table-column prop="in_number" label="入库数量"></el-table-column>
        <el-table-column prop="date_manufacture" label="生产日期"></el-table-column>
        <el-table-column prop="shelf_life" label="保质期"></el-table-column>
        <el-table-column prop="expired_time" label="到期时间"></el-table-column>
        <el-table-column prop="expired_time_warning" label="到期时间预警"></el-table-column>
        <el-table-column prop="estimated_price" label="商品单价">
        </el-table-column>
        <el-table-column prop="estimated_money" label="商品总价">
        </el-table-column>
        <el-table-column prop="purpose" label="申请用途"></el-table-column>
      </el-table>
       <div class="block">
        <span class="demonstration"></span>
        <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-count='purchaseOrders.length/pageSize'
        :page-size='pageSize'
        layout="total, prev, pager, next, jumper"
        :total="purchaseOrders.length"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 分页
      currentPage: 1,
      paginationData: [],
      pageSize: 5,
      filter: {
        receipt_no: '',
        applicant: '',
        apply_datetime: []
      },
      purchaseOrders: [
        // {
        //   receipt_no: 123,
        //   supplier: '四川哈哈哈公司',
        //   category: "医药",
        //   name: "阿莫西林",
        //   specification: '商品规格',
        //   unit: "箱",
        //   location: 'A区是是是',
        //   barcode: '条形码',
        //   in_number: 10,
        //   estimated_price: 1.2,
        //   estimated_money: 12,
        //   warehouse: 'A区',
        //   date_manufacture: '201-233-22',
        //   shelf_life: '12个月',
        //   expired_time: '2023-23-2',
        //   expired_time_warning: '2023-23-2',
        //   applicant: '李先生',
        //   purpose: 'ddd'
        // }
      ]
    };
  },
  components: {

  },
  mounted(){ 
    this.getOrders();
  },
  methods: {
    // 获取所有入库单
     getOrders(){
      this.$http.post(`${config.httpBaseUrl}/medicine/query_in_storage/`, {
        all: 1
      }).then(res=>{     
        if (res.status === 1) {
          this.purchaseOrders = res.content
          
          // 刚打开页面时加载前pageSize项、且自动生成分页数量
          this.getPaginationData(1)
        }
      })
    },
    // 筛选
    handleFilter () {
      const bol = this.filter.receipt_no || this.filter.apply_datetime ||  this.filter.applicant
      if (!bol) {
        this.getOrders()
      } else {
        const data = {
          all: 0,
          receipt_no: this.filter.receipt_no,
          applicant: this.filter.applicant,
          apply_datetime_start: this.filter.apply_datetime.length ? this.moment(this.filter.apply_datetime[0]).format("YYYY-MM-DD") : '',
          apply_datetime_end: this.filter.apply_datetime.length ? this.moment(this.filter.apply_datetime[1]).format("YYYY-MM-DD") : ''
        }
        this.$http.post(`${config.httpBaseUrl}/medicine/query_in_storage/`, data).then(res=>{
          if (res.status === 1) {
            this.purchaseOrders = res.content
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
      this.paginationData = this.purchaseOrders.slice(start, end)
    },
    // 跳转至对应分页
    handleCurrentChange(val) {
      this.currentPage = val
      this.getPaginationData(val)
    },
    buttonaudit: function() {}
  },
  created () {
  }
}
</script>
<style lang='scss' scoped>
.purchaseordersquery {
  padding: 0 30px;
}
.el-header {
  margin: 20px 0 0;
  padding: 0;
  >div {
    display: inline-block;
  }
  .selectStore {
    width: 200px;
    .el-input {
      width: 130px;
    }
  }
  .select_date {
    margin-left: 20px;
  }
  .search {
    margin-left: 20px;
    width: 260px;
    .el-input {
      width: 200px;
    }
  }
  .out_put {
    float: right;
  }
}

</style>