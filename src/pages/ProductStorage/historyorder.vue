<template>
  <div class="history_order">
    <el-header>
        <div class="select_company">
          申请人:
          <el-select
            filterable
            clearable
            size='medium'
            v-model="filter.applicant"
            @change="filterOrder"
            placeholder="请输入经办人">
            <el-option
              v-for="(item, index) in applicants"
              :key="index"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </div>
        <div class="select_date">
          日期选择:
          <el-date-picker
            v-model="filter.apply_datetime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change='filterOrder'>
          </el-date-picker>
        </div>
        <div class="select_goods_name">
          订单状态:
          <el-select
              @change='filterOrder'
              v-model="filter.status"
              placeholder="请选择"
              clearable
              filterable>
            <el-option
              v-for="item in status"
              :key="item.value"
              :label="item.label"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <el-button type='primary' @click='handleOutput'>导出</el-button>
    </el-header>
    <el-main>
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
          label="序号"
          type="index"
          width="55">
        </el-table-column>
        <el-table-column label="订单号" prop='receipt_no'>
        </el-table-column>
        <el-table-column label="申请人" prop='applicant'>
        </el-table-column>
        <el-table-column label="申请时间" prop='apply_datetime'>
        </el-table-column>
        <el-table-column label="状态" prop='status'>
        </el-table-column>
        <el-table-column
          label="操作"
          prop='goodsCategory'
          width="180">
          <template slot-scope="scope">
            <el-button 
              size='mini'
              @click='handleOrderInfo(scope.row)'>详情</el-button>
            <el-button
              size='mini'
              :disabled='scope.row.status!=="未通过"'
              @click='handleOrderEditor(scope.row)'>修改</el-button>
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
          label="序号"
          type="index"
          width="55">
        </el-table-column>
        <el-table-column label='商品类型' prop='category'>
        </el-table-column>
        <el-table-column label="商品名称" prop='goods_name'>
        </el-table-column>
        <el-table-column label="供应商" prop='supplier'>
        </el-table-column>
        <el-table-column label="单位" prop='unit'>
        </el-table-column>
        <el-table-column label="申请数量" prop='apply_number'>
        </el-table-column>
        <el-table-column label="预估单价" prop='estimated_price'>
        </el-table-column>
        <el-table-column label="预估总价" prop='estimated_money'>
        </el-table-column>
        <el-table-column label="用途" prop='purpose'>
        </el-table-column>
        <el-table-column label="申请人备注" prop='apply_comment'>
        </el-table-column>
        <el-table-column label="回退理由" prop='reason_return'>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>

<script>
import outputTable from '@/assets/js/outputTable'
import filterTable from '@/assets/js/filterTable'
export default {
  data () {
    return {
      filter: {
       applicant: '',
       status: '',
       apply_datetime: ''
      },
      status: [
        {
          label: '已审核',
          id: 0
        },
        {
          label: '待审核',
          id: 1
        },
        {
          label: '未通过',
          id: 2
        },
        {
          label: "已入库",
          id: 3
        }
      ],
      applicants: [
      ],
      orderInfo: [
        // {
        //   supplier: '供应商'
        //   category: '商品类别',
        //   goods_name: '商品名称',
        //   unit: '个',
        //   apply_number: 10,
        //   estimated_price: 2.3,
        //   estimated_money: 23,
        //   purpose: '用于治疗感冒',
        //   apply_comment: '申请人备注',
        //   reason_return: '审核不通过原因'
        // }
      ],
      orders: [
        // {
        //   "receipt_no": "123",
        //   "supplier": "四川省经济贸易公司",
        //   "applicant": "申请人",
        //   "apply_datetime": "2019-4-16",
        //   "status": "待审核"
        // }
      ],
      // 分页
      currentPage: 1,
      paginationData: [],
      pageSize: 5
    }
  },
  computed: {
  },
  methods: {
    // 导出表单
    handleOutput () {
      outputTable (this.orders)
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

    // 获取订单详情
    handleOrderInfo (row) {
      console.log(row.receipt_no)
      this.$http.post(`${config.httpBaseUrl}/medicine/detail_inStorageReceipt/`, {
        receipt_no: row.receipt_no
      }).then(res => {
        this.orderInfo = res.content
      })
    },
    // 获取所有订单列表
    getOders () {
      this.$http.post(`${config.httpBaseUrl}/medicine/history_inStorageReceipt/`, {
        all: 1
      }).then(res => {
        if (res.status === 1) {
          this.orders = res.content
          // 刚打开页面时加载前pageSize项、且自动生成分页数量
          this.getPaginationData(this.currentPage)
        }
      })
    },
    // 修改错误订单
    handleOrderEditor (row) {
      this.$router.push({
        name: 'writeorder', 
        params: {
          receipt_no: row.receipt_no
        }
      })
    },
    
    // 按照搜索框内容进行筛选
    filterOrder () {
      const bol = this.filter.applicant || (this.filter.status + '').length ||  this.filter.apply_datetime
      if (!bol) {
        this.getOders()
      } else {
        const data = {
          all: 0,
          supplier: this.filter.supplier,
          status: this.filter.status === '' ? -1 : this.filter.status,
          apply_datetime_start: this.filter.apply_datetime.length ? this.moment(this.filter.apply_datetime[0]).format("YYYY-MM-DD") : '',
          apply_datetime_end: this.filter.apply_datetime.length ? this.moment(this.filter.apply_datetime[1]).format("YYYY-MM-DD") : ''
        }
        this.$http.post(`${config.httpBaseUrl}/medicine/history_inStorageReceipt/`, data).then(res => {
          this.orders = res.content
          // 刚打开页面时加载前pageSize项、且自动生成分页数量
          this.getPaginationData(1)
        })
      }
    }
  },
  created () {
    this.getOders()
    // 获取所有申请人
    this.$http.post(`${config.httpBaseUrl}/man/get_all_employee/`).then(res=>{
      if(res.status==1){
        this.applicants = res.content
      }else{
        return
      }
    }) 
  }
}
</script>

<style lang="scss" scoped>
.history_order {
  margin: 20px 0px 0 0;
  .el-header {
    overflow: hidden;
    > div {
      display: inline-block;
    }
    .select_company {
      float: left;
    }
    .select_date {
      float: left;
      margin-left: 20px;
    }
    .select_goods_name {
      margin-left: 20px; 
      .el-select {
        width: 150px;
      }
    }
    .el-button {
      float: right;
    }
  }
  .el-main {
    padding-top: 0;
    .el-header {
      padding: 0;
      text-align: right;
      height: 40px;
    }
    .el-pagination {
      margin-top: 10px;
      text-align: right;
    }
    h5 {
      margin: 20px 0 10px;
    }
  }
}
</style>

