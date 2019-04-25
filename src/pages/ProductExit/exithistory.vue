<template>
  <div class="exithistory">
    <el-header>
      <div class="select_company">
        收货单位:
        <el-select
          size='medium'
          v-model="filter.client"
          placeholder="请选择"
          clearable
          filterable
          @change='filterOrder'>
          <el-option
            v-for="item in clients"
            :key="item.value"
            :label="item.purchaser"
            :value="item.purchaser">
          </el-option>
        </el-select>
      </div>
      
      <div class="select_goods_name">
        申请状态:
        <el-select
          size='medium'
          clearable
          filterable
          v-model="filter.ordersStatus"
          placeholder="请选择"
          @change='filterOrder'>
          <el-option
            v-for="item in ordersStatus"
            :key="item.value"
            :label="item.label"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="select_date">
        查询日期:
        <el-date-picker
          v-model="filter.apply_datetime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change='filterOrder'>
        </el-date-picker>
      </div>
    </el-header>
    <el-main>
      <el-header>
        <el-button type='primary' size='small' @click='handleOutput'>导出</el-button>
      </el-header>
      <el-table
        :data="paginationData"
        border
        size='small'
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column label="序号"
          type="index"
          width="55">
        </el-table-column>
        <el-table-column label="出库单号" prop='receipt_no'>
        </el-table-column>
        <el-table-column label="收货单位" width='160' prop='client'>
        </el-table-column>
        <el-table-column label="收货地址" width='160' prop='client_address'>
        </el-table-column>
        <el-table-column label="申请人" prop='applicant'>
        </el-table-column>
        <el-table-column label="申请时间" prop='apply_datetime'>
        </el-table-column>
        <el-table-column label="订单状态" prop='status'>
        </el-table-column>
        <el-table-column label="收货联系人" prop='client_contact'>
        </el-table-column>
        <el-table-column label="收货电话" prop='client_phone'>
        </el-table-column>
        <el-table-column label="操作" width='160' prop='goodsCategory'>
          <template slot-scope="scope">
            <el-button size='mini' @click='handleOrderInfo(scope.row)'>详情</el-button>
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
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop='category' label="商品类别">
        </el-table-column>
        <el-table-column prop='goods_name' label="商品名称">
        </el-table-column>
        <el-table-column prop='location' label="所在仓库">
        </el-table-column>
        <el-table-column prop='unit' label="单位">
        </el-table-column>
        <el-table-column prop='out_number' label="出库数量">
        </el-table-column>
        <el-table-column label="商品单价" prop='price'>
        </el-table-column>
        <el-table-column label="商品总价" prop='money'>
        </el-table-column>
        <el-table-column prop='apply_datetime' label="填写日期">
        </el-table-column>
        <el-table-column prop='purpose' label="用途">
        </el-table-column>
        <el-table-column prop='apply_comment' label="备注">
        </el-table-column>
        <el-table-column label="回退理由" prop='reason_return'>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>

<script>
import outputTable from '@/assets/js/outputTable'
export default {
  data () {
    return {
      filter: {
       client: '',
       ordersStatus: '',
       apply_datetime: ''
      },
      clients: [
        // {
        //   purchaser: "四川省经济贸易公司"
        // }
      ],
      ordersStatus: [
        {
          label: '审核通过',
          id: 0
        },
        {
          label: '待审核',
          id: 1
        },
        {
          label: '审核未通过',
          id: 2
        },
        {
          label: '已出库',
          id: 3
        }
      ],
      orders: [
        // {
        //   receipt_no: '123',
        //   client: '阿里巴巴有限公司',
        //   client_address: '四川省成都市锦江',
        //   applicant: '瑜伽',
        //   apply_datetime: '2018-10-10',
        //   status: '已审核',
        //   client_contact: '云音乐',
        //   client_phone: '111'
        // }
      ],
      orderInfo: [
        // {
        //   goods_name: '商品名称',
        //   category: '商品类别',
        //   unit: '单位',
        //   location: '所在位置',
        //   out_number: 10,
        //   price: 1.2,
        //   money: 12,
        //   client_address: '收货地址',
        //   client_contact: '收货联系人',
        //   client_phone: '收货联系电话',
        //   purpose: '用途',
        //   apply_comment: '申请理由',
        //   apply_datetime: '2018-4-5',
        //   reason_return: '回退理由'
        // }
      ],
      // 分页
      currentPage: 1,
      paginationData: [],
      pageSize: 5
    }
  },
  methods: {
    //获取出库单
    getOrders () {
      this.$http.post(`${config.httpBaseUrl}/medicine/history_outStorageReceipt/`, {
        all: 1
      }).then(res => {
        this.orders = res.content
        // 刚打开页面时加载前pageSize项、且自动生成分页数量
        this.getPaginationData(this.currentPage)
      })
    },
    // 获取订单详情
    handleOrderInfo (row) {
      this.$http.post(`${config.httpBaseUrl}/medicine/detail_outStorageReceipt/`, {
        receipt_no: row.receipt_no
      }).then(res => {
        this.orderInfo = res.content
      })
    },
    // 按照搜索框内容进行筛选
    filterOrder () {
      const bol = this.filter.client || (this.filter.ordersStatus + '').length ||  this.filter.apply_datetime
      if (!bol) {
        this.getOrders()
      } else {
        const data = {
          all: 0,
          client: this.filter.client,
          status: this.filter.ordersStatus !== '' ? this.filter.ordersStatus : -1,
          apply_datetime_start: this.filter.apply_datetime.length ? this.moment(this.filter.apply_datetime[0]).format("YYYY-MM-DD") : '',
          apply_datetime_end: this.filter.apply_datetime.length ? this.moment(this.filter.apply_datetime[1]).format("YYYY-MM-DD") : ''
        }
        this.$http.post(`${config.httpBaseUrl}/medicine/history_outStorageReceipt/`, data).then(res => {
          console.log(res)
          this.orders = res.content
          // 刚打开页面时加载前pageSize项、且自动生成分页数量
          this.getPaginationData(1)
        })
      }
    },
    handleOutput () {
      // outputTable (this.ordersTables)
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

    handleOrderEditor (row) {
      console.log(row.receipt_no)
      this.$router.push({ 
        name: 'writewarehousereceipt',
        params: {
          receipt_no: row.receipt_no
        } 
      })
    }
  },
  created () {
    // 获取出库订单
    this.getOrders()
    // 获取所有客户
    this.$http.post(`${config.httpBaseUrl}/man/get_all_client/`).then(res => {
      console.log(res)
      this.clients = res.content
    })
  }
}
</script>

<style lang="scss" scoped>
.exithistory {
  margin: 20px 0 0;
  .el-header {
    overflow: hidden;
    .select_company {
      float: left;
    }
    .select_date {
      float: left;
      margin-left: 60px;
    }
    .select_goods_name {
      float: right;
    }
  }
  .el-main {
    padding-top: 0;
    .el-header {
      padding: 0;
      text-align: right;
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

