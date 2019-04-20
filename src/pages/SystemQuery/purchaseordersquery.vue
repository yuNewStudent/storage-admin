<template>
  <div class="purchaseordersquery">
    <el-header>
      <div class="selectStore">
        订单号:
        <el-select v-model="filter.receipt_no" filterable placeholder="请输入仓库名称">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="search">
        申请人:
        <el-input placeholder="请输入申请人" v-model="filter.applicant"></el-input>
      </div>
       <el-button
        @click='handleFilter'
        type="primary">搜索</el-button>
      <div class="select_date">
        日期选择:
        <el-date-picker
          v-model="filter.apply_datetime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="out_put">
        <el-button type="primary" size="medium" @click="buttonaudit">导出</el-button>
      </div>
    </el-header>
    <div class="purchaseordersquery_list">
      <el-table
        :data="purchaseOrders"
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
        <el-table-column prop="applicant" label="申请人"></el-table-column>
        <el-table-column prop="purpose" label="申请用途"></el-table-column>
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
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      input10: "",
      currentPage:4,
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
      ],
      options: [
        {
          value: "选项1",
          label: "A区"
        },
        {
          value: "选项2",
          label: "B区"
        },
        {
          value: "选项3",
          label: "C区"
        },
        {
          value: "选项4",
          label: "D区"
        },
        {
          value: "选项5",
          label: "F区"
        }
      ],
      value: "",
      value1: ""
    };
  },
  components: {

  },
  mounted(){ 
    this.warehouselist();
  },
  methods: {
     warehouselist(){
      const data = {
        all: 0,
        receipt_no: this.filter.receipt_no,
        applicant: this.filter.applicant,
        apply_datetime_start: this.filter.apply_datetime.length ? this.moment(this.filter.apply_datetime[0]).format("YYYY-MM-DD") : '',
        apply_datetime_end: this.filter.apply_datetime.length ? this.moment(this.filter.apply_datetime[1]).format("YYYY-MM-DD") : ''
      };
      console.log(data)
      this.$http.post(`${config.httpBaseUrl}/medicine/query_in_storage/`,data).then(res => {
             if(res.status==1){
               this.purchaseOrders=res.content;
             }else{
               return
             }
        })
    },
    // 筛选
    handleFilter () {
      const data = {
        all: 0,
        receipt_no: this.filter.receipt_no,
        applicant: this.filter.applicant,
        apply_datetime_start: this.filter.apply_datetime.length ? this.moment(this.filter.apply_datetime[0]).format("YYYY-MM-DD") : '',
        apply_datetime_end: this.filter.apply_datetime.length ? this.moment(this.filter.apply_datetime[1]).format("YYYY-MM-DD") : ''
      }
      this.$http.post(`${config.httpBaseUrl}/medicine/query_in_storage/`, data).then(res=>{
        console.log(res)      
        this.purchaseOrders=res.content;
      })
    },
    onSubmit() {
      console.log("submit!");
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
      handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    buttonsave: function() {},
    buttonaudit: function() {}
  },
  created () {
    // this.$http.post('${config.httpBaseUrl}/medicine/query_in_storage/',{
    //   all: 1
    // }).then(res=>{
    //   console.log(res)      
    //   this.purchaseOrders=res.purchaseOrders;
    // })
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
    .el-select {
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