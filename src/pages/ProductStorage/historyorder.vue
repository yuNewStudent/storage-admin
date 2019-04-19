<template>
  <div class="history_order">
    <el-header>
        <div class="select_company">
          供货单位:
          <el-select size='medium' 
              @change='filterOrder'
              v-model="filter.supplier"
              placeholder="请选择">
            <el-option
              v-for="item in suppliers"
              :key="item.value"
              :label="item.supplier"
              :value="item.supplier">
            </el-option>
          </el-select>
        </div>
        <div class="select_date">
          日期选择:
          <el-date-picker
            v-model="apply_datetime"
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
              size='medium'
              v-model="filter.status"
              placeholder="请选择">
            <el-option
              v-for="item in status"
              :key="item.value"
              :label="item.label"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
    </el-header>
    <el-main>
      <el-header>
        <el-button type='primary' size='small' @click='handleOutput'>导出</el-button>
      </el-header>
      <el-table
        :data="orders"
        border
        size='small'
        style="width: 100%">
        <el-table-column label="序号"
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          width="55">
        </el-table-column>
        <el-table-column label="订单号" prop='receipt_no'>
        </el-table-column>
        <el-table-column label="供应商" prop='supplier'>
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
              @click='handleOrderEditor(scope.row)'>修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>

      <h5>订单详情：</h5>
      <el-table
        :data="orderInfo"
        border
        size='small'
        style="width: 100%">
        <el-table-column label="序号"
          type="index"
          width="55">
        </el-table-column>
        <el-table-column label='商品类型' prop='category'>
        </el-table-column>
        <el-table-column label="商品名称" prop='goods_name'>
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
       supplier: '',
       status: ''
      },
      apply_datetime: [],
      currentPage:4,
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
      suppliers: [
        {
          address: "供货商地址",
          supplier: "四川省经济贸易公司"
        },
        {
          address: "供货商地址",
          supplier: "四川棋照科技有限公司"
        },
        {
          address: "供货商地址",
          supplier: "攀枝花攀钢公司"
        },
        {
          address: "供货商地址",
          supplier: "阿里巴巴有限公司"
        },
        {
          address: "供货商地址",
          supplier: "北京经贸技校公司"
        }
      ],
      orderInfo: [
        {
          category: '商品类别',
          goods_name: '商品名称',
          unit: '个',
          apply_number: 10,
          estimated_price: 2.3,
          estimated_money: 23,
          purpose: '用于治疗感冒',
          apply_comment: '申请人备注',
          reason_return: '审核不通过原因'
        },
        {
          category: '商品类别',
          goods_name: '商品名称',
          unit: '个',
          apply_number: 10,
          estimated_price: 2.3,
          estimated_money: 23,
          purpose: '用于治疗感冒',
          apply_comment: '申请人备注',
          reason_return: '审核不通过原因'
        }
      ],
      orders: [
        {
          "receipt_no": "123",
          "supplier": "四川省经济贸易公司",
          "applicant": "申请人",
          "apply_datetime": "2019-4-16",
          "status": "待审核"
        },
        {
          "receipt_no": "456",
          "supplier": "北京经贸技校公司",
          "applicant": "申请人",
          "apply_datetime": "2019-4-16",
          "status": "已审核"
        },
        {
          "receipt_no": "456",
          "supplier": "北京经贸技校公司",
          "applicant": "申请人",
          "apply_datetime": "2019-4-16",
          "status": "待审核"
        }
      ]
    }
  },
  computed: {
  },
  methods: {
    // 导出表单
    handleOutput () {
      outputTable (this.orders)
    },

    // 翻页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 获取订单详情
    handleOrderInfo (row) {
      console.log(row.receipt_no)
      // this.$http.post(`${config.httpBaseUrl}/medicine/detail_inStorageReceipt/`, {
      //   receipt_no: row.receipt_no
      // }).then(res => {
      // console.log(res)
      // this.orderInfo = res.data
      // })
    },
    // 获取所有订单列表
    getOders () {
      // this.$http.post(`${config.httpBaseUrl}/medicine/history_inStorageReceipt/`, {
      //   all: True
      // }).then(res => {
      // console.log(res)
      // this.orders = res.data
      // })
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
      console.log(this.filter)
      // this.$http.post(`${config.httpBaseUrl}/medicine/history_inStorageReceipt/`, {
      //   all: False,
      //   applicant: '',
      //   status: this.filter.status >= 0 ? this.filter.status : -1,
      //   apply_datetime_start: this.apply_datetime.length ? this.moment(this.apply_datetime[0]).format("YYYY-MM-DD") : '',
      //   apply_datetime_end: this.apply_datetime.length ? this.moment(this.apply_datetime[1]).format("YYYY-MM-DD") : ''
      // }).then(res => {
      //   console.log(res)
      //   this.orders = res.data
      // })
    }
  },
  created () {
    this.getOders()
    // 获取所有供应商
    // this.$http.post(`${config.httpBaseUrl}/man/get_supplier/`, {
    // supplier: '',
    // address: ''
    // }).then(res => {
    //   console.log(res)
    //   this.suppliers = res.data.content
    // })
  }
}
</script>

<style lang="scss" scoped>
.history_order {
  margin: 20px 0px 0 0;
  .el-header {
    overflow: hidden;
    .select_company {
      float: left;
    }
    .select_date {
      float: left;
      margin-left: 50px;
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

