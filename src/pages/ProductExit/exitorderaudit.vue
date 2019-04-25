<template>
  <div class="exitorderaudit">
    <el-header>
      <div class="selectStore">
        申请人:
        <el-select
          size="medium"
          filterable
          clearable
          @change="filterOrders"
          v-model="filter.applicant"
          placeholder="请输入经办人">
          <el-option
            v-for="item in applicants"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </div>
      <div class="selectStore">
        订单状态:
        <el-select
          size="medium"
          clearable
          filterable
          @change="filterOrders"
          placeholder="全部"
          v-model="filter.ordersStatu" >
          <el-option
            v-for="item in ordersStatus"
            filterable
            :key="item.status"
            :label="item.label"
            :value="item.status"
          ></el-option>
        </el-select>
      </div>
      <div class="select_date">
        日期选择:
         <el-date-picker
          v-model="filter.date"
          type="daterange"
          start-placeholder="开始日期"
          @change="filterOrders"
          end-placeholder="结束日期"
          default-value="2010-10-01">
        </el-date-picker>
      </div>
      <div class="buttons">
        <el-button type="primary" size="medium" @click="handleOutput">导出</el-button>
      </div>
    </el-header>
    <el-main>
      <el-table
        :data="paginationData"
        type="expand"
        border
        size='small'
        @selection-change="handleSelectionChange"
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
        <el-table-column label="出库订单编号" prop='receipt_no'>
        </el-table-column>
        <el-table-column label="收货单位" prop='client'>
        </el-table-column>
        <el-table-column label="申请人" prop='applicant'>
        </el-table-column>
        <el-table-column label="申请时间" prop='apply_datetime'>
        </el-table-column>
        <el-table-column label="状态" prop='status'>
        </el-table-column>
        <el-table-column label="操作" prop='goodsCategory'>
          <template slot-scope="scope">
            <el-button size='mini' @click="exitordetails(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-count='orders.length/pageSize'
        :page-size='pageSize'
        layout="total, prev, pager, next, jumper"
        :total="orders.length"
      ></el-pagination>

      <h5>订单详情：</h5>
       <el-table
        :data="orderInfo"
        border
        size='small'
        style="width: 100%">
        <el-table-column
          type="index"
          label='序号'
          width="55">
        </el-table-column>
        <el-table-column label="商品类别" prop='category'>
        </el-table-column>
        <el-table-column label="商品名称" prop='goods_name'>
        </el-table-column>
        <el-table-column label="单位" prop='unit'>
        </el-table-column>
        <el-table-column label="所在仓库" prop='location'>
        </el-table-column>
        <el-table-column label="出库数量" prop='out_number'>
        </el-table-column>
        <el-table-column label="商品单价" prop='price'>
        </el-table-column>
        <el-table-column label="商品总额" prop='money'>
        </el-table-column>
        <el-table-column label="收货地址" prop='client_address'>
        </el-table-column>
        <el-table-column label="收货人" prop='client_contact'>
        </el-table-column>
        <el-table-column label="联系方式" prop='client_phone'>
        </el-table-column>
        <el-table-column label="出库用途" prop='purpose'>
        </el-table-column>
        <el-table-column label="备注" prop='apply_comment'>
        </el-table-column>
        <el-table-column label="回退理由" prop='goodsCategory'>
          <template slot-scope="scope">
            <el-input v-model="orderInfo[scope.$index].reason_return"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-row v-if='currentreceipt_no'>
        <el-button type="primary" @click="handleSave">审核</el-button>
        <el-button @click="handleReturn">回退</el-button>
      </el-row>
      
    </el-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filter: {
        applicant: '',
        ordersStatu: '',
        apply_datetime: []
      },
      ordersStatus: [
        {
          label: '已审核',
          status:0,
        },
        {
          label: '待审核',
          status: 1,
        },
        {
          label: '未通过',
          status: 2,
        }
      ],
      orderInfo:[
      ],
      orders: [
      ],
      applicants: [
        // { purchaser: "申请人1" },
        // { purchaser: "申请人2" }
      ],
      multipleSelection:[],
      currentreceipt_no: '',
      
      // 分页
      currentPage: 1,
      paginationData: [],
      pageSize: 5
    }
  },
  mounted(){
    this.getExitorders()
    this.getApplicants()
  },
  methods: {
    //获取申请人
    getApplicants(){
      this.$http.post(`${config.httpBaseUrl}/man/get_all_employee/`).then(res=>{
        console.log(res)
        this.applicants = res.content
      })
    },
    //条件查询
    filterOrders(){
      // 如果筛选数据为空
      const bol = this.filter.applicant || (this.filter.ordersStatu + '').length ||  this.filter.apply_datetime.length
      
      if (!bol) {
        this.getExitorders()
      } else {
        this.$http.post(`${config.httpBaseUrl}/medicine/get_outStorageReceipt/`,{
          all:0,
          status: this.filter.ordersStatu,
          applicant: this.filter.applicant,
          apply_datetime_start: this.filter.apply_datetime.length ? this.moment(this.filter.apply_datetime[0]).format("YYYY-MM-DD") : '',
          apply_datetime_end: this.filter.apply_datetime.length ? this.moment(this.filter.apply_datetime[1]).format("YYYY-MM-DD") : ''
        }).then(res => {
          this.orders = res.content
          
          // 刚打开页面时加载前pageSize项、且自动生成分页数量
          this.getPaginationData(1)
        })
      }
     },
    //提交审核
    handleSave () {
      if (!this.currentreceipt_no) { return }
      const data = [{
        receipt_no: this.currentreceipt_no,
        auditor: JSON.parse(this.$cookie.get('user')).name,
        audited_datetime: this.moment(new Date()).format('YYYY-MM-DD')
      }]
      this.$http.post(`${config.httpBaseUrl}/medicine/audited_inStorageReceipt/`, data).then(res=>{
        if (res.status === 1) {
          this.$message({
            showClose: true,
            message: '审核完成',
            type: 'success'
          })
        }
      })
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
    },
    //请求所有的
    getExitorders () {
      this.$http.post(`${config.httpBaseUrl}/medicine/get_outStorageReceipt/`,{
        all: 1,
      }).then(res=>{
        if (res.status === 1) {
          this.orders= res.content
          // 刚打开页面时加载前pageSize项、且自动生成分页数量
          this.getPaginationData(this.currentPage)
        }
      })
    },
    //详情
    exitordetails(index, row){
      this.$http.post(`${config.httpBaseUrl}/medicine/detail_outStorageReceipt/`,{
        receipt_no: row.receipt_no,
      }).then(res => {
        if (res.status === 1) {
          this.currentreceipt_no = row.receipt_no
          this.orderInfo = res.content
          this.orderInfo.map(item => {
            item.reason_return = ''
          })
        }
      })
    },
    //回退
    handleReturn () {
      const data = []
      this.orderInfo.forEach(item => {
        data.push({
          receipt_no: this.currentreceipt_no,
          goods_name: item.goods_name,
          reason_return: item.reason_return,
          auditor: JSON.parse(this.$cookie.get('user')).name,
          audited_datetime: this.moment(new Date()).format('YYYY-MM-DD')
        })
      })
      this.$http.post(`${config.httpBaseUrl}/medicine/return_outStorageReceipt/`, data)
        .then(res => {
          if (res.status === 1) {
            this.$message({
              showClose: true,
              message: '订单回退成功',
              type: 'success'
            })
          }
        })
    },
    handleOutput(){
      console.log(121);
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
    }
  }
};
</script>

<style lang="scss" scoped>
.exitorderaudit {
  padding: 0 20px;
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
      margin-left: 20px;
    }
    .buttons {
      float: right;
      text-align: right;
    }
  }
  .el-main {
    padding: 0;
    
    .el-pagination {
      margin-top: 10px;
      text-align: right;
    }
    h5 {
      margin: 30px 0 10px;
    }
    .el-row {
      margin-top: 10px;
      text-align: right;
    }
  }
}
</style>


